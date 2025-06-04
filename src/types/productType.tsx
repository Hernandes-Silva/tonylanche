
export type ProductType = {
    uuid: string;
    title: string;
    value: number;
    category: string;
}

export type HistoricProduct = ProductType & {
  quantity?: number;
};
