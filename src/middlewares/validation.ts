import { Request, Response, NextFunction } from 'express';

import { IProductType } from '../types/ProductType';
import { sendValidationError } from '../utils/sendErrors';
import { isValidProductName, isValidProductType, isValidProductInventory, isValidProductCost } from '../utils/vaildateProductProperties';


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

  if (type && !isValidProductType(type)) {
    const errorMessage = `Type must be one of ${Object.values(IProductType).join(', ')}`;
    sendValidationError(res, errorMessage, req.originalUrl);
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
    const errorMessage = "Request body is missing required fields";
    sendValidationError(res, errorMessage, req.originalUrl);
    return;
  }

  if (!isValidProductName(name)) {
    const errorMessage = "Name must be a non-empty string";
    sendValidationError(res, errorMessage, req.originalUrl);
    return;
  }

  if (!isValidProductType(type)) {
    const errorMessage = `Type must be one of ${Object.values(IProductType).join(', ')}`;
    sendValidationError(res, errorMessage, req.originalUrl);
    return;
  }

  if (!isValidProductInventory(inventory)) {
    const errorMessage = "Inventory must be a number between 1 and 9999";
    sendValidationError(res, errorMessage, req.originalUrl);
    return;
  }

  if (!isValidProductCost(cost)) {
    const errorMessage = "Cost must be a positive number";
    sendValidationError(res, errorMessage, req.originalUrl);
    return;
  }

  next();
}


export {
  validateProductType,
  validateAddProductRequestBody,
};
