import express from 'express'
import { createStockEntry, getAllStockEntries, updateStockEntry, deleteStockEntry } from '../controllers/stockEntry-controller'
const stockEntryRouter = express.Router()

stockEntryRouter.post('/create', createStockEntry)
stockEntryRouter.get('/getAll', getAllStockEntries)
stockEntryRouter.put('/update', updateStockEntry)
stockEntryRouter.delete('/delete/:_id', deleteStockEntry)

export default stockEntryRouter

