import { IsArray, IsNotEmpty, IsNumber, IsString, Min, IsUrl, IsOptional } from 'class-validator';
import { Product } from '../models';

export class UpdateProductDto implements Omit<Product, '_id'> {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  name: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  sku: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  @Min(0)
  @IsOptional()
  price: number;

  @IsString()
  @IsOptional()
  category?: string;

  @IsArray()
  @IsUrl({}, { each: true })
  @IsOptional()
  images?: string[];

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  tags?: string[];
}
