

export type CreateSaleType = {
    product_uuid: string,
    quantity: Number
}

export type CreateListSaleType = {
    list_sale_items: CreateSaleType[]
}