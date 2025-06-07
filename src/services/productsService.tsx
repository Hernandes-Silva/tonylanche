import { products } from '../mocks/products';
import { CreateProduct, ProductType } from '@/src/types/productType';
import api from './api';

export async function getProducts(limit: Number = 100, offset: Number = 0): Promise<ProductType[]> {
    const response = await api.get('/products');
    return response.data;
}


export async function getProductsByDate(date: Date = new Date(), limit: Number = 100, offset: Number = 0): Promise<ProductType[]> {
    const response = await api.get('/products');
    return response.data;
}

export async function createProduct(data: CreateProduct): Promise<ProductType> {
    const response = await api.post('/products/', data);
    return response.data;
}