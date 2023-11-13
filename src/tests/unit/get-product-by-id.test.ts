import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { expect, describe, it } from '@jest/globals';
import { event as baseEvent } from './mock/event';
import { getProductByIdHandler } from '../../handlers/get-product-by-id';
import { mockProductService } from './mock/mock-product.service';
import { container } from '../../inversify.config';
import { IProductService } from '../../services';
import { products } from './mock/products';
import { TYPES } from '../../types';

container.rebind<IProductService>(TYPES.ProductService).toConstantValue(mockProductService);

describe('getProductByIdHandler', function () {
    describe('when correct data is passed', function () {
        it('should return successful response', async () => {
            const event: APIGatewayProxyEvent = {
                ...baseEvent,
                httpMethod: 'GET',
                path: '/product/test',
                pathParameters: {
                    id: 'test',
                },
            };

            const result: APIGatewayProxyResult = await getProductByIdHandler(event);

            expect(result.statusCode).toEqual(200);
            expect(result.body).toEqual(JSON.stringify(products[0]));
        });
    });
});
