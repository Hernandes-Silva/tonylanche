
export type ProductType = {
    uuid: string;
    name: string;
    price: number;
    category: string;
}

export type HistoricProduct = ProductType & {
  quantity?: number;
};
