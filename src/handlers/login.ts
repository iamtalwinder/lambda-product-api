import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { LoginDto } from '../dtos';
import { container } from '../inversify.config';
import { IAuthService, LoginSuccessResponse } from '../services';
import { TYPES } from '../types';

export const loginHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const authService = container.get<IAuthService>(TYPES.AuthService);

  try {
    if (!event.body) {
      return { statusCode: 400, body: JSON.stringify({ message: 'Request body is empty' }) };
    }

    const loginRequest = plainToClass(LoginDto, JSON.parse(event.body));
    const validationErrors = await validate(loginRequest);

    if (validationErrors.length > 0) {
      return { statusCode: 400, body: JSON.stringify(validationErrors) };
    }

    const response: LoginSuccessResponse = await authService.login(loginRequest.email, loginRequest.password);

    return { statusCode: 200, body: JSON.stringify(response) };
  } catch (err) {
    console.error(err);
    return { statusCode: 500, body: JSON.stringify({ message: 'Internal server error' }) };
  }
};
