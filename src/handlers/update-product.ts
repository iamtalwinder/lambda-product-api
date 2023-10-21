import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { container } from '../inversify.config';
import { IProductService } from '../services';
import { TYPES } from '../types';
import { Product } from '../models';

export const lambdaHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const productService = container.get<IProductService>(TYPES.ProductService);

  try {
    if (!event.body) {
      return {
        statusCode: 400,
        body: 'Event body is empty',
      };
    }

    const product: Product = JSON.parse(event.body);
    await productService.saveProduct(product);
    
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Product saved',
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
