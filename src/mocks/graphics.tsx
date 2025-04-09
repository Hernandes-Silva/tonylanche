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
    {categoryName: "X-Tudo", percentageProductsSales:40, numberProductsSales:40},
    {categoryName: "X-salada", percentageProductsSales:10, numberProductsSales:10},
    {categoryName: "X-frango", percentageProductsSales:5, numberProductsSales:5},
    {categoryName: "Suco", percentageProductsSales:20, numberProductsSales:20},
    {categoryName: "X-baicon", percentageProductsSales:5, numberProductsSales:5},
    {categoryName: "Coca-cola", percentageProductsSales:10, numberProductsSales:10},
    {categoryName: "Pizza", percentageProductsSales:10,numberProductsSales:10}
]


export const mockGraphicsResponse: ResponseGraphics = {
    data:{lineChart:mockLineChartData, barChart:mockBarChartData, pieChart:mockPieChartData}
}