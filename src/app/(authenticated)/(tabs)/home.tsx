import React, { useState, useMemo, useEffect, useCallback } from 'react'
import { FlatList, StyleSheet, Text, TouchableOpacity, View, TextInput, ScrollView, Pressable, ActivityIndicator } from "react-native";
import { Ionicons } from '@expo/vector-icons';

import roundedCardWithShadow from '@/src/styles/roundedCardWithShadow';
import ContainerAuthenticated from "@/src/components/containerAuthenticated";
import { ProductType } from "@/src/types/productType"
import { ProductCard } from '@/src/components/productCard';
import CategorySelect from '@/src/components/categorySelect';
import { ProductContainsValue } from '@/src/utils/utils';
import { getProducts } from '@/src/services/productsService';
import { getCategoriesNames } from '@/src/services/categoriesService';
import { CartTable } from '@/src/components/cartProduct';
import { CartProductMap } from '@/src/types/cartTypes';
import { CreateSaleType, CreateListSaleType } from '@/src/types/salesType';
import { createSale } from '@/src/services/salesService';
import { useFocusEffect } from '@react-navigation/native';


export default function Home() {
    const [products, setProducts] = useState<ProductType[]>([]);
    const [categories, setCategories] = useState<string[]>([]);
    const [isLoadingListProducts, setisLoadingListProducts] = useState(true);
    const [isLoadingListCategories, setIsLoadingListCategories] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState('Todos');
    const [search, setSearch] = useState('')
    const [cartProducts, setCartProducts] = useState<CartProductMap>({})

    useFocusEffect(
        useCallback(() => {
            getProducts().then(data => {
                console.log(data)
                setProducts(data);
                setisLoadingListProducts(false);
            });
            getCategoriesNames().then(data => {
                data.unshift("Todos")
                setCategories(data)
                setIsLoadingListCategories(false)
            })
        }, [])
    );


    const filteredProduct = useMemo(() => {
        return products.filter((product) => {
            const matchesCategory =
                selectedCategory === 'Todos' || product.category_name === selectedCategory;
            const matchesSearch = ProductContainsValue(product, search)
            return matchesCategory && matchesSearch
        })
    }, [selectedCategory, search, products])


    const handleAddPress = (product: ProductType) => {
        var uuid = product.uuid
        setCartProducts((prev) => {
            const existingItem = prev[uuid];

            // Se já existe, atualiza a quantidade
            if (existingItem) {
                return {
                    ...prev,
                    [uuid]: {
                        quantity: existingItem.quantity + 1,
                        title: product.name,
                        price: product.price
                    },
                };
            }

            // Se não existe, adiciona novo item
            return {
                ...prev,
                [uuid]: {
                    quantity: 1,
                    title: product.name,
                    price: product.price
                },
            };
        });
    };

    const handleSalesAddPress = async (sales: CartProductMap) => {
        const list_sale_items: CreateSaleType[] = Object.entries(cartProducts).map(([uuid, product]) => ({
            product_uuid: uuid,
            quantity: product.quantity,
        }));

        try {
            await createSale({ "list_sale_items": list_sale_items })
            setCartProducts({})
            alert("Adicionado com sucesso!")

        } catch (error) {
            alert("Erro ao adicionar " + error)
        }

    }

    const renderProduct: ({ item }: { item: ProductType }) => JSX.Element = ({ item }) => (
        <ProductCard
            product={item}
            onPressHandler={handleAddPress}
            icon={<Ionicons name="add-circle-outline" size={50} color="blue" />}
        />
    );




    return (
        <>
            <ContainerAuthenticated>
                <View style={styles.homeContainer}>
                    <View style={{ zIndex: 10 }}>
                        <View style={styles.searchContainer}>
                            <TextInput
                                placeholder="Buscar por título ou categoria"
                                style={styles.searchInput}
                                value={search}
                                onChangeText={setSearch}
                            />
                        </View>
                        {
                            isLoadingListCategories ? (<ActivityIndicator style={{ marginTop: 40 }} />) :
                                <CategorySelect
                                    categories={categories}
                                    actualSelectedCategory={selectedCategory}
                                    onPressHandler={setSelectedCategory}
                                />
                        }
                    </View>

                    <View style={styles.listContainer}>
                        {
                            isLoadingListProducts ? (<ActivityIndicator style={{ marginTop: 40 }} />) :
                                <FlatList
                                    data={filteredProduct}
                                    keyExtractor={(product) => product.uuid}
                                    showsVerticalScrollIndicator={false}
                                    style={{ overflow: 'visible' }}
                                    renderItem={renderProduct}
                                    contentContainerStyle={{ paddingBottom: 16 }}
                                />
                        }

                    </View>

                </View>
            </ContainerAuthenticated>
            {
                Object.keys(cartProducts).length ? (
                    <View style={styles.cartContainer}>
                        <CartTable cartProducts={cartProducts} onAddPress={handleSalesAddPress} />
                    </View>
                ) : null
            }
        </>
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

    cartContainer: {
        width: '100%',
        backgroundColor: 'white'
    }

});