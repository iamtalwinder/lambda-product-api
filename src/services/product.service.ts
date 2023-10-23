import { inject, injectable } from 'inversify';
import { DynamoDBDocumentClient, PutCommand } from '@aws-sdk/lib-dynamodb';
import { UpdateProductDto } from '../dtos';
import { Product } from '../models';
import { TYPES } from '../types';

export interface IProductService {
  updateProduct(_id: string, product: UpdateProductDto): Promise<void>;
}

@injectable()
export class ProductService implements IProductService {
  private tableName = 'Products';

  constructor(
    @inject(TYPES.DynamoDBDocumentClient) private docClient: DynamoDBDocumentClient
  ) {}

  async updateProduct(_id: string, product: UpdateProductDto): Promise<void> {
    const params = {
      TableName: this.tableName,
      Item: {
        _id,
        ...product,
      },
    };

    await this.docClient.send(new PutCommand(params));
  }
}
