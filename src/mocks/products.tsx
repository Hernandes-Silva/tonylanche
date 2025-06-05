import { HistoricProduct, ProductType } from '@/src/types/productType';

export const products: ProductType[] = [
  { uuid: '1', name: 'Coca-Cola', price: 5, category: 'Bebidas' },
  { uuid: '2', name: 'Café', price: 3, category: 'Bebidas' },
  { uuid: '3', name: 'X-Tudo', price: 15.5, category: 'Lanches' },
  { uuid: '4', name: 'Pastel', price: 8, category: 'Lanches' },
  { uuid: '5', name: 'Suco Natural', price: 6, category: 'Bebidas'},
  { uuid: '6', name: 'Batata Frita', price: 10, category: 'Acompanhamentos' },
  { uuid: '7', name: 'Lata fanta uva', price: 6, category: 'Bebidas' },
  { uuid: '9', name: 'ervilhas', price: 10, category: 'Acompanhamentos' },
];

export const historicProducts: HistoricProduct[] = [
  { uuid: '1', name: 'Coca-Cola', price: 5, category: 'Bebidas', quantity: 1 },
  { uuid: '2', name: 'Café', price: 3, category: 'Bebidas', quantity: 2 },
  { uuid: '3', name: 'X-Tudo', price: 15.5, category: 'Lanches', quantity: 1 },
  { uuid: '4', name: 'Pastel', price: 8, category: 'Lanches', quantity: 1 },
  { uuid: '5', name: 'Suco Natural', price: 6, category: 'Bebidas', quantity: 1},
  { uuid: '6', name: 'Batata Frita', price: 10, category: 'Acompanhamentos', quantity: 1 },
  { uuid: '7', name: 'Lata fanta uva', price: 6, category: 'Bebidas', quantity: 1 },
  { uuid: '9', name: 'ervilhas', price: 10, category: 'Acompanhamentos', quantity: 1 },
];
