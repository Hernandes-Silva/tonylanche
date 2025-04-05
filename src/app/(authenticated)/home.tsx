import React, { useState, useMemo } from 'react'
import { FlatList, StyleSheet, Text, TouchableOpacity, View, TextInput, ScrollView, Pressable } from "react-native";
import { Ionicons } from '@expo/vector-icons';

import roundedCardWithShadow from '@/src/styles/roundedCardWithShadow';
import ContainerAuthenticated from "@/src/components/containerAuthenticated";
import {ProductType} from "@/src/constants/types"
import { ProductCard } from '@/src/components/productCard';
import CategorySelect from '@/src/components/categorySelect';

const productsData: ProductType[] = [
    { uuid: '1', title: 'Coca-Cola', value: 5, category: 'Bebidas' },
    { uuid: '2', title: 'Café', value: 3, category: 'Bebidas' },
    { uuid: '3', title: 'X-Tudo', value: 15.5, category: 'Lanches' },
    { uuid: '4', title: 'Pastel', value: 8, category: 'Lanches' },
    { uuid: '5', title: 'Suco Natural', value: 6, category: 'Bebidas' },
    { uuid: '6', title: 'Batata Frita', value: 10, category: 'Acompanhamentos' },
    { uuid: '7', title: 'Pastel', value: 8, category: 'Lanches' },
    { uuid: '8', title: 'Suco Natural', value: 6, category: 'Bebidas' },
    { uuid: '9', title: 'Batata Frita', value: 10, category: 'Acompanhamentos' },
];
const categories = ['Todos', 'Bebidas', 'Lanches', 'Acompanhamentos'];

export default function Home() {
    const [selectedCategory, setSelectedCategory] = useState('Todos');
    const [search, setSearch] = useState('')

    const ProductContainsValue = (product: ProductType, value: string) => {
        return (
            product.title.toLowerCase().includes(value.toLowerCase())
            || product.category.toLowerCase().includes(value.toLowerCase())
        );
    }
    const filteredProduct = useMemo(() => {
        return productsData.filter((product) => {
            const matchesCategory =
                selectedCategory === 'Todos' || product.category === selectedCategory;
            const matchesSearch = ProductContainsValue(product, search)
            return matchesCategory && matchesSearch
        })
    }, [selectedCategory, search])


    const handleAddPress = (product: ProductType) => {
        console.log("Adicionar:", product.title);
    };

    const renderProduct: ({ item }: { item: ProductType }) => JSX.Element = ({ item }) => (
        <ProductCard 
            product={item}
            onPressHandler={handleAddPress} 
            icon={<Ionicons name="add-circle-outline" size={50} color="blue" />}
        />
    );


    return (
        <ContainerAuthenticated>
            <View style={styles.homeContainer}>
                <View style={{zIndex:10}}>
                    <View style={styles.searchContainer}>
                        <TextInput
                            placeholder="Buscar por título ou categoria"
                            style={styles.searchInput}
                            value={search}
                            onChangeText={setSearch}
                        />
                    </View>
                    <CategorySelect 
                        categories={categories} 
                        actualSelectedCategory={selectedCategory}
                        onPressHandler={setSelectedCategory}
                    />
                </View>

                <View style={styles.listContainer}>
                    <FlatList
                        data={filteredProduct}
                        keyExtractor={(product) => product.uuid}
                        showsVerticalScrollIndicator={false}
                        style={{ overflow: 'visible' }}
                        renderItem={renderProduct}
                        contentContainerStyle={{ paddingBottom: 16 }}
                    />

                </View>
            </View>
        </ContainerAuthenticated>
    )
}

const styles = StyleSheet.create({
    homeContainer: {
        margin: 5,
        flex: 1,
    },

    // Search
    searchContainer: {
        backgroundColor: '#fff',
        ...roundedCardWithShadow,
        padding: 0!,
    },
    searchInput: {
        backgroundColor: '#fff',
        ...roundedCardWithShadow
    },


    // Product List
    listContainer: {
        flex: 1,
    },

});