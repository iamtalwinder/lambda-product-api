import { jest } from '@jest/globals';
import { CreateProductDto, UpdateProductDto } from '../../../dtos';
import { products } from './products';

export const mockProductService = {
  createProduct: jest.fn(async (dto: CreateProductDto) => {}),
  getProduct: jest.fn(async (_id: string) => products.find(product => product._id === _id) || null),
  getProducts: jest.fn(async (limit: number, lastEvaluatedKey?: string) => {
    return {
      items: products.slice(0, limit),
      lastEvaluatedKey: lastEvaluatedKey || 'test'
    }
  }),
  deleteProduct: jest.fn(async (_id: string) => {}),
  updateProduct: jest.fn(async (_id: string, dto: UpdateProductDto) => {}),
};
