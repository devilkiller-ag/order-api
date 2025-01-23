import { db } from '../db/db';
import { IProduct } from '../types/ProductTpye';
import { Request, Response } from 'express';


const handleGetAllProducts = (req: Request, res: Response) => {

}


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
