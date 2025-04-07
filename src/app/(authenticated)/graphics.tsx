import React, { useEffect, useMemo, useState } from 'react';
import { ScrollView, Dimensions, Text, View, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { LineChart, BarChart, PieChart } from 'react-native-chart-kit';

import ContainerAuthenticated from '@/src/components/containerAuthenticated';
import FilterDropdown from '@/src/components/filterDropdown';
import { FilterType, FilterDisplayMap } from '@/src/types/filterTypes';
import DateInput from '@/src/components/dateInput';
import roundedCardWithShadow from '@/src/styles/roundedCardWithShadow';
import { getGraphics } from '@/src/services/graphicsService';
import { ChartData } from 'react-native-chart-kit/dist/HelperTypes';
import { ResponseGraphics, ResponseLineChartType } from '@/src/types/graphicsTypes';


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
  const [barChartData, setbarChartData] = useState<ChartData>()
  const [pieChartData, setPieChartData] = useState<any>([])
  const [selectedFilterDropdown, setSelectedFilterDropdwon] = useState<string>(FilterType.Day)
  const [tooltip1, setTooltip1] = useState({ x: 0, y: 0, value: 0, visible: false });
  const [tooltip2, setTooltip2] = useState({ x: 0, y: 0, value: 0, visible: false });
  const [chart1Layout, setChart1Layout] = useState({ x: 0, y: 0 });
  const [chart2Layout, setChart2Layout] = useState({ x: 0, y: 0 });
  const [finalDate, setfinalDate] = useState((new Date()))
  const [initialDate, setinitialDate] = useState(() => {
    const date = new Date();
    const days = 7
    date.setDate(date.getDate() - days);
    return date;
  });

  useEffect(() => {
    getGraphics(selectedFilterDropdown, initialDate, finalDate).then(response => {
      generateGraphicsData(response)
      setIsloading(false)
    })
  }, [])

  const generateGraphicsData = (response: ResponseGraphics) => {
    generateLineChartData(response.data.lineChart)
  }

  const generateLineChartData = (data: ResponseLineChartType[]) => {
    var labelsLineChart: string[] = []
    var dataSetLineChart: number[] = []
    var dataSetLineByProduct: number[]= []
    data.forEach((item) => {
      labelsLineChart.push(item.label)
      dataSetLineChart.push(item.numberProductsSales.valueOf())
      dataSetLineByProduct.push(item.valueProductsSales.valueOf())
    })
    const datasets = { data: dataSetLineChart }
    const datasetsByProducts = { data: dataSetLineByProduct }
    setLineChartData({ labels: labelsLineChart, datasets: [datasets] })
    setLineChartByProductData({ labels: labelsLineChart, datasets: [datasets] })
  }


  const Tooltip = ({ x, y, value, visible }: any) => {
    if (!visible) return null;
    return (
      <View style={[styles.tooltip, { left: x - 30, top: y - 40 }]}>
        <Text style={styles.tooltipText}>{value}</Text>
      </View>
    );
  };
  const filterGraphics = () => {
    if (isLoading == false) {
      setIsloading(true)
      getGraphics(selectedFilterDropdown, initialDate, finalDate).then(data => {
        setIsloading(false)
      })

    }
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
              onLayout={(event) => {
                const { x, y } = event.nativeEvent.layout;
                setChart1Layout({ x, y });
              }}
            >
              <Text style={styles.graphicsDescription}>Numero Produtos vendidos</Text>
              <LineChart
                data={lineChartData}
                width={screenWidth}
                height={220}
                fromZero
                chartConfig={chartConfig}
                onDataPointClick={({ value, x, y, index }) => {
                  setTooltip1({
                    x: x + chart1Layout.x + 10,
                    y: y + chart1Layout.y + 20,
                    value,
                    visible: true,
                  });
                  setTimeout(() => setTooltip1({ ...tooltip1, visible: false }), 5000);
                }}
                bezier
                style={styles.graphicsStyles}
              />

            </View>
            <Tooltip {...tooltip1} />


            <View
              onLayout={(event) => {
                const { x, y } = event.nativeEvent.layout;
                setChart2Layout({ x, y });
              }}
            >
              <Text style={styles.graphicsDescription}>Valor Total Produtos Vendidos</Text>
              <LineChart
                data={{
                  labels: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Seg'],
                  datasets: [{ data: [120, 180, 100, 200, 150, 120, 180, 100, 200, 150, 150, 120] }],
                }}
                width={screenWidth}
                height={220}
                yAxisLabel="$"
                fromZero
                chartConfig={chartConfig}
                onDataPointClick={({ value, x, y, index }) => {
                  setTooltip2({
                    x: x + chart2Layout.x + 10,
                    y: y + chart2Layout.y + 20,
                    value,
                    visible: true,
                  });
                  setTimeout(() => setTooltip2({ ...tooltip2, visible: false }), 5000);
                }}
                bezier
                style={styles.graphicsStyles}
              />
            </View>
            <Tooltip {...tooltip2} />




            <Text style={styles.graphicsTitle}>📊 Vendas por Produto</Text>
            <BarChart
              data={{
                labels: ['Café', 'Pão', 'Suco'],
                datasets: [{ data: [90, 70, 40] }],
              }}
              yAxisSuffix=""
              yAxisLabel=""
              width={screenWidth}
              fromZero={true}
              height={220}
              chartConfig={chartConfig}
              style={styles.graphicsStyles}
            />


            <Text style={styles.graphicsTitle}>🔵 Categorias Vendidas</Text>
            <PieChart
              data={[
                {
                  name: 'Bebidas',
                  population: 40,
                  color: '#f00',
                  legendFontColor: '#000',
                  legendFontSize: 12,
                },
                {
                  name: 'Lanches',
                  population: 60,
                  color: '#0f0',
                  legendFontColor: '#000',
                  legendFontSize: 12,
                },
              ]}
              width={screenWidth}
              height={220}
              chartConfig={chartConfig}
              accessor="population"
              backgroundColor="transparent"
              paddingLeft="15"
              style={styles.graphicsStyles}
            />
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
    marginBottom: 2,
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
