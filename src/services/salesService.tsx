import { historicProducts, products } from '../mocks/products';
import { HistoricProduct, ProductType } from '@/src/types/productType';

export async function getSalesByDate(date: Date = new Date(), limit: Number = 100, offset: Number = 0): Promise<HistoricProduct[]> {
    //   const response = await api.get('/products');
    return historicProducts;
}