
import { ProductType } from '@/src/types/productType';
import { CategoryType } from '@/src/types/categoryType';
import { categories } from '../mocks/categories';
import api from './api';

export async function getCategories(limit: Number = 100, offset: Number = 0): Promise<CategoryType[]> {
    const response = await api.get('/categories');
    return response.data
}

export async function getCategoriesNames(limit: Number = 100, offset: Number = 0): Promise<string[]> {
    const response = await getCategories();
    var categories: CategoryType[] = response
    const names: string[] = categories.map(item => item.name);
    return names
}
export async function createCategory(name: string): Promise<CategoryType> {
    const response = await api.post('/categories/', {"name": name});
    var category: CategoryType = response.data
    return category
}

export async function updateCategory(uuid:string, name: string): Promise<CategoryType> {
    const response = await api.put('/categories/'+uuid, {"name": name});
    var category: CategoryType = response.data
    return category
}