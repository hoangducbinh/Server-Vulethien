import { Request, Response } from 'express'
import connectToDatabase from './connection'
import userRouter from './src/routers/user'
import cors from 'cors'
import supplierRouter from './src/routers/supplier'


const express = require('express')
const app = express()
const port = 8000

app.use(express.json())
app.use(cors())

app.get('/', (req : Request, res: Response) => {
  res.send('Hello World!') 
})
connectToDatabase()

app.use('/auth', userRouter)
app.use('/suppiler', supplierRouter)

app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}/`)
})