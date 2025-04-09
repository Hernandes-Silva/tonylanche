import { ProductType } from "../types/productType";



export const ProductContainsValue = (product: ProductType, value: string) => {
    return (
        product.title.toLowerCase().includes(value.toLowerCase())
        || product.category.toLowerCase().includes(value.toLowerCase())
    );
}


export const generateUniqueColors = (count: number) => {
    const colors = new Set<string>();
  
    while (colors.size < count) {
      const color = `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`;
      colors.add(color);
    }
  
    return Array.from(colors);
  }