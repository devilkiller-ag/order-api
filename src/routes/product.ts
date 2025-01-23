import express from 'express';

import { handleAddProduct, handleGetAllProducts } from '../controllers/product';
import { validateAddProductRequestBody } from '../middlewares/validation';


const router = express.Router();

router
  .get('/', handleGetAllProducts)
  .post('/', validateAddProductRequestBody, handleAddProduct);


export { router as productRoute }; 
