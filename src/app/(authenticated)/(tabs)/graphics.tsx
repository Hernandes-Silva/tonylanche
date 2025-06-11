import React, { useEffect, useMemo, useState } from 'react';
import { ScrollView, Dimensions, Text, View, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { LineChart, BarChart, PieChart } from 'react-native-chart-kit';

import ContainerAuthenticated from '@/src/components/containerAuthenticated';
import FilterDropdown from '@/src/components/filterDropdown';
import { FilterType, FilterDisplayMap } from '@/src/types/filterTypes';
import DateInput from '@/src/components/dateInput';
import roundedCardWithShadow from '@/src/styles/roundedCardWithShadow';
import { getGraphics, getLineChart } from '@/src/services/graphicsService';
import { ChartData } from 'react-native-chart-kit/dist/HelperTypes';
import { ResponseBarChartType, ResponseGraphics, ResponseLineChartType, ResponsePieChartType } from '@/src/types/graphicsTypes';
import { generateUniqueColors } from '@/src/utils/utils';
import CategorySalesTable from '@/src/components/categorySalesTable';
import ProductsSalesTable from '@/src/components/productSalesTable';


const screenWidth = Dimensions.get('window').width - 32;

const chartConfig = {
  backgroundColor: '#fff',
  backgroundGradientFrom: '#f5f5f5',
  backgroundGradientTo: '#f5f5f5',
  decimalPlaces: 0,
  color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  style: {
    borderRadius: 16,
  },
  propsForDots: {
    r: '6',
    strokeWidth: '2',
    stroke: '#1e90ff',
  },
};
const defaultCharData = {
  labels: ['empty'],
  datasets: [{ data: [0] }]
}
export default function Graphics() {
  const [isLoading, setIsloading] = useState(true)
  const [lineChartData, setLineChartData] = useState<ChartData>(defaultCharData)
  const [lineChartByProductData, setLineChartByProductData] = useState<ChartData>(defaultCharData)
  const [barChartData, setBarChartData] = useState<ChartData>(defaultCharData)
  const [pieChartData, setPieChartData] = useState<any[]>([])
  const [pieChartResponse, setPieChartResponse] = useState<any[]>([])
  const [tableProductData, setTableProductData] = useState<any[]>([])
  const [selectedFilterDropdown, setSelectedFilterDropdwon] = useState<string>(FilterType.Day)
  const [finalDate, setfinalDate] = useState((new Date()))
  const [initialDate, setinitialDate] = useState(() => {
    const date = new Date();
    const days = 7
    date.setDate(date.getDate() - days);
    return date;
  });

  useEffect(() => {
    getLineChart(selectedFilterDropdown, initialDate, finalDate).then(data => {
      generateLineChartData(data);
    })
    setIsloading(false)
  }, [])

  const generateGraphicsData = () => {
    if (initialDate > finalDate) {
      console.log("aquiiii")
      alert("data inicial maior que data final")
      setIsloading(false)
      return
    }
    getLineChart(selectedFilterDropdown, initialDate, finalDate).then(data => {
      generateLineChartData(data);
      setIsloading(false)
    })
    // generateBarChartData(response.data.barChart);
    // generatePieChartData(response.data.pieChart);
    // setPieChartResponse(response.data.pieChart)
    // setTableProductData(response.data.barChart)
  }

  const generateLineChartData = (data: ResponseLineChartType[]) => {
    var labelsLineChart: string[] = []
    var dataSetLineChart: number[] = []
    var dataSetLineByProduct: number[] = []
    data.forEach((item) => {
      labelsLineChart.push(item.label)
      dataSetLineChart.push(item.numberProductsSales.valueOf())
      dataSetLineByProduct.push(item.valueProductsSales.valueOf())
    })
    const datasets = { data: dataSetLineChart }
    const datasetsByProducts = { data: dataSetLineByProduct }
    setLineChartData({ labels: labelsLineChart, datasets: [datasets] })
    setLineChartByProductData({ labels: labelsLineChart, datasets: [datasetsByProducts] })
  }

  const generateBarChartData = (data: ResponseBarChartType[]) => {
    var labelsBarChart: string[] = []
    var dataSetBarChart: number[] = []
    data.forEach((item) => {
      labelsBarChart.push(item.productName)
      dataSetBarChart.push(item.numberProductsSales.valueOf())
    })
    const datasets = { data: dataSetBarChart.slice(0, 5) }

    setBarChartData({ labels: labelsBarChart.slice(0, 5), datasets: [datasets] })
  }

  const generatePieChartData = (data: ResponsePieChartType[]) => {
    var list_categories_data: any[] = []
    var colors: string[] = generateUniqueColors(data.length)
    data.forEach((item, index) => {
      list_categories_data.push({
        name: item.categoryName,
        population: item.percentageProductsSales,
        color: colors[index],
        legendFontColor: '#000',
        legendFontSize: 12,
      })
    })

    setPieChartData(list_categories_data)
  }

  const filterGraphics = async () => {
    if (isLoading == false) {
      setIsloading(true)
      generateGraphicsData()

    }
  }

  const getLineChartWidth = (numPoints: number): number => {
    const baseWidth = screenWidth
    const basePoints = 10

    if (numPoints <= basePoints) {
      return baseWidth
    }

    const extraPoints = numPoints - basePoints
    const widthPerExtraPoint = 40

    return baseWidth + extraPoints * widthPerExtraPoint
  }

  return (
    <ContainerAuthenticated>
      <ScrollView style={{ flex: 1, padding: 10 }}>
        <View>
          <FilterDropdown
            selectedValue={selectedFilterDropdown}
            onChange={setSelectedFilterDropdwon}
            label={FilterDisplayMap[selectedFilterDropdown]}
          />
          <View style={{ alignItems: "center", marginTop: 4 }}>
            <DateInput
              label="Data da inicial:"
              value={initialDate}
              onChange={setinitialDate}
            />
            <DateInput
              label="Data da final:"
              value={finalDate}
              onChange={setfinalDate}
            />
            <TouchableOpacity style={[styles.filterButton, isLoading && { backgroundColor: "silver" }]} onPress={filterGraphics} disabled={isLoading}>
              <Text style={styles.filterButtonText}>
                Aperte aqui para Filtrar
              </Text>
            </TouchableOpacity>
          </View>

        </View>
        {isLoading ? (<ActivityIndicator style={{ marginTop: 40 }} />) :
          <View style={styles.graphicsContainer}>
            <Text style={styles.graphicsTitle}>📈 Vendas totais</Text>
            <View
            >
              <Text style={styles.graphicsDescription}>Numero Produtos vendidos</Text>
              <ScrollView horizontal style={{ overflow: 'visible' }}>
                <LineChart
                  data={lineChartData}
                  width={getLineChartWidth(lineChartData.labels.length)}
                  height={220}
                  fromZero
                  chartConfig={chartConfig}
                  bezier
                  style={styles.graphicsStyles}
                  renderDotContent={({ x, y, index, indexData }) => (
                    <View
                      key={index}
                      style={{
                        position: 'absolute',
                        top: y - 30,
                        left: x - 10,
                        backgroundColor: '#1e90ff',
                        paddingHorizontal: 6,
                        paddingVertical: 2,
                        borderRadius: 6,
                        zIndex: 999,
                      }}
                    >
                      <Text style={styles.tooltipText}>{indexData}</Text>
                    </View>
                  )}

                />
              </ScrollView>
            </View>

            <View
            >

              <Text style={styles.graphicsDescription}>Valor Total Produtos Vendidos</Text>
              <ScrollView horizontal style={{ overflow: 'visible' }}>
                <LineChart
                  data={lineChartByProductData}
                  width={getLineChartWidth(lineChartData.labels.length)}
                  height={220}
                  yAxisLabel="$"
                  fromZero
                  chartConfig={chartConfig}
                  bezier
                  style={styles.graphicsStyles}
                  renderDotContent={({ x, y, index, indexData }) => (
                    <View
                      key={index}
                      style={{
                        position: 'absolute',
                        top: y - 30,
                        left: x - 20,
                        backgroundColor: '#1e90ff',
                        paddingHorizontal: 6,
                        paddingVertical: 2,
                        borderRadius: 6,
                        zIndex: 999,
                      }}
                    >
                      <Text style={styles.tooltipText}>{indexData}</Text>
                    </View>
                  )}
                />
              </ScrollView>
            </View>


            <Text style={styles.graphicsTitle}>📊 5 Produtos mais vendido</Text>
            <BarChart
              data={barChartData}
              yAxisSuffix=""
              yAxisLabel=""
              width={screenWidth}
              fromZero={true}
              height={220}
              chartConfig={chartConfig}
              style={styles.graphicsStyles}
            />


            <Text style={styles.graphicsTitle}>🔵 Categorias Vendidos</Text>
            <PieChart
              data={pieChartData}
              width={screenWidth}
              height={220}
              chartConfig={chartConfig}
              accessor="population"
              backgroundColor="transparent"
              paddingLeft="15"
              style={styles.graphicsStyles}
            />

            <CategorySalesTable data={pieChartResponse} />
            <Text style={styles.graphicsTitle}>🔵 Tabela de produtos</Text>
            <ProductsSalesTable data={tableProductData} />

          </View>
        }
      </ScrollView>
    </ContainerAuthenticated>
  );
}


const styles = StyleSheet.create({
  filterButton: {
    backgroundColor: "#33ddff",
    ...roundedCardWithShadow,
    padding: 12,
    borderRadius: 8,
  },
  filterButtonText: {
    fontSize: 20,
  },
  graphicsContainer: {
    marginTop: 20
  },
  graphicsTitle: {
    fontSize: 20, fontWeight: 'bold', marginBottom: 12
  },
  graphicsDescription: {
    marginLeft: 16,
    marginBottom: 20,
  },
  graphicsStyles: {
    marginBottom: 24,
    borderRadius: 16
  },
  tooltip: {
    position: 'absolute',
    backgroundColor: '#1e90ff',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    zIndex: 999,
  },
  tooltipText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
});
