import { IsArray, IsNotEmpty, IsNumber, IsString, Min, IsUrl } from 'class-validator';
import { Product } from '../models';

export class CreateProductDto implements Omit<Product, '_id'> {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  sku: string;

  @IsString()
  description?: string;

  @IsNumber()
  @Min(0)
  price: number;

  @IsString()
  category?: string;

  @IsArray()
  @IsUrl({}, { each: true })
  images?: string[];

  @IsArray()
  @IsString({ each: true })
  tags?: string[];
}
