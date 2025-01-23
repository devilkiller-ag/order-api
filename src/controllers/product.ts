import { db } from '../db/db';
import { IProduct } from '../types/ProductType';
import { Request, Response } from 'express';


// Controller for getting all products
const handleGetAllProducts = (req: Request, res: Response) => {

}

// Controller for adding a new product
const handleAddProduct = (req: Request, res: Response) => {
  const { name, type, inventory } = req.body;

  const newProduct: IProduct = {
    id: db.products.size + 1,
    name,
    type,
    inventory
  }

  db.add(newProduct);

  console.log(db.products);

  res.status(201).json({
    "id": newProduct.id
  });
}


export {
  handleGetAllProducts,
  handleAddProduct,
}
