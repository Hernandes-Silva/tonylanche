import { products } from '../mocks/products';
import { ProductType } from '@/src/types/productType';

export async function getSalesByDate(date: Date = new Date(), limit: Number = 100, offset: Number = 0): Promise<ProductType[]> {
    //   const response = await api.get('/products');
    return products;
}