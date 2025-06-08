import { products } from '../mocks/products';
import { CreateProductType, ProductType } from '@/src/types/productType';
import api from './api';

export async function getProducts(limit: Number = 100, offset: Number = 0): Promise<ProductType[]> {
    const response = await api.get('/products');
    return response.data;
}


export async function getProductsByDate(date: Date = new Date(), limit: Number = 100, offset: Number = 0): Promise<ProductType[]> {
    const response = await api.get('/products');
    return response.data;
}

export async function createProduct(data: CreateProductType): Promise<ProductType> {
    const response = await api.post('/products/', data);
    return response.data;
}

export async function updateProduct(data: CreateProductType, uuid: string): Promise<ProductType> {
    const response = await api.put('/products/'+uuid, data);
    return response.data;
}