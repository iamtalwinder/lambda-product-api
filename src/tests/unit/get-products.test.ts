import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { expect, describe, it } from '@jest/globals';
import { event as baseEvent } from './mock/event';
import { getProductsHandler } from '../../handlers/get-products';
import { mockProductService } from './mock/mock-product.service';
import { container } from '../../inversify.config';
import { IProductService } from '../../services';
import { TYPES } from '../../types';
import { products } from './mock/products';

container.rebind<IProductService>(TYPES.ProductService).toConstantValue(mockProductService);

describe('getProductsHandler', function () {
    describe('when correct data is passed', function () {
        it('should return successful response', async () => {
            const event: APIGatewayProxyEvent = {
                ...baseEvent,
                httpMethod: 'GET',
                path: '/product',
            };

            const result: APIGatewayProxyResult = await getProductsHandler(event);

            expect(result.statusCode).toEqual(200);
            expect(result.body).toEqual(
                JSON.stringify({
                    items: products,
                    lastEvaluatedKey: 'test',
                }),
            );
        });
    });
});
