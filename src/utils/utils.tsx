import { ProductType } from "../types/productType";
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';


export const ProductContainsValue = (product: ProductType, value: string) => {
    return (
        product.name.toLowerCase().includes(value.toLowerCase())
        || product.category_name.toLowerCase().includes(value.toLowerCase())
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

export const format_date = (date: Date) => {
  return format(date, 'yyyy-MM-dd HH:mm:ssXXX', { locale: ptBR })
}