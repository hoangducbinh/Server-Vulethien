import express from 'express'
import {  createSupplier, deleteSupplier, getAllSupplier, updateSupplier  } from '../controllers/suppiler-controller'


const supplierRouter = express.Router()

supplierRouter.post('/create', createSupplier)
supplierRouter.get('/getAll', getAllSupplier)
supplierRouter.put('/update', updateSupplier)
supplierRouter.delete('/delete/:_id', deleteSupplier)


export default supplierRouter