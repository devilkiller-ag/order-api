import { db } from '../src/db/db';
import { IProduct, IProductType } from '../src/types/ProductType';

describe('DB Class', () => {
  const sampleProduct: IProduct = {
    id: 1,
    name: 'Sample Product',
    type: IProductType.GADGET,
    inventory: 10,
    cost: 100,
  };

  beforeEach(() => {
    db.products.clear();
  });

  test('should add a product to the database', () => {
    db.add(sampleProduct);
    expect(db.get(1)).toEqual(sampleProduct);
  });

  test('should retrieve all products', () => {
    db.add(sampleProduct);
    const products = db.getAll();
    expect(products).toHaveLength(1);
    expect(products[0]).toEqual(sampleProduct);
  });

  test('should delete a product from the database', () => {
    db.add(sampleProduct);
    db.remove(1);
    expect(db.get(1)).toBeUndefined();
  });
});
