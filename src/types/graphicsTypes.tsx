

export type ResponseLineChartType = {
  label: string,
  numberProductsSales: Number,
  valueProductsSales: Number
}

export type ResponseBarChartType = {
  productName: string,
  numberProductsSales: Number,
  valueProductsSales: Number
}
export type ResponsePieChartType = {
  categoryName: string,
  numberProductsSales: Number,
  percentageProductsSales: Number,
}

export type ResponseGraphicsData = {
  lineChart: ResponseLineChartType[],
  barChart: ResponseBarChartType[],
  pieChart: ResponsePieChartType[],
}

export type ResponseGraphics = {
  data: ResponseGraphicsData
}


export type genericGraphicData = {
  label: string
}