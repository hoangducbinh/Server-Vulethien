import { Request, Response } from 'express'
import connectToDatabase from './connection'
import userRouter from './src/routers/user'


const express = require('express')
const app = express()
const port = 8000

app.get('/', (req : Request, res: Response) => {
  res.send('Hello World!') 
})
connectToDatabase()

app.use('/auth', userRouter)

app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}/`)
})