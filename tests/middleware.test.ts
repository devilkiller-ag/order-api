import { Request, Response } from 'express';

import { validateProductType, validateAddProductRequestBody } from '../src/middlewares/validation';

describe('validateAddProductRequestBody Middleware', () => {
  const mockRequest = (body: any): Partial<Request> => ({ body });
  const mockResponse = (): Partial<Response> => {
    const res: Partial<Response> = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
  };
  const mockNext = jest.fn();

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

  test('should return 400 for missing fields', () => {
    const req = mockRequest({});
    const res = mockResponse();
    validateAddProductRequestBody(req as Request, res as Response, mockNext);
    expect(res.status).toHaveBeenCalledWith(400);
  });

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


describe('validateProductType Middleware', () => {
  const mockRequest = (query: any): Partial<Request> => ({ query });
  const mockResponse = (): Partial<Response> => {
    const res: Partial<Response> = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
  };
  const mockNext = jest.fn();

  test('should call next() for valid product type', () => {
    const req = mockRequest({ type: 'gadget' });
    const res = mockResponse();
    validateProductType(req as Request, res as Response, mockNext);
    expect(mockNext).toHaveBeenCalled();
  });

  test('should return 400 for invalid product type', () => {
    const req = mockRequest({ type: 'invalid' });
    const res = mockResponse();
    validateProductType(req as Request, res as Response, mockNext);
    expect(res.status).toHaveBeenCalledWith(400);
  });
});
