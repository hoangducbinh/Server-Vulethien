import express from 'express'
import { createPayment, getPaymentById, updatePayment, deletePayment } from '../controllers/payment-controller'

const paymentRouter = express.Router()

paymentRouter.post('/create', createPayment)
paymentRouter.get('/get/:id', getPaymentById)
paymentRouter.put('/update/:id', updatePayment)
paymentRouter.delete('/delete/:id', deletePayment)

export default paymentRouter