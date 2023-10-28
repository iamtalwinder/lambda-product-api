import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { container } from '../inversify.config';
import { IProductService } from '../services';
import { TYPES } from '../types';

export const getProductsHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const productService = container.get<IProductService>(TYPES.ProductService);

  try {
    const limit = event.queryStringParameters?.limit ? parseInt(event.queryStringParameters.limit) : 10;
    const lastEvaluatedKey = event.queryStringParameters?.lastEvaluatedKey;

    const { items, lastEvaluatedKey: newLastEvaluatedKey } = await productService.getProducts(limit, lastEvaluatedKey);

    return {
      statusCode: 200,
      body: JSON.stringify({ items, lastEvaluatedKey: newLastEvaluatedKey }),
    };
  } catch (err) {
    console.error(err);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: 'Some error happened',
      }),
    };
  }
};



