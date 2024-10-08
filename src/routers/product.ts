import express from 'express';
import { createProduct, deleteProduct, getAllProduct, getProductById, getProductsByCategory, updateProduct } from '../controllers/product-controller';

const productRouter = express.Router();

productRouter.post('/create', createProduct);
productRouter.get('/getAll', getAllProduct);
productRouter.put('/update/:_id', updateProduct);
productRouter.delete('/delete/:_id', deleteProduct);
productRouter.get('/get/:_id', getProductById);
productRouter.get('/getbyCategory/:_id', getProductsByCategory);

export default productRouter;