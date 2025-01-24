import { db } from '../src/db/db';
import { IProduct, IProductType } from '../src/types/ProductType';


/**
 * Test suite for the DB class
 * This suite tests the basic operations of the DB class, including adding, retrieving,
 * and removing products from the database.
 */
describe('DB Class', () => {
  /** @type {IProduct} A sample product object for testing purposes */
  const sampleProduct: IProduct = {
    id: 1,
    name: 'Sample Product',
    type: IProductType.GADGET,
    inventory: 10,
    cost: 100,
  };

  /**
  * Runs before each test to clear the products in the database.
  */
  beforeEach(() => {
    db.products.clear();
  });

  /**
   * Test case to verify that a product can be added to the database.
   * It checks if the product is correctly added and can be retrieved by its ID.
   */
  test('should add a product to the database', () => {
    db.add(sampleProduct);
    expect(db.get(1)).toEqual(sampleProduct);
  });

  /**
   * Test case to verify that all products can be retrieved from the database.
   * It checks if the added product is returned when fetching all products.
   */
  test('should retrieve all products', () => {
    db.add(sampleProduct);
    const products = db.getAll();
    expect(products).toHaveLength(1);
    expect(products[0]).toEqual(sampleProduct);
  });

  /**
   * Test case to verify that a product can be deleted from the database.
   * It checks if the product is successfully removed from the database.
   */
  test('should delete a product from the database', () => {
    db.add(sampleProduct);
    db.remove(1);
    expect(db.get(1)).toBeUndefined();
  });
});
