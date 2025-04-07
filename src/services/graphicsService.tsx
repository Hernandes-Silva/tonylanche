import { mockGraphicsResponse } from '@/src/mocks/graphics';
import { ResponseGraphics } from '@/src//types/graphicsTypes';

export async function getGraphics(filterType: string, initDate: Date , endDate: Date): Promise<ResponseGraphics> {
    //   const response = await api.get('/products');
    return mockGraphicsResponse;
}