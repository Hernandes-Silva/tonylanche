import { mockGraphicsResponse } from '@/src/mocks/graphics';
import { ResponseGraphics, ResponseLineChartType } from '@/src//types/graphicsTypes';
import api from './api';
import { format_date } from '../utils/utils';

export async function getGraphics(filterType: string, initDate: Date , endDate: Date): Promise<ResponseGraphics> {
    //   const response = await api.get('/products');
    return mockGraphicsResponse;
}
export async function getLineChart(filterType: string, initDate: Date , endDate: Date): Promise<ResponseLineChartType[]> {
    console.log({
        start_date: format_date(initDate).slice(0, 10)+"T00:00:00.000Z",
        end_date: format_date(endDate).slice(0, 10)+"T00:00:00.000Z",
        filter_type: filterType
    })
    
    const response = await api.post('/sales/chart/line',{
        start_date: format_date(initDate).slice(0, 10)+"T00:00:00.000Z",
        end_date: format_date(endDate).slice(0, 10)+"T00:00:00.000Z",
        filter_type: filterType
    })
    console.log(response.data)
    return response.data;
}