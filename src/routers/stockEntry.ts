import express from 'express'
import { createStockEntry, getAllStockEntries, updateStockEntry, deleteStockEntry, getStockEntryDetails } from '../controllers/stockEntry-controller'
const stockEntryRouter = express.Router()

stockEntryRouter.post('/create', createStockEntry)
stockEntryRouter.get('/getAll', getAllStockEntries)
stockEntryRouter.put('/update', updateStockEntry)
stockEntryRouter.delete('/delete/:_id', deleteStockEntry)
stockEntryRouter.get('/getDetails/:_id', getStockEntryDetails)

export default stockEntryRouter

