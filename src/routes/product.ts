import express from 'express';

import { handleAddProduct, handleGetAllProducts } from '../controllers/product';


const router = express.Router();

router
  .get('/', handleGetAllProducts)
  .post('/', handleAddProduct);


export { router as productRoute };
