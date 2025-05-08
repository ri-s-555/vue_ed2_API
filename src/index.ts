import express, { Request, Response } from 'express'
import { MOCK_PRODUCTS, IProduct } from './controlers/product'
import { MOCK_CARTS } from './controlers/carts'
import { MOCK_USERS } from './controlers/users'
import cors from 'cors'
const app = express()
const port: number = 3000



// Middleware для работы с JSON и CORS
app.use(express.json())
app.use(cors())

let cart: IProduct[] = []

app.get('/products', (req: Request, res: Response) => {
  res.status(200).json(MOCK_PRODUCTS)
})
app.get('/products/:id', (req: Request, res: Response) => {
  const product = MOCK_PRODUCTS.find((product) => product.id === parseInt(req.params.id))
  res.send(product)
  res.status(200)
})




app.get('/cart/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id)
  const cart = MOCK_CARTS.find((cart) => cart.id === id)
  res.status(200).json(cart)
})
app.post('/cart/:id', (req: Request, res: Response) => {
  const product = req.body
  cart.push(product)
  res.status(201).json(cart)
})

app.delete('/cart/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id)
  cart = cart.filter(item => item.id !== id)
  res.status(200).json(cart)
})

app.get('/user/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id)
  const user = MOCK_USERS.find(user => user.id === id)
  res.status(200).json(user)
})

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
