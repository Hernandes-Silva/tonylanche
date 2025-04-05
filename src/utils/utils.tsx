import { ProductType } from "../types/productType";



export const ProductContainsValue = (product: ProductType, value: string) => {
    return (
        product.title.toLowerCase().includes(value.toLowerCase())
        || product.category.toLowerCase().includes(value.toLowerCase())
    );
}