import express, { Request, Response } from 'express'
import { MOCK_PRODUCTS, IProduct } from './controlers/product'
import { MOCK_CARTS } from './controlers/carts';
import { IUser, MOCK_USERS } from './controlers/users';
import cors from 'cors';
const app = express()
const port: number = 3000


// Middleware для работы с JSON и CORS
app.use(express.json())
app.use(cors())

let cart: IProduct[] = []

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
app.post('/cart', (req: Request, res: Response) => {
  const product = req.body
  cart.push(product)
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
 * Запуск сервера
 */
app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
