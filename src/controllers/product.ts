import { db } from '../db/db';
import { IProduct, IProductType } from '../types/ProductType';
import { Request, Response } from 'express';
import getProductType from '../utils/GetProductType';
import { ApiError } from '../utils/ApiError';


// Controller for getting all products
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

// Controller for adding a new product
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
