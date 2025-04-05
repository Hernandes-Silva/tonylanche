import React, { useState, useMemo } from 'react'
import { FlatList, StyleSheet, Text, TouchableOpacity, View, TextInput, ScrollView, Pressable } from "react-native";
import { Ionicons } from '@expo/vector-icons';

import roundedCardWithShadow from '@/src/styles/roundedCardWithShadow';
import ContainerAuthenticated from "@/src/components/containerAuthenticated";
type ProductType = {
    uuid: string;
    title: string;
    value: number;
    category: string;
}
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

    const renderCategory = (category: string) => (
        <Pressable
            key={category}
            style={[
                styles.categoryCard,
                selectedCategory === category && styles.categoryCardSelected,
            ]}
            onPress={() => setSelectedCategory(category)}
        >
            <Text
                style={[
                    styles.categoryText,
                    selectedCategory === category && styles.categoryTextSelected,
                ]}
            >
                {category}
            </Text>
        </Pressable>
    );


    const handleAddPress = (product: ProductType) => {
        console.log("Adicionar:", product.title);
    };

    const renderProduct: ({ item }: { item: ProductType }) => JSX.Element = ({ item }) => (
        <View style={styles.productContainer}>
            <View style={styles.textContainer}>
                <View></View>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.value}>R$ {item.value.toFixed(2)}</Text>
            </View>
            <TouchableOpacity onPress={() => handleAddPress(item)}>
                <Ionicons name="add-circle-outline" size={50} color="blue" />
            </TouchableOpacity>
        </View>
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
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        style={styles.categoryContainer}
                    >
                        {categories.map(renderCategory)}
                    </ScrollView>
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

    // Category
    categoryContainer: {
        flexGrow: 0,
        paddingBottom: 5,
        paddingTop: 10,
    },
    categoryCard: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        backgroundColor: '#eee',
        marginRight: 8,
        ...roundedCardWithShadow
    },
    categoryCardSelected: {
        backgroundColor: '#007AFF',
    },
    categoryText: {
        color: '#333',
        fontWeight: '500',
    },
    categoryTextSelected: {
        color: '#fff',
    },

    // Product List
    listContainer: {
        flex: 1,
    },
    productContainer: {
        marginTop: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: '#fff',
        ...roundedCardWithShadow

    },
    textContainer: {
        flex: 1,
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        borderBottomColor: "silver"
    },
    value: {
        fontSize: 18,
        color: "#0077b6",
        fontWeight: "bold",
    },

});