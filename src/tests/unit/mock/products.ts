import { Product } from '../../../models';

export const products: Product[] = [
  {
    _id: 'test',
    category: 'Electronics',
    images: ['https://example.com/image1.jpg', 'https://example.com/image2.jpg'],
    price: 99.99,
    description: 'This is an example product description.',
    name: 'Example Product',
    sku: 'SKU12345',
    tags: ['tag1', 'tag2', 'tag3'],
  },
];
