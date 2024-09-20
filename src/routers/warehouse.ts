import express from "express";
import { createWarehouse, deleteWarehouse, getAllWarehouse, updateWarehouse } from "../controllers/warehouse-controller";



const warehouseRouter = express.Router()

warehouseRouter.post('/create', createWarehouse)
warehouseRouter.get('/getAll', getAllWarehouse)
warehouseRouter.put('/update', updateWarehouse)
warehouseRouter.delete('/delete/:_id', deleteWarehouse)


export default warehouseRouter