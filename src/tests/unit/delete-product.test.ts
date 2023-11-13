import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { expect, describe, it } from '@jest/globals';
import { event as baseEvent } from './mock/event';
import { deleteProductHandler } from '../../handlers/delete-product';
import { mockProductService } from './mock/mock-product.service';
import { container } from '../../inversify.config';
import { IProductService } from '../../services';
import { TYPES } from '../../types';

container.rebind<IProductService>(TYPES.ProductService).toConstantValue(mockProductService);

describe('deleteProductHandler', function () {
    describe('when correct data is passed', function () {
        it('should return successful response', async () => {
            const event: APIGatewayProxyEvent = {
                ...baseEvent,
                httpMethod: 'DELETE',
                path: '/product/123',
                pathParameters: {
                    id: '123',
                },
            };

            const result: APIGatewayProxyResult = await deleteProductHandler(event);

            expect(result.statusCode).toEqual(200);
            expect(result.body).toEqual(JSON.stringify({ message: 'Product deleted' }));
        });
    });

    describe('when dto is missing data', function () {
        it('should return 400 error', async () => {
            const event: APIGatewayProxyEvent = {
                ...baseEvent,
                httpMethod: 'DELETE',
                path: '/product/123',
            };

            const result: APIGatewayProxyResult = await deleteProductHandler(event);

            expect(result.statusCode).toEqual(400);
        });
    });

    describe('when there is error in product service', function () {
        it('should return 500 error', async () => {
            const event: APIGatewayProxyEvent = {
                ...baseEvent,
                httpMethod: 'DELETE',
                path: '/product/123',
                pathParameters: {
                    id: '123',
                },
            };

            mockProductService.deleteProduct.mockImplementation(() => {
                throw Error('Error saving data');
            });

            const result: APIGatewayProxyResult = await deleteProductHandler(event);

            expect(result.statusCode).toEqual(500);
        });
    });
});
