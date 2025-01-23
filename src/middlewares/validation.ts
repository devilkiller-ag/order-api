import { Request, Response, NextFunction } from 'express';

import { ApiError } from '../utils/ApiError';
import { IProductType } from '../types/ProductType';


// Middleware for validating the request body
const validateAddProductRequestBody = (req: Request, res: Response, next: NextFunction): void => {
  const { name, type, inventory } = req.body;

  if ([name, type, inventory].some(value => value === undefined || value === null)) {
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

  next();
}


export {
  validateAddProductRequestBody,
};
