
export type ProductType = {
    uuid: string;
    name: string;
    price: number;
    category_name: string;
    category_uuid: string;
}

export type HistoricProduct = ProductType & {
  quantity?: number;
};

export type CreateProductType = {
    name: string
    price: Number
    category_uuid: string
}

export type UpdateProductType = CreateProductType & {
    uuid: string
}
