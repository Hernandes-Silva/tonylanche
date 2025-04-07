import { PieChart } from "react-native-chart-kit";
import { ResponseLineChartType, ResponseBarChartType, ResponsePieChartType, ResponseGraphics, ResponseGraphicsData } from "../types/graphicsTypes";

const mockLineChartData: ResponseLineChartType[] = [
    {label: "Seg", numberProductsSales:25, valueProductsSales:311.5},
    {label: "Ter", numberProductsSales:24, valueProductsSales:150.5},
    {label: "Qua", numberProductsSales:3, valueProductsSales:100.5},
    {label: "Qui", numberProductsSales:5, valueProductsSales:120.5},
    {label: "Sex", numberProductsSales:20, valueProductsSales:130.5},
    {label: "Sab", numberProductsSales:10, valueProductsSales:160.5},
    {label: "Dom", numberProductsSales:10, valueProductsSales:140.5}
]

const mockBarChartData: ResponseBarChartType[] = [ 
    {productName: "X-Tudo", numberProductsSales:180, valueProductsSales:511.5},
    {productName: "X-salada", numberProductsSales:120, valueProductsSales:350.5},
    {productName: "X-frango", numberProductsSales:135, valueProductsSales:400.5},
    {productName: "Suco", numberProductsSales:100, valueProductsSales:120.5},
    {productName: "X-baicon", numberProductsSales:110, valueProductsSales:330.5},
    {productName: "Coca-cola", numberProductsSales:150, valueProductsSales:260.5},
    {productName: "Pizza", numberProductsSales:130, valueProductsSales:140.5}
]


const mockPieChartData: ResponsePieChartType[] = [ 
    {categoryName: "X-Tudo", numberProductsSales:180, valueProductsSales:511.5},
    {categoryName: "X-salada", numberProductsSales:120, valueProductsSales:350.5},
    {categoryName: "X-frango", numberProductsSales:135, valueProductsSales:400.5},
    {categoryName: "Suco", numberProductsSales:100, valueProductsSales:120.5},
    {categoryName: "X-baicon", numberProductsSales:110, valueProductsSales:330.5},
    {categoryName: "Coca-cola", numberProductsSales:150, valueProductsSales:260.5},
    {categoryName: "Pizza", numberProductsSales:130, valueProductsSales:140.5}
]


export const mockGraphicsResponse: ResponseGraphics = {
    data:{lineChart:mockLineChartData, barChart:mockBarChartData, pieChart:mockPieChartData}
}