import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { container } from '../inversify.config';
import { IProductService } from '../services';
import { TYPES } from '../types';
import { CreateProductDto } from '../dtos';

export const createProductHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const productService = container.get<IProductService>(TYPES.ProductService);

  try {
    if (!event.body) {
      return {
        statusCode: 400,
        body: 'Event body is empty',
      };
    }

    const dto = plainToClass(CreateProductDto, JSON.parse(event.body));
    const errors = await validate(dto);

    if (errors.length > 0) {
      return {
        statusCode: 400,
        body: JSON.stringify(errors),
      };
    }

    await productService.createProduct(dto);
    
    return {
      statusCode: 201,
      body: JSON.stringify({
        message: 'Product created',
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

