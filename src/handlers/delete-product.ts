import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { container } from '../inversify.config';
import { IProductService } from '../services';
import { TYPES } from '../types';

export const deleteProductHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const productService = container.get<IProductService>(TYPES.ProductService);

  try {
    const productId = event.pathParameters?.id;
    if (!productId) {
      return {
        statusCode: 400,
        body: 'Product ID is missing',
      };
    }

    await productService.deleteProduct(productId);

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Product deleted',
      }),
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
