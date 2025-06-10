import React, { useState, useMemo, useEffect, useCallback } from 'react'
import { useFocusEffect } from '@react-navigation/native';
import { FlatList, StyleSheet, Text, TouchableOpacity, View, TextInput, ScrollView, Pressable, Platform, ActivityIndicator } from "react-native";
import { Ionicons } from '@expo/vector-icons';



import roundedCardWithShadow from '@/src/styles/roundedCardWithShadow';
import ContainerAuthenticated from "@/src/components/containerAuthenticated";
import { HistoricProduct, ProductType } from "@/src/types/productType"
import { ProductCard } from '@/src/components/productCard';
import CategorySelect from '@/src/components/categorySelect';
import { ProductContainsValue } from '@/src/utils/utils';
import DateInput from '@/src/components/dateInput'
import { getCategories, getCategoriesNames } from '@/src/services/categoriesService';
import { getSalesByDate, removeProductFromHistoric } from '@/src/services/salesService';


export default function Historic() {
    const [products, setProducts] = useState<HistoricProduct[]>([]);
    const [categories, setCategories] = useState<string[]>([]);
    const [isLoadingListProducts, setisLoadingListProducts] = useState(true);
    const [isLoadingListCategories, setIsLoadingListCategories] = useState(true);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedCategory, setSelectedCategory] = useState('Todos');
    const [search, setSearch] = useState('')

    useFocusEffect(
        useCallback(() => {
            console.log(selectedDate)
            getSalesByDate(selectedDate).then(data => {
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

    useEffect(() => {
        console.log(selectedDate)
        setProducts([])
        setisLoadingListProducts(true);

        getSalesByDate(selectedDate).then(data => {
            setProducts(data);
            setisLoadingListProducts(false);
        });
    }, [selectedDate])

    const filteredProduct = useMemo(() => {
        return products.filter((product) => {
            const matchesCategory =
                selectedCategory === 'Todos' || product.category_name === selectedCategory;
            const matchesSearch = ProductContainsValue(product, search)
            return matchesCategory && matchesSearch
        })
    }, [selectedCategory, search, products])


    const productsArray = Object.entries(filteredProduct); // [ [uuid, { title, quantity, price }], ... ]

    const total = productsArray.reduce((sum, [, product]) => {
        var quantiy = product.quantity ? product.quantity : 0
        return sum + product.price * quantiy;
    }, 0);

    const handleAddPress = async (product: HistoricProduct) => {
        console.log("remove:", product.name);
        try {
            await removeProductFromHistoric(product.uuid)
            if (product.quantity) product.quantity -= 1

            const productUpdated = product
            if (productUpdated.quantity && productUpdated.quantity > 0) {
                setProducts((prev) =>
                    prev.map((item) =>
                        item.uuid === productUpdated.uuid ? productUpdated : item
                    ));
            } else {
                setProducts((prev) =>
                    prev.filter((item) => item.uuid !== productUpdated.uuid)
                );
            }
            alert("Removido com sucesso !")

        } catch (error) {
            alert("Erro ao remover " + error)
        }
    };

    const renderProduct: ({ item }: { item: HistoricProduct }) => JSX.Element = ({ item }) => (
        <ProductCard
            product={item}
            onPressHandler={handleAddPress}
            icon={<Ionicons name="remove-circle-outline" size={50} color="red" />}
        />
    );


    return (
        <>
            <ContainerAuthenticated>
                <View style={styles.homeContainer}>
                    <View style={{ alignItems: "center" }}>
                        <Text style={styles.title}>Historico de vendas</Text>
                        <DateInput
                            label="Data das vendas"
                            value={selectedDate}
                            onChange={setSelectedDate}
                        />
                    </View>


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
            <View style={{ backgroundColor: "white" }}>
                <Text style={styles.totalText}>
                    Total: R$ {total.toFixed(2)}
                </Text>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    homeContainer: {
        margin: 5,
        flex: 1,
    },
    title: {
        fontSize: 25,
        fontWeight: "bold",
        marginBottom: 5
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

    totalText: {
        fontSize: 16,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 10,
        marginTop: 10,
    },

});