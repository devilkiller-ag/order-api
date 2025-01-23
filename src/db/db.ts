/**
 * In memory database for products.
 */

import { IProductType, IProduct } from "../types/ProductType";

class DB {
  products: Map<number, IProduct>;

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

const db = new DB();

export { db };
