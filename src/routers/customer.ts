import express from "express"
import { createCustomer, getCustomer, updateCustomer, deleteCustomer, loginCustomer } from "../controllers/customer-controller"

const customerRouter = express.Router()

customerRouter.post('/create', createCustomer)
customerRouter.get('/get', getCustomer)
customerRouter.put('/update/:id', updateCustomer)
customerRouter.delete('/delete/:id', deleteCustomer)
customerRouter.post('/login', loginCustomer)

export default customerRouter
