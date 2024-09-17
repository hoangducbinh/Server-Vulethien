import express from 'express';
import { createCategory, deleteCategory, getAllCategory, updateCategory,  } from '../controllers/categoty-controller';


const categoryRouter = express.Router();

categoryRouter.post('/create', createCategory );
categoryRouter.get('/getAll', getAllCategory);
categoryRouter.put('/update', updateCategory);
categoryRouter.delete('/delete/:id', deleteCategory);

export default categoryRouter;