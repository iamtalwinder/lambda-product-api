import { inject, injectable } from 'inversify';
import { DeleteCommand, DynamoDBDocumentClient, GetCommand, PutCommand, ScanCommand } from '@aws-sdk/lib-dynamodb';
import { v4 as uuidv4 } from 'uuid';
import { CreateProductDto, UpdateProductDto } from '../dtos';
import { TYPES } from '../types';
import { Product } from '../models';

export interface IProductService {
    getProduct(_id: string): Promise<Product | null>;
    getProducts(limit: number, lastEvaluatedKey?: string): Promise<{ items: Product[]; lastEvaluatedKey?: string }>;
    createProduct(product: CreateProductDto): Promise<void>;
    deleteProduct(_id: string): Promise<void>;
    updateProduct(_id: string, product: UpdateProductDto): Promise<void>;
}

@injectable()
export class ProductService implements IProductService {
    private tableName = 'Products';

    constructor(@inject(TYPES.DynamoDBDocumentClient) private docClient: DynamoDBDocumentClient) {}

    async getProduct(_id: string): Promise<Product | null> {
        const params = {
            TableName: this.tableName,
            Key: { _id },
        };

        const response = await this.docClient.send(new GetCommand(params));
        return (response.Item as Product) || null;
    }

    async getProducts(
        limit: number,
        lastEvaluatedKey?: string,
    ): Promise<{ items: Product[]; lastEvaluatedKey?: string }> {
        const params = {
            TableName: this.tableName,
            Limit: limit,
            ...(lastEvaluatedKey && { ExclusiveStartKey: { _id: lastEvaluatedKey } }),
        };

        const response = await this.docClient.send(new ScanCommand(params));

        return {
            items: response.Items as Product[],
            lastEvaluatedKey: response.LastEvaluatedKey?._id,
        };
    }

    async createProduct(product: CreateProductDto): Promise<void> {
        const _id = uuidv4();
        const params = {
            TableName: this.tableName,
            Item: {
                _id,
                ...product,
            },
        };

        await this.docClient.send(new PutCommand(params));
    }

    async deleteProduct(_id: string): Promise<void> {
        const params = {
            TableName: this.tableName,
            Key: { _id },
        };

        await this.docClient.send(new DeleteCommand(params));
    }

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
