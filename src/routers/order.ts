import express from 'express'
import { createOrder, getAllOrders, updateOrder, deleteOrder, getOrderDetails, getOrderById, updateProductPreparedStatus, updateOrderStatus } from '../controllers/order-controller'


const orderRouter = express.Router()

orderRouter.post('/create', createOrder)
orderRouter.get('/getAll', getAllOrders)
orderRouter.put('/update/:id', updateOrder)
orderRouter.delete('/delete/:id', deleteOrder)
orderRouter.get('/getOrderDetails/:id', getOrderDetails)
orderRouter.get('/getOrderById/:id', getOrderById)
orderRouter.put('/updateProductPreparedStatus', updateProductPreparedStatus)
orderRouter.put('/updateOrderStatus', updateOrderStatus)
export default orderRouter