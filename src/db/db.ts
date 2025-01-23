/**
 * In memory database for products.
 */

import { IProductType, IProduct } from "../types/ProductTpye";

class ProductsDB {
  private products: Map<number, IProduct>;

  constructor() {
    this.products = new Map();
  }

  get(id: number): IProduct | undefined {
    return this.products.get(id);
  }

  add(product: IProduct): void {
    this.products.set(product.id, product);
  }

  remove(id: number): void {
    this.products.delete(id);
  }
}

const prodcuts_db = new ProductsDB();

export { prodcuts_db };
