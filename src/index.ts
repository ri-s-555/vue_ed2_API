import express, { Request, Response } from 'express'
const app = express()
const port: number = 3000

import { MOCK_PRODUCTS } from './controlers/product'

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!')
  res.status(200)
})
app.get('/products', (req: Request, res: Response) => {
  res.send(MOCK_PRODUCTS)
  res.status(200)
})
app.get('/products/:id', (req: Request, res: Response) => {
  const product = MOCK_PRODUCTS.find((product) => product.id === parseInt(req.params.id))
  res.send(product)
  res.status(200)
  
})
app.post('')



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})