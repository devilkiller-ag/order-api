import express from 'express';

import { handleAddProduct, handleGetAllProducts } from '../controllers/product';
import { validateProductType, validateAddProductRequestBody } from '../middlewares/validation';


const router = express.Router();

router
  .get('/', validateProductType, handleGetAllProducts)
  .post('/', validateAddProductRequestBody, handleAddProduct);


export { router as productRoute }; 
