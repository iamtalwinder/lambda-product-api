import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { SignupDto } from '../dtos';
import { container } from '../inversify.config';
import { IAuthService } from '../services';
import { TYPES } from '../types';

export const signupHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const authService = container.get<IAuthService>(TYPES.AuthService);

  try {
    if (!event.body) {
      return { statusCode: 400, body: JSON.stringify({ message: 'Request body is empty' }) };
    }

    const signupRequest = plainToClass(SignupDto, JSON.parse(event.body));
    const validationErrors = await validate(signupRequest);

    if (validationErrors.length > 0) {
      return { statusCode: 400, body: JSON.stringify(validationErrors) };
    }

    await authService.signUp(signupRequest.email, signupRequest.password);

    return { statusCode: 200, body: JSON.stringify({ message: 'User registration successful' }) };
  } catch (err) {
    console.error(err);
    return { statusCode: 500, body: JSON.stringify({ message: 'Internal server error' }) };
  }
};
