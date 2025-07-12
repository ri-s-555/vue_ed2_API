import { Request, Response } from 'express';
import User, { IUser } from '../models/User';
import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';

// Расширение Request для включения пользователя
interface AuthRequest extends Request {
  user?: {
    id: string;
  };
}

// Генерация JWT токена
const generateToken = (user: IUser) => {
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET || 'default_secret',
    { expiresIn: '24h' }
  );
};

// Регистрация пользователя
const register = async (req: Request, res: Response): Promise<Response> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  } 

  const { username, email, password } = req.body;

  try {
    // Проверка на существующего пользователя
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    // Создание нового пользователя
    user = new User({ username, email, password });
    await user.save();

    // Генерация токена
    const accessToken = generateToken(user as IUser);

    return res.status(201).json({
      accessToken,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role
      }
    });
  } catch (err) {
    console.error(err);
    return res.status(500).send('Server error');
  }
};

// Вход пользователя
const login = async (req: Request, res: Response): Promise<Response> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    // Проверка пользователя
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    // Проверка пароля
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    // Генерация токена
    const token = generateToken(user as IUser);

    return res.json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role
      }
    });
  } catch (err) {
    console.error(err);
    return res.status(500).send('Server error');
  }
};

// Получение данных текущего пользователя
const getUser = async (req: AuthRequest, res: Response): Promise<Response> => {
  try {
    if (!req.user?.id) {
      return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    return res.json(user);
  } catch (err) {
    console.error(err);
    return res.status(500).send('Server error');
  }
};

export { register, login, getUser };