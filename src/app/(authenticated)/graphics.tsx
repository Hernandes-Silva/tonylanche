import ContainerAuthenticated from '@/src/components/containerAuthenticated';
import React, { useState } from 'react';
import { ScrollView, Dimensions, Text, View, StyleSheet } from 'react-native';
import { LineChart, BarChart, PieChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width-32;

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

export default function ReportsScreen() {
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0, value: 0, visible: false });
  return (
    <ContainerAuthenticated>
      <ScrollView style={{ flex:1, padding:10 }}>
        <Text style={styles.graphicsTitle}>📈 Vendas por Dia</Text>

        <Text style={styles.graphicsDescription}>Numero Produtos vendidos</Text>
        <LineChart
          data={{
            labels: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex'],
            datasets: [{ data: [120, 180, 100, 200, 150] }],
          }}
          width={screenWidth}
          height={220}
          fromZero
          chartConfig={chartConfig}
          onDataPointClick={({ value, x, y }) => {
            setTooltipPos({ x, y, value, visible: true });
            setTimeout(() => setTooltipPos({ ...tooltipPos, visible: false }), 5000);
          }}
          bezier
          style={styles.graphicsStyles}
        />
      
        <Text style={styles.graphicsDescription}>Valor Total Produtos Vendidos</Text>
        <LineChart
          data={{
            labels: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex'],
            datasets: [{ data: [120, 180, 100, 200, 150] }],
          }}
          width={screenWidth}
          height={220}
          yAxisLabel="$"
          fromZero
          chartConfig={chartConfig}
          onDataPointClick={({ value, x, y }) => {
            setTooltipPos({ x, y, value, visible: true });
            setTimeout(() => setTooltipPos({ ...tooltipPos, visible: false }), 5000);
          }}
          bezier
          style={styles.graphicsStyles}
        />

        {tooltipPos.visible && (
          <View style={[styles.tooltip, { top: tooltipPos.y - 15, left: tooltipPos.x - 20 }]}>
            <Text style={styles.tooltipText}>{tooltipPos.value}</Text>
          </View>
        )}


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

      </ScrollView>
    </ContainerAuthenticated>
  );
}


const styles = StyleSheet.create({
  graphicsTitle:{
    fontSize: 20, fontWeight: 'bold', marginBottom: 12
  },
  graphicsDescription:{
    marginLeft:16,
    marginBottom:2,
  },
  graphicsStyles:{
    marginBottom: 24,
    borderRadius: 16 
  },
  tooltip: {
    position: 'absolute',
    backgroundColor: '#1e90ff',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  tooltipText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
});
