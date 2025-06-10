import React, { useState, useMemo } from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity, StyleSheet, useColorScheme } from 'react-native';
import roundedCardWithShadow from '@/src//styles/roundedCardWithShadow';
import { ResponseBarChartType } from '../types/graphicsTypes';



type SortKey = keyof ResponseBarChartType;

type Props = {
  data: ResponseBarChartType[];
};

const ITEMS_PER_PAGE = 5;

const ProductsSalesTable: React.FC<Props> = ({ data }) => {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'light';

  const [search, setSearch] = useState('');
  const [sortKey, setSortKey] = useState<SortKey>('productName');
  const [sortAsc, setSortAsc] = useState(true);
  const [page, setPage] = useState(0);

  const filteredData = useMemo(() => {
    return data.filter(item =>
      item.productName.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  const sortedData = useMemo(() => {
    return [...filteredData].sort((a, b) => {
      const aVal = a[sortKey];
      const bVal = b[sortKey];
      if (typeof aVal === 'number' && typeof bVal === 'number') {
        return sortAsc ? aVal - bVal : bVal - aVal;
      } else {
        return sortAsc
          ? String(aVal).localeCompare(String(bVal))
          : String(bVal).localeCompare(String(aVal));
      }
    });
  }, [filteredData, sortKey, sortAsc]);

  const paginatedData = sortedData.slice(
    page * ITEMS_PER_PAGE,
    (page + 1) * ITEMS_PER_PAGE
  );

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortAsc(!sortAsc);
    } else {
      setSortKey(key);
      setSortAsc(true);
    }
  };

  const themeStyle = isDarkMode ? styles.dark : styles.light;

  return (
    <ScrollView style={[styles.container, themeStyle]}>
      <TextInput
        placeholder="Pesquisar produto..."
        placeholderTextColor={isDarkMode ? '#aaa' : '#555'}
        value={search}
        onChangeText={(text) => {
          setSearch(text);
          setPage(0);
        }}
        style={[styles.searchInput, themeStyle]}
      />

      <View style={styles.table}>
        <View style={styles.headerRow}>
          <TouchableOpacity style={styles.cell} onPress={() => handleSort('productName')}>
            <Text style={themeStyle}>Produto</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cell} onPress={() => handleSort('numberProductsSales')}>
            <Text style={themeStyle}>Qtde Vendida</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cell} onPress={() => handleSort('percentageProductsSales')}>
            <Text style={themeStyle}>% Vendas</Text>
          </TouchableOpacity>
        </View>

        {paginatedData.map((item, index) => (
          <View key={index} style={styles.dataRow}>
            <Text style={[styles.cell, themeStyle]}>{item.productName}</Text>
            <Text style={[styles.cell, themeStyle]}>{item.numberProductsSales.toString()}</Text>
            <Text style={[styles.cell, themeStyle]}>{item.percentageProductsSales.toFixed(1)}%</Text>
          </View>
        ))}
      </View>

      <View style={styles.pagination}>
        <TouchableOpacity disabled={page === 0} onPress={() => setPage(p => p - 1)}>
          <Text style={[styles.pageButton, { opacity: page === 0 ? 0.5 : 1 }]}>⬅️</Text>
        </TouchableOpacity>
        <Text style={themeStyle}>Página {page + 1}</Text>
        <TouchableOpacity
          disabled={(page + 1) * ITEMS_PER_PAGE >= sortedData.length}
          onPress={() => setPage(p => p + 1)}
        >
          <Text style={[styles.pageButton, { opacity: (page + 1) * ITEMS_PER_PAGE >= sortedData.length ? 0.5 : 1 }]}>➡️</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}


export default ProductsSalesTable;

const styles = StyleSheet.create({
  container: {
    marginBottom:20,
    ...roundedCardWithShadow
  },
  light: {
    backgroundColor: '#fff',
    color: '#000',
  },
  dark: {
    backgroundColor: '#111',
    color: '#fff',
  },
  searchInput: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 8,
    marginBottom: 16,
  },
  table: {
    borderWidth: 1,
    borderRadius: 8,
    overflow: 'hidden',
  },
  headerRow: {
    flexDirection: 'row',
    backgroundColor: '#007aff22',
  },
  dataRow: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  cell: {
    flex: 1,
    padding: 8,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
  },
  pageButton: {
    fontSize: 24,
    paddingHorizontal: 12,
  },
});