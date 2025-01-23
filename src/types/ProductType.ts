/**
 * Enum representing the different types of products.
 *
 * @enum {string}
 */
enum IProductType {
  /** Represents a gadget product. */
  GADGET = 'gadget',

  /** Represents a book product. */
  BOOK = 'book',

  /** Represents a food product. */
  FOOD = 'food',

  /** Represents any other type of product. */
  OTHER = 'other'
}

/**
 * Interface representing a product.
 *
 * @interface IProduct
 */
interface IProduct {
  /**
   * The unique identifier for the product.
   * @type {number}
   */
  id: number;

  /**
   * The name of the product.
   * @type {string}
   */
  name: string;

  /**
   * The type of the product.
   * @type {IProductType}
   */
  type: IProductType;

  /**
   * The number of items available in inventory.
   * @type {number}
   */
  inventory: number;

  /**
   * The cost of the product.
   * @type {number}
   */
  cost: number;
}

export {
  IProductType,
  IProduct
};
