import { createStockExit, getStockExitById, getStockExits, } from "../controllers/stockExit-controller";
import express from 'express';
const stockExitRouter = express.Router();

stockExitRouter.post('/stock-exit', createStockExit)
stockExitRouter.get('/stock-exit', getStockExits)
stockExitRouter.get('/stock-exit/:id', getStockExitById)

export default stockExitRouter; 