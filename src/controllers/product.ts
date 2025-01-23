import { Request, Response } from 'express';

import { db } from '../db/db';
import { ApiError } from '../utils/ApiError';
import { IProduct } from '../types/ProductType';
import getProductType from '../utils/getProductType';


/**
 * Controller for handling requests to get all products.
 *
 * @param {Request} req - The HTTP request object, containing query parameters.
 * @param {Response} res - The HTTP response object used to send the response back to the client.
 * @returns {void} Returns the list of products based on the query parameter (if provided).
 */
const handleGetAllProducts = (req: Request, res: Response): void => {
  const { type } = req.query;

  const products = db.getAll();

  if (!type) {
    res.status(200).json(products);
    return;
  }

  const productType = getProductType(type as string);
  const filteredProducts = products.filter(product => product.type === productType);

  if (filteredProducts.length === 0) {
    res.status(404).json(
      new ApiError(
        new Date().toISOString(),
        404,
        `No products found for type: ${type}`,
        req.originalUrl
      )
    );
    return;
  }

  res.status(200).json(filteredProducts);
  return;
}


/**
 * Controller for handling requests to add a new product.
 *
 * @param {Request} req - The HTTP request object, containing the product data in the request body.
 * @param {Response} res - The HTTP response object used to send the response back to the client.
 * @returns {void} Responds with the newly created product ID.
 */
const handleAddProduct = (req: Request, res: Response): void => {
  const { name, type, inventory, cost } = req.body;

  const productType = getProductType(type);

  const newProduct: IProduct = {
    id: db.products.size + 1,
    name,
    type: productType,
    inventory,
    cost
  }

  db.add(newProduct);

  res.status(201).json({
    "id": newProduct.id
  });
}


export {
  handleGetAllProducts,
  handleAddProduct,
}
