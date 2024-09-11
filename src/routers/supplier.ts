import express from 'express'
import { createSuppiler, deleteSupplier, getAllSuppiler, updateSuppiler } from '../controllers/suppiler-controller'
import { authenticationMiddleware } from '../middelware'


const supplierRouter = express.Router()

supplierRouter.post('/create', createSuppiler)
supplierRouter.get('/getAll', getAllSuppiler)
supplierRouter.put('/update', updateSuppiler)
supplierRouter.delete('/delete/:_id',deleteSupplier)


export default supplierRouter