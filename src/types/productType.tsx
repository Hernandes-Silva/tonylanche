
export type ProductType = {
    uuid: string;
    name: string;
    price: number;
    category_name: string;
    category_uuid: string
}

export type HistoricProduct = ProductType & {
  quantity?: number;
};

export type CreateProduct = {
    name: string
    price: Number
    category_uuid: string
}

export type UpdateProduct = CreateProduct & {
    uuid: string
}
