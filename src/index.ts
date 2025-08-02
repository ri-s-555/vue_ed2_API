import express, { Request, Response } from 'express'
import { MOCK_PRODUCTS, IProduct } from './controllers/product'
import { MOCK_CARTS, addToCardById } from './controllers/carts';
import { IUser, MOCK_USERS } from './controllers/users';
import cors from 'cors';
import { check, validationResult } from 'express-validator';
import { register, login, getUser } from './controllers/auth';
import auth from './middleware/auth';
import connectDB from './config/db';
const app = express()
const port: number = 3000

connectDB();
// Middleware для работы с JSON и CORS
app.use(express.json())
app.use(cors())


let cart: IProduct[] = [] //ненастоящая переменная, переписать на настоящие данные

/**
 * Получение пользователя по id
 * @param {string} id - id пользователя
 * @returns {Object} - Пользователь, соответствующий указанному id
 */
app.get("/user/:id", (req: Request, res: Response) => {
  const id = parseInt (req.params.id)
  const user = MOCK_USERS.find(user => user.id === id)
  res.status(200).json(user)
})

/**
 * Получение корзины
 * @returns {Object} - Массив продуктов в корзине в формате JSON
 */
app.get('/cart/:id', (req: Request, res: Response) => {
  const id = parseInt (req.params.id)
  const cart = MOCK_CARTS.find(cart => cart.id === id)
  res.status(200).json(cart)
})

/**
 * Получение всех продуктов
 * @returns {Object} - Массив всех продуктов в формате JSON
 */
app.get('/products', (req: Request, res: Response) => {
  res.status(200).json(MOCK_PRODUCTS)
})

/**
 * Получение продукта по id
 * @param {string} id - Идентификатор продукта
 * @returns {Object} - Продукт, соответствующий указанному id
 */
app.get('/products/:id', (req: Request, res: Response) => { 
  const product = MOCK_PRODUCTS.find((product) => product.id === parseInt(req.params.id)); 
  if (product) {
    res.status(200).json(product);
  } else {
    res.status(404).send('Product not found');
  }
});

/**
 * Добавление продукт в корзину
 * @param {Object} product - Объект продукта, передаваемый в теле запроса
 * @returns {Object} - Обновленный массив продуктов в корзине в формате JSON и статус 201
 */
app.post('/cart/:id', (req: Request, res: Response) => {
  console.log(33456)
  // const id = parseInt (req.params.id)
  // const cart = MOCK_CARTS.find(cart => cart.id === id)
  // const addToCardById = addToCardById(id, products: IProduct[])


  // const product = req.body
  // console.log(req.body)
  // cart.push(product)
  res.status(201).json(cart)
})


/**
 *  Подтверждение добавления продукта в корзину
 * @param {string} id - id продукта
 * @returns {string} - Текстовое подтверждение "Product added to cart"
 */
app.post('/products/:id', (req: Request, res: Response) => {
  res.send('Product added to cart');
});


/**
 * Удаление продукта из корзины
 * @param {string} id - id продукта
 * @returns {Object} - Обновленный массив продуктов в корзине в формате JSON
 */
app.delete('/cart/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id)
  cart = cart.filter(item => item.id !== id)
  res.status(200).json(cart)
})


/**
 * @route POST /auth/register
 * @description Регистрация нового пользователя.
 * @param {Request} req - Объект запроса, содержащий данные пользователя для регистрации.
 * @param {Response} res - Объект ответа, используемый для отправки ответа клиенту.
 * @returns {void}
 */
app.post('/auth/register', [
  check('username', 'Username is required').not().isEmpty(),
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 })
], (req: Request, res: Response): void => {
  register(req, res);
});

/**
 * @route POST /auth/login
 * @description Вход пользователя в систему.
 * @param {Request} req - Объект запроса, содержащий данные для входа.
 * @param {Response} res - Объект ответа, используемый для отправки ответа клиенту.
 * @returns {void}
 */
app.post('/auth/login', (req: Request, res: Response): void => {
  login(req, res);
});

/**
 * @route GET /auth/user
 * @description Получение данных текущего пользователя.
 * @param {Request} req - Объект запроса, содержащий информацию о пользователе.
 * @param {Response} res - Объект ответа, используемый для отправки ответа клиенту.
 * @returns {void}
 */
app.get('/auth/user', (req: Request, res: Response): void => {
  auth(req, res, () => {
    getUser(req, res);
  });
});

/**
 * Запуск сервера
 */
app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
