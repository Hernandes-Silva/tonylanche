import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from '@expo/vector-icons';

import roundedCardWithShadow from '@/src/styles/roundedCardWithShadow';
import {ProductType} from "@/src/constants/types"

type ProductCardProps = {
    product: ProductType;
    onPressHandler: (product: ProductType) => void;
    icon: React.ReactNode;
};
export const ProductCard: React.FC<ProductCardProps> = ({ product, onPressHandler, icon }) => {
    return (
        <View style={styles.productContainer}>
            <View style={styles.textContainer}>
                <View></View>
                <Text style={styles.title}>{product.title}</Text>
                <Text style={styles.value}>R$ {product.value.toFixed(2)}</Text>
            </View>
            <TouchableOpacity onPress={() => onPressHandler(product)}>
                {icon}
            </TouchableOpacity>
        </View>
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