import { createStockExit, getStockExitById, getStockExitDetail, getStockExits, } from "../controllers/stockExit-controller";
import express from 'express';
const stockExitRouter = express.Router();

stockExitRouter.post('/create', createStockExit)
stockExitRouter.get('/getAll', getStockExits)
stockExitRouter.get('/getById/:id', getStockExitById)
stockExitRouter.get('/getDetailById/:id', getStockExitDetail)

export default stockExitRouter; 