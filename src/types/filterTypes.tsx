
export enum FilterType {
    Day = 'day',
    Week = 'week',
    Month = 'month',
    Year = 'year',
}

  
export const FilterDisplayMap: Record<string, string> = {
    [FilterType.Day]: '📆 Por Dia',
    [FilterType.Week]: '📆 Por Semana',
    [FilterType.Month]: '📆 Por Mês',
    [FilterType.Year]: '📈 Por Ano'
};

export const filterDisplayList = Object.entries(FilterDisplayMap) as [FilterType, string][];