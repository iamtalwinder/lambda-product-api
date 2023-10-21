import { inject, injectable } from 'inversify';
import { DynamoDBDocumentClient, PutCommand } from '@aws-sdk/lib-dynamodb';
import { Product } from '../models';
import { TYPES } from '../types';

export interface IProductService {
  saveProduct(product: Product): Promise<void>;
}

@injectable()
export class ProductService implements IProductService {
  private tableName = 'Products';

  constructor(
    @inject(TYPES.DynamoDBDocumentClient) private docClient: DynamoDBDocumentClient
  ) {}

  async saveProduct(product: Product): Promise<void> {
    const params = {
      TableName: this.tableName,
      Item: product,
    };

    await this.docClient.send(new PutCommand(params));
  }
}
