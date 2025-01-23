import express from 'express';

import { handleAddProduct, handleGetProducts } from '../controllers/product';


const router = express.Router();

router
  .get('/', handleGetProducts)
  .post('/', handleAddProduct);


export { router as productRoute };
