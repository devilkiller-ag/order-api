import { Request, Response } from 'express';

import { validateProductType, validateAddProductRequestBody } from '../src/middlewares/validation';


/**
 * Test suite for the validateAddProductRequestBody middleware.
 * This suite tests the validation logic for the request body when adding a product.
 */
describe('validateAddProductRequestBody Middleware', () => {
  /**
   * Mock request object with a specified body.
   * @param {any} body The body to set for the mock request.
   * @returns {Partial<Request>} A mock request object.
   */
  const mockRequest = (body: any): Partial<Request> => ({ body });

  /**
   * Mock response object with mocked status and json methods.
   * @returns {Partial<Response>} A mock response object.
   */
  const mockResponse = (): Partial<Response> => {
    const res: Partial<Response> = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
  };

  /** @type {jest.Mock} Mock next function */
  const mockNext = jest.fn();

  /**
   * Test case to verify that the middleware calls next() when the product body is valid.
   */
  test('should call next() for valid product', () => {
    const req = mockRequest({
      name: 'Valid Product',
      type: 'gadget',
      inventory: 10,
      cost: 50,
    });
    const res = mockResponse();
    validateAddProductRequestBody(req as Request, res as Response, mockNext);
    expect(mockNext).toHaveBeenCalled();
  });

  /**
   * Test case to verify that the middleware returns a 400 status for missing fields in the request body.
   */
  test('should return 400 for missing fields', () => {
    const req = mockRequest({});
    const res = mockResponse();
    validateAddProductRequestBody(req as Request, res as Response, mockNext);
    expect(res.status).toHaveBeenCalledWith(400);
  });

  /**
   * Test case to verify that the middleware returns a 400 status for an invalid product name.
   */
  test('should return 400 for invalid name', () => {
    const req = mockRequest({
      name: 334,
      type: 'other',
      inventory: 10,
      cost: 50,
    });
    const res = mockResponse();
    validateAddProductRequestBody(req as Request, res as Response, mockNext);
    expect(res.status).toHaveBeenCalledWith(400);
  });

  /**
   * Test case to verify that the middleware returns a 400 status for an invalid product type.
   */
  test('should return 400 for invalid type', () => {
    const req = mockRequest({
      name: 'Invalid Type',
      type: 'invalid',
      inventory: 10,
      cost: 50,
    });
    const res = mockResponse();
    validateAddProductRequestBody(req as Request, res as Response, mockNext);
    expect(res.status).toHaveBeenCalledWith(400);
  });

  /**
   * Test case to verify that the middleware returns a 400 status for an invalid inventory type.
   */
  test('should return 400 for invalid inventory type', () => {
    const req = mockRequest({
      name: 334,
      type: 'other',
      inventory: '345',
      cost: 50,
    });
    const res = mockResponse();
    validateAddProductRequestBody(req as Request, res as Response, mockNext);
    expect(res.status).toHaveBeenCalledWith(400);
  });

  /**
  * Test case to verify that the middleware returns a 400 status for an invalid inventory range.
  */
  test('should return 400 for invalid inventory range', () => {
    const req = mockRequest({
      name: 334,
      type: 'other',
      inventory: 10000,
      cost: 50,
    });
    const res = mockResponse();
    validateAddProductRequestBody(req as Request, res as Response, mockNext);
    expect(res.status).toHaveBeenCalledWith(400);
  });

  /**
   * Test case to verify that the middleware returns a 400 status for an invalid cost type.
   */
  test('should return 400 for invalid cost', () => {
    const req = mockRequest({
      name: 334,
      type: 'other',
      inventory: 10000,
      cost: '34',
    });
    const res = mockResponse();
    validateAddProductRequestBody(req as Request, res as Response, mockNext);
    expect(res.status).toHaveBeenCalledWith(400);
  });

  /**
   * Test case to verify that the middleware returns a 400 status for an invalid cost range.
   */
  test('should return 400 for invalid cost range', () => {
    const req = mockRequest({
      name: 334,
      type: 'other',
      inventory: 10000,
      cost: -67,
    });
    const res = mockResponse();
    validateAddProductRequestBody(req as Request, res as Response, mockNext);
    expect(res.status).toHaveBeenCalledWith(400);
  });
});


/**
 * Test suite for the validateProductType middleware.
 * This suite tests the validation logic for the product type query parameter.
 */
describe('validateProductType Middleware', () => {
  /**
   * Mock request object with a specified query parameter.
   * @param {any} query The query to set for the mock request.
   * @returns {Partial<Request>} A mock request object.
   */
  const mockRequest = (query: any): Partial<Request> => ({ query });

  /**
   * Mock response object with mocked status and json methods.
   * @returns {Partial<Response>} A mock response object.
   */
  const mockResponse = (): Partial<Response> => {
    const res: Partial<Response> = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
  };

  /** @type {jest.Mock} Mock next function */
  const mockNext = jest.fn();

  /**
   * Test case to verify that the middleware calls next() for a valid product type.
   */
  test('should call next() for valid product type', () => {
    const req = mockRequest({ type: 'gadget' });
    const res = mockResponse();
    validateProductType(req as Request, res as Response, mockNext);
    expect(mockNext).toHaveBeenCalled();
  });

  /**
   * Test case to verify that the middleware returns a 400 status for an invalid product type.
   */
  test('should return 400 for invalid product type', () => {
    const req = mockRequest({ type: 'invalid' });
    const res = mockResponse();
    validateProductType(req as Request, res as Response, mockNext);
    expect(res.status).toHaveBeenCalledWith(400);
  });
});
