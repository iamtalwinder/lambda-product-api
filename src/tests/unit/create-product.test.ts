import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { expect, describe, it } from '@jest/globals';
import { event as baseEvent } from './mock/event';
import { createProductHandler } from '../../handlers/create-product';
import { mockProductService } from './mock/mock-product.service';
import { container } from '../../inversify.config';
import { CreateProductDto } from '../../dtos';
import { IProductService } from '../../services';
import { TYPES } from '../../types';

container.rebind<IProductService>(TYPES.ProductService).toConstantValue(mockProductService);

describe('createProductHandler', function () {
  const dto: CreateProductDto = {
    category: 'Electronics',
    images: ['https://example.com/image1.jpg', 'https://example.com/image2.jpg'],
    price: 99.99,
    description: 'This is an example product description.',
    name: 'Example Product',
    sku: 'SKU12345',
    tags: ['tag1', 'tag2', 'tag3'],
  };

  describe('when correct data is passed', function () {
    it('should return successful response', async () => {
      const event: APIGatewayProxyEvent = {
        ...baseEvent,
        body: JSON.stringify(dto),
      };

      const result: APIGatewayProxyResult = await createProductHandler(event);

      expect(result.statusCode).toEqual(201);
      expect(result.body).toEqual(JSON.stringify({ message: 'Product created' }));
    });
  });

  describe('when dto is missing data', function () {
    it('should return 400 error', async () => {
      const event: APIGatewayProxyEvent = {
        ...baseEvent,
        body: JSON.stringify({ ...dto, name: '' }),
      };

      const result: APIGatewayProxyResult = await createProductHandler(event);

      expect(result.statusCode).toEqual(400);
    });
  });

  describe('when there is error in product service', function () {
    it('should return 500 error', async () => {
      const event: APIGatewayProxyEvent = {
        ...baseEvent,
        body: JSON.stringify(dto),
      };

      mockProductService.createProduct.mockImplementation(() => {
        throw Error('Error saving data');
      });

      const result: APIGatewayProxyResult = await createProductHandler(event);

      expect(result.statusCode).toEqual(500);
    });
  });
});
