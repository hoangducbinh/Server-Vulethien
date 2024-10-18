import { Request, Response } from 'express'
import connectToDatabase from './connection'
import userRouter from './src/routers/user'
import cors from 'cors'
import supplierRouter from './src/routers/supplier'
import categoryRouter from './src/routers/category'
import productRouter from './src/routers/product'
import warehouseRouter from './src/routers/warehouse'
import stockEntryRouter from './src/routers/stockEntry'
import paymentRouter from './src/routers/payment'
import orderRouter from './src/routers/order'
import customerRouter from './src/routers/customer'
import stockExitRouter from './src/routers/stockExit'

const express = require('express')
const app = express()
const port = 8000

app.use(express.json())
app.use(cors({ 
  origin: 'https://vulethien.vercel.app',
  
}))

// app.use(cors({ 
//   origin: 'http://localhost:3000',
  
// }))


app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!')
})
connectToDatabase()

app.use('/auth', userRouter)
app.use('/supplier', supplierRouter)
app.use('/category', categoryRouter)
app.use('/product', productRouter)
app.use('/warehouse', warehouseRouter)
app.use('/stockEntry', stockEntryRouter)
app.use('/payment', paymentRouter)
app.use('/order', orderRouter)
app.use('/customer', customerRouter)
app.use('/stockExit', stockExitRouter)
app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}/`)
})