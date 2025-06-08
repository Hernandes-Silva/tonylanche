import { historicProducts, products } from '../mocks/products';
import { HistoricProduct, ProductType } from '@/src/types/productType';
import { CreateListSaleType } from '../types/salesType';
import api from './api';

export async function getSalesByDate(date: Date = new Date(), limit: Number = 100, offset: Number = 0): Promise<HistoricProduct[]> {
    //   const response = await api.get('/products');
    return historicProducts;
}

export async function createSale(payload:CreateListSaleType) {
    const response = await api.post("/sales/", payload);
    if (response.status != 201){
        throw new Error(response.statusText);
    }
    return response.data
}