
import { ProductType } from '@/src/types/productType';
import { categories } from '../mocks/categories';

export async function getCategories(limit: Number = 100, offset: Number = 0): Promise<string[]> {
    //   const response = await api.get('/products');
    return categories;
}