import request from 'supertest';

import { app, server } from '../src/index';
import { db } from '../src/db/db';
import { IProductType } from '../src/types/ProductType';

/**
 * Test suite for the Product routes.
 * This suite tests the GET and POST operations for managing products via the API.
 */
describe('Product Routes', () => {
  /**
   * Runs before each test to clear the products in the database.
   */
  beforeEach(() => {
    db.products.clear();
  });

  /**
   * Runs after all tests to close the server.
   */
  afterAll(() => {
    server.close();
  });

  /**
   * Test case to verify that GET /products returns all products.
   * It checks if products are properly retrieved and the status code is 200.
   */
  test('GET /products should return all products', async () => {
    db.add({
      id: 1,
      name: 'Product 1',
      type: IProductType.GADGET,
      inventory: 10,
      cost: 100,
    });

    const response = await request(app).get('/products');
    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(1);
  });

  /**
   * Test case to verify that POST /products adds a new product.
   * It checks if the product is added and the correct status code and response are returned.
   */
  test('POST /products should add a new product', async () => {
    const newProduct = {
      name: 'New Product',
      type: 'gadget',
      inventory: 10,
      cost: 50,
    };

    const response = await request(app).post('/products').send(newProduct);
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
  });

  /**
   * Test case to verify that GET /products?type=gadget filters products by type.
   * It checks if the products are properly filtered by the provided type.
   */
  test('GET /products?type=gadget should filter products by type', async () => {
    db.add({
      id: 1,
      name: 'Gadget Product',
      type: IProductType.GADGET,
      inventory: 10,
      cost: 100,
    });
    db.add({
      id: 2,
      name: 'Book Product',
      type: IProductType.BOOK,
      inventory: 5,
      cost: 20,
    });

    const response = await request(app).get('/products?type=gadget');
    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(1);
    expect(response.body[0].type).toBe('gadget');
  });

  /**
   * Test case to verify that GET /products?type=gadget returns a 404 if no products are found for the specified type.
   * It checks if the correct error response is returned when no products match the query.
   */
  test('GET /products?type=gadget should return 404 if no products are found for the specified type', async () => {
    db.add({
      id: 1,
      name: 'Gadget Product',
      type: IProductType.OTHER,
      inventory: 10,
      cost: 100,
    });
    db.add({
      id: 2,
      name: 'Book Product',
      type: IProductType.BOOK,
      inventory: 5,
      cost: 20,
    });

    const response = await request(app).get('/products?type=gadget');
    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      timestamp: expect.any(String),
      status: 404,
      error: `No products found for type: gadget`,
      path: '/products?type=gadget',
    });
  });
});
