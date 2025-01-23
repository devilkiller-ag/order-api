/**
 * Product route module.
 *
 * Provides API endpoints for managing products, including fetching all products and adding a new product.
 *
 * @module routes/productRoute
 */

import express from 'express';

import { handleAddProduct, handleGetAllProducts } from '../controllers/product';
import { validateProductType, validateAddProductRequestBody } from '../middlewares/validation';


const router = express.Router();

/**
 * GET /products
 *
 * Retrieves all products. Applies a validation middleware to ensure a valid product type is specified in the request query.
 *
 * @name GetAllProducts
 * @route {GET} /
 * @middleware {validateProductType}
 * @handler {handleGetAllProducts}
 */
router.get('/', validateProductType, handleGetAllProducts);

/**
 * POST /products
 *
 * Adds a new product. Applies a validation middleware to ensure the request body contains valid product details.
 *
 * @name AddProduct
 * @route {POST} /
 * @middleware {validateAddProductRequestBody}
 * @handler {handleAddProduct}
 */
router.post('/', validateAddProductRequestBody, handleAddProduct);


export { router as productRoute };
