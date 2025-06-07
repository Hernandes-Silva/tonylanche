
export type ProductType = {
    uuid: string;
    name: string;
    price: number;
    category_name: string;
}

export type HistoricProduct = ProductType & {
  quantity?: number;
};
