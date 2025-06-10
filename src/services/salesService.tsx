import { historicProducts, products } from '../mocks/products';
import { HistoricProduct, ProductType } from '@/src/types/productType';
import { CreateListSaleType } from '../types/salesType';
import api from './api';
import { format_date } from '../utils/utils';

export async function getSalesByDate(date: Date = new Date(), limit: Number = 100, offset: Number = 0): Promise<HistoricProduct[]> {
    const response = await api.get('/sales/historic', {params:{"sale_date": format_date(date).slice(0, 10)}});
    if (response.status != 200){
        console.log(response.statusText)
        throw new Error(response.statusText);
    }
    console.log(response.data)
    return response.data;
}

export async function createSale(payload:CreateListSaleType) {
    const response = await api.post("/sales/", payload);
    if (response.status != 201){
        throw new Error(response.statusText);
    }
    return response.data
}


export async function removeProductFromHistoric(product_uuid:string) {
    const response = await api.delete("/sales/remove/product/"+product_uuid);
    if (response.status != 200){
        throw new Error(response.statusText);
    }
    return response.data
}