import { mockGraphicsResponse } from '@/src/mocks/graphics';
import { ResponseBarChartType, ResponseGraphics, ResponseLineChartType } from '@/src//types/graphicsTypes';
import api from './api';
import { format_date } from '../utils/utils';

export async function getGraphics(filterType: string, initDate: Date , endDate: Date): Promise<ResponseGraphics> {
    //   const response = await api.get('/products');
    return mockGraphicsResponse;
}
export async function getLineChart(filterType: string, initDate: Date , endDate: Date): Promise<ResponseLineChartType[]> {    
    const response = await api.post('/sales/chart/line',{
        start_date: format_date(initDate).slice(0, 10)+"T00:00:00.000Z",
        end_date: format_date(endDate).slice(0, 10)+"T00:00:00.000Z",
        filter_type: filterType
    })

    return response.data;
}


export async function getBarChart( initDate: Date , endDate: Date): Promise<ResponseBarChartType[]> {    
    const response = await api.post('/sales/chart/bar',{
        start_date: format_date(initDate).slice(0, 10)+"T00:00:00.000Z",
        end_date: format_date(endDate).slice(0, 10)+"T00:00:00.000Z",
    })

    return response.data;
}


