import 'reflect-metadata';
import { Container } from 'inversify';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';
import { IProductService, ProductService } from './services';
import { TYPES } from './types';

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

const container = new Container();

container.bind<IProductService>(TYPES.ProductService).to(ProductService);
container.bind<DynamoDBClient>(TYPES.DynamoDBClient).toConstantValue(client);
container.bind<DynamoDBDocumentClient>(TYPES.DynamoDBDocumentClient).toConstantValue(docClient);

export { container };
