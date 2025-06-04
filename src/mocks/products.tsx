import { HistoricProduct, ProductType } from '@/src/types/productType';

export const products: ProductType[] = [
  { uuid: '1', title: 'Coca-Cola', value: 5, category: 'Bebidas' },
  { uuid: '2', title: 'Café', value: 3, category: 'Bebidas' },
  { uuid: '3', title: 'X-Tudo', value: 15.5, category: 'Lanches' },
  { uuid: '4', title: 'Pastel', value: 8, category: 'Lanches' },
  { uuid: '5', title: 'Suco Natural', value: 6, category: 'Bebidas'},
  { uuid: '6', title: 'Batata Frita', value: 10, category: 'Acompanhamentos' },
  { uuid: '7', title: 'Lata fanta uva', value: 6, category: 'Bebidas' },
  { uuid: '9', title: 'ervilhas', value: 10, category: 'Acompanhamentos' },
];

export const historicProducts: HistoricProduct[] = [
  { uuid: '1', title: 'Coca-Cola', value: 5, category: 'Bebidas', quantity: 1 },
  { uuid: '2', title: 'Café', value: 3, category: 'Bebidas', quantity: 2 },
  { uuid: '3', title: 'X-Tudo', value: 15.5, category: 'Lanches', quantity: 1 },
  { uuid: '4', title: 'Pastel', value: 8, category: 'Lanches', quantity: 1 },
  { uuid: '5', title: 'Suco Natural', value: 6, category: 'Bebidas', quantity: 1},
  { uuid: '6', title: 'Batata Frita', value: 10, category: 'Acompanhamentos', quantity: 1 },
  { uuid: '7', title: 'Lata fanta uva', value: 6, category: 'Bebidas', quantity: 1 },
  { uuid: '9', title: 'ervilhas', value: 10, category: 'Acompanhamentos', quantity: 1 },
];
