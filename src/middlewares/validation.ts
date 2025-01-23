import { Request, Response, NextFunction } from 'express';

import { ApiError } from '../utils/ApiError';
import { IProductType } from '../types/ProductType';


/**
 * Middleware for validating the product type query parameter in the request.
 *
 * Ensures that the `type` query parameter is a valid string and matches one of the allowed product types.
 * If validation fails, it sends a 400 Bad Request response with a detailed error message.
 *
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 * @param {NextFunction} next - The Express next middleware function.
 * @returns {void}
 */
const validateProductType = (req: Request, res: Response, next: NextFunction): void => {
  const { type } = req.query;

  if (type && (typeof type !== 'string' || !(Object.values(IProductType) as string[]).includes(type as string))) {
    res.status(400).json(new ApiError(
      new Date().toISOString(),
      400,
      `Type must be one of ${Object.values(IProductType).join(', ')}`,
      req.originalUrl
    ));
    return;
  }

  next();
}


/**
 * Middleware for validating the request body when adding a new product.
 *
 * Ensures that the request body contains all required fields (`name`, `type`, `inventory`, and `cost`),
 * and that each field meets its specific validation criteria:
 * - `name`: A non-empty string.
 * - `type`: A valid string matching one of the allowed product types.
 * - `inventory`: A number between 1 and 9999.
 * - `cost`: A positive number.
 *
 * If validation fails, it sends a 400 Bad Request response with a detailed error message.
 *
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 * @param {NextFunction} next - The Express next middleware function.
 * @returns {void}
 */
const validateAddProductRequestBody = (req: Request, res: Response, next: NextFunction): void => {
  const { name, type, inventory, cost } = req.body;

  if ([name, type, inventory, cost].some(value => value === undefined || value === null)) {
    res.status(400).json(new ApiError(
      new Date().toISOString(),
      400,
      "Request body is missing required fields",
      req.originalUrl
    ));
    return;
  }

  if (typeof name !== 'string' || name.trim() === '') {
    res.status(400).json(new ApiError(
      new Date().toISOString(),
      400,
      "Name must be a non-empty string",
      req.originalUrl
    ));
    return;
  }

  if (typeof type !== 'string' || !(Object.values(IProductType) as string[]).includes(type)) {
    res.status(400).json(new ApiError(
      new Date().toISOString(),
      400,
      `Type must be one of ${Object.values(IProductType).join(', ')}`,
      req.originalUrl
    ));
    return;
  }

  if (typeof inventory !== 'number' || inventory < 1 || inventory > 9999) {
    res.status(400).json(new ApiError(
      new Date().toISOString(),
      400,
      "Inventory must be a number between 1 and 9999",
      req.originalUrl
    ));
  }

  if (typeof cost !== 'number' || cost < 0) {
    res.status(400).json(new ApiError(
      new Date().toISOString(),
      400,
      "Cost must be a positive number",
      req.originalUrl
    ));
  }

  next();
}


export {
  validateProductType,
  validateAddProductRequestBody,
};
