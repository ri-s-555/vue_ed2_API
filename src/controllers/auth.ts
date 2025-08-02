import { Request, Response } from "express";
import User, { IUser } from "../models/User";
import jwt from "jsonwebtoken";
import { validationResult } from "express-validator"; 

/**
 * @interface AuthRequest
 * @description Расширенный интерфейс Request для включения информации о пользователе.
 * @extends {Request} Базовый интерфейс Request.
 */
interface AuthRequest extends Request {
  /**
   * @property {Object} [user] - Информация о пользователе.
   * @property {string} [user.id] - Идентификатор пользователя.
   */
  user?: {
    id: string;
  };
}

/**
 * Генерирует JWT токен для пользователя.
 * @function generateToken
 * @param {IUser} user - Пользователь, для которого генерируется токен.
 * @returns {string} Сгенерированный JWT токен.
 */
const generateToken = (user: IUser) => { //прописать механизм генерации refresh-токена
  /**
   * Создание и возвращение JWT токена на основе идентификатора пользователя и его роли.
   * @constant {string} JWT_SECRET - Секретный ключ для подписи токена.
   */
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET || "default_secret",
    { expiresIn: "24h" }
  );
};

/**
 * Регистрация нового пользователя.
 * @async
 * @function register
 * @param {Request} req - Объект запроса, содержащий данные пользователя для регистрации.
 * @param {Response} res - Объект ответа, используемый для отправки ответа клиенту.
 * @returns {Promise<Response>} Объект ответа с результатом регистрации.
 */
const register = async (req: Request, res: Response): Promise<Response> => {
  /**
   * Проверка данных запроса на наличие ошибок валидации.
   */
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  /**
   * Извлечение данных пользователя из тела запроса.
   * @constant {string} username - Имя пользователя.
   * @constant {string} email - Электронная почта пользователя.
   * @constant {string} password - Пароль пользователя.
   */
  const { username, email, password } = req.body;

  try {
    /**
     * Проверка на существование пользователя с такой же электронной почтой.
     */
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: "User already exists" });
    }

    /**
     * Создание нового пользователя и сохранение его в базе данных.
     */
    user = new User({ username, email, password });
    await user.save();

    /**
     * Генерация токена доступа для нового пользователя.
     * @constant {string} accessToken - Сгенерированный JWT токен.
     */
    const accessToken = generateToken(user as IUser);

    /**
     * Отправка ответа с токеном и данными пользователя.
     */
    return res.status(201).json({
      accessToken,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).send("Server error");
  }
};

/**
 * Обработка входа пользователя в систему.
 * @async
 * @function login
 * @param {Request} req - Объект запроса, содержащий данные для входа.
 * @param {Response} res - Объект ответа, используемый для отправки ответа клиенту.
 * @returns {Promise<Response>} Объект ответа с результатом попытки входа.
 */
const login = async (req: Request, res: Response): Promise<Response> => {
  /**
   * Проверка данных запроса на наличие ошибок валидации.
   */
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  /**
   * Извлечение данных для входа из тела запроса.
   * @constant {string} email - Электронная почта пользователя.
   * @constant {string} password - Пароль пользователя.
   */
  const { email, password } = req.body;

  try {
    /**
     * Поиск пользователя в базе данных по электронной почте.
     * @constant {Object} user - Найденный пользователь.
     */
    const user = await User.findOne({ email });

    /**
     * Проверка существования пользователя.
     */
    if (!user) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    /**
     * Сравнение введенного пароля с сохраненным паролем пользователя.
     * @constant {boolean} isMatch - Результат сравнения паролей.
     */
    const isMatch = await user.comparePassword(password);

    /**
     * Проверка корректности пароля.
     */
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    /**
     * Генерация токена доступа для пользователя.
     * @constant {string} token - Сгенерированный JWT токен.
     */
    const token = generateToken(user as IUser);

    /**
     * Отправка ответа с токеном и данными пользователя.
     */
    return res.json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).send("Server error");
  }
};


/**
 * Получение данных текущего пользователя.
 * @async
 * @function getUser
 * @param {AuthRequest} req - Объект запроса, содержащий информацию о пользователе.
 * @param {Response} res - Объект ответа, используемый для отправки ответа клиенту.
 * @returns {Promise<Response>} Объект ответа с данными пользователя или сообщением об ошибке.
 */
const getUser = async (req: AuthRequest, res: Response): Promise<Response> => {
  try {
    /**
     * Проверка наличия идентификатора пользователя в запросе.
     */
    if (!req.user?.id) {
      return res.status(401).json({ msg: "No token, authorization denied" });
    }

    /**
     * Поиск пользователя в базе данных по идентификатору, исключая пароль из результата.
     * @constant {Object} user - Найденный пользователь.
     */
    const user = await User.findById(req.user.id).select("-password");

    /**
     * Проверка существования пользователя.
     */
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    /**
     * Отправка данных пользователя в ответе.
     */
    return res.json(user);
  } catch (err) {
    console.error(err);
    return res.status(500).send("Server error");
  }
};


export { register, login, getUser };
