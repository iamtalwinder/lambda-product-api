import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { container } from '../inversify.config';
import { IProductService } from '../services';
import { TYPES } from '../types';
import { UpdateProductDto } from '../dtos';

export const updateProductHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const productService = container.get<IProductService>(TYPES.ProductService);

  try {
    const productId = event.pathParameters?.id;
    if (!productId) {
      return {
        statusCode: 400,
        body: 'Product ID is missing',
      };
    }

    if (!event.body) {
      return {
        statusCode: 400,
        body: 'Event body is empty',
      };
    }

    const dto = plainToClass(UpdateProductDto, JSON.parse(event.body));
    const errors = await validate(dto);

    if (errors.length > 0) {
      return {
        statusCode: 400,
        body: JSON.stringify(errors),
      };
    }

    await productService.updateProduct(productId, dto);

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
