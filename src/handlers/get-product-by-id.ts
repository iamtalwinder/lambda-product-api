import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { container } from '../inversify.config';
import { IProductService } from '../services';
import { TYPES } from '../types';

export const getProductByIdHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const productService = container.get<IProductService>(TYPES.ProductService);

  try {
    const productId = event.pathParameters?.id;
    if (!productId) {
      return {
        statusCode: 400,
        body: 'Product ID is missing',
      };
    }

    const product = await productService.getProduct(productId);

    return {
      statusCode: 200,
      body: JSON.stringify(product),
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
