
export enum FilterType {
    Day = 'day',
    Month = 'month',
    Year = 'year',
}

  
export const FilterDisplayMap: Record<string, string> = {
    [FilterType.Day]: '📆 Por Dia',
    [FilterType.Month]: '📆 Por Mês',
    [FilterType.Year]: '📈 Por Ano'
};

export const filterDisplayList = Object.entries(FilterDisplayMap) as [FilterType, string][];