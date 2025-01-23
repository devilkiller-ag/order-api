/**
 * In-memory database for managing products.
 * 
 * This class provides CRUD (Create, Read, Update, Delete) operations
 * for handling product data stored in memory using a `Map`.
 */

import { IProductType, IProduct } from "../types/ProductType";

class DB {
  /**
   * A `Map` to store products, where the key is the product ID, and the value is the product object.
   */
  products: Map<number, IProduct>;

  /**
   * Constructs a new in-memory database instance.
   */
  constructor() {
    this.products = new Map();
  }

  /**
   * Retrieves a product by its ID.
   *
   * @param {number} id - The unique identifier of the product.
   * @returns {IProduct | undefined} The product object if found, otherwise `undefined`.
   */
  get(id: number): IProduct | undefined {
    return this.products.get(id);
  }

  /**
   * Retrieves all products from the database.
   *
   * @returns {IProduct[]} An array containing all products.
   */
  getAll(): IProduct[] {
    return [...this.products.values()];
  }

  /**
   * Adds a new product to the database.
   *
   * @param {IProduct} product - The product object to add.
   * @returns {void}
   */
  add(product: IProduct): void {
    this.products.set(product.id, product);
  }

  /**
   * Removes a product from the database by its ID.
   *
   * @param {number} id - The unique identifier of the product to remove.
   * @returns {void}
   */
  remove(id: number): void {
    this.products.delete(id);
  }
}

/**
 * Singleton instance of the in-memory database.
 */
const db = new DB();

export { db };
