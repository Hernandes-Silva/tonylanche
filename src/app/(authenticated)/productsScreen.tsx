import React, { use, useEffect, useState } from 'react';
import DropDownPicker from 'react-native-dropdown-picker';

import {
    View,
    Text,
    FlatList,
    Modal,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    SafeAreaView,
} from 'react-native';
import styles from '@/src/styles/tableDefaultStyle';
import { getCategories } from '@/src/services/categoriesService';
import { Ionicons } from '@expo/vector-icons';
import { createProduct, getProducts, updateProduct } from '@/src/services/productsService';
import { CreateProductType, ProductType } from "@/src/types/productType"


type CategoryDropdown = {
    label: string
    value: string
}



export default function ProductScreen() {
    const [products, setProducts] = useState<ProductType[]>([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [price, setPrice] = useState('');
    const [open, setOpen] = useState(false);
    const [categories, setCategories] = useState<CategoryDropdown[]>([]);
    const [isUpdate, setIsUpdate] = useState(false)
    const [updateId, setUpdateId] = useState('')


    useEffect(() => {
        getCategories().then(data => {
            const categoriasConvertidas = data.map(cat => ({
                label: cat.name,
                value: cat.uuid,
            }));
            setCategories(categoriasConvertidas)
        })
        getProducts().then(data =>{
            setProducts(data)
        })
    }, [])

    const handleSave = async () => {
        if (!name || !category || !price) return;

        if(isUpdate){
            return await editProduct()
        }

        return await addProduct()
    }

    const handleEdit = async (product: ProductType) => {
        setIsUpdate(true)
        setName(product.name)
        setUpdateId(product.uuid)
        setPrice(product.price.toString())
        setCategory(product.category_uuid)
        setModalVisible(true)
    }

    const addProduct = async () => {
        const newProduct: CreateProductType = {
            name:name,
            price: parseFloat(price),
            category_uuid:category,
        };

        const response = await createProduct(newProduct)
        setProducts((prev) => [...prev, response]);
        setName('');
        setCategory('');
        setPrice('');
        setModalVisible(false);
    };

    const editProduct = async () => {
        const newProduct: CreateProductType = {
            name:name,
            price: parseFloat(price),
            category_uuid:category,
        };

        const updatedProduct = await updateProduct(newProduct, updateId)
        setProducts((prev) =>
            prev.map((product) =>
                product.uuid === updateId ? updatedProduct : product
        ));

        setIsUpdate(false)
        setName('')
        setUpdateId('')
        setPrice('')
        setCategory('')
        setModalVisible(false)
    }
    const renderItem = ({ item }: { item: ProductType }) => (
        <View style={styles.row}>
            <Text style={styles.cell}>{item.name}</Text>
            <Text style={styles.cell}>{item.category_name}</Text>
            <Text style={styles.cell}>R$ {item.price.toFixed(2)}</Text>
            <TouchableOpacity onPress={() => handleEdit(item)}>
                <Ionicons name="pencil" size={20} color="#0077b6" />
            </TouchableOpacity>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}> Lista Produtos </Text>
            <TouchableOpacity
                onPress={() => setModalVisible(true)}
                style={styles.addButton}
            >
                <Text style={styles.addButtonText}>+ Adicionar Produto</Text>
            </TouchableOpacity>

            {/* Cabeçalho da tabela */}
            <View style={[styles.row, styles.header]}>
                <Text style={styles.headerCell}>Nome</Text>
                <Text style={styles.headerCell}>Categoria</Text>
                <Text style={styles.headerCell}>Preço</Text>
            </View>

            {/* Lista de produtos */}
            <FlatList
                data={products}
                keyExtractor={(item) => item.uuid}
                renderItem={renderItem}
            />

            {/* Modal */}
            <Modal visible={modalVisible} animationType="slide" transparent>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>{isUpdate ? ("Atualizar") : "Novo"} Produto</Text>
                        <TextInput
                            placeholder="Nome do Produto"
                            value={name}
                            onChangeText={setName}
                            style={styles.input}
                        />

                        <Text >Categoria</Text>
                        <View style={{ zIndex: 3000 }}>
                            <DropDownPicker
                                open={open}
                                value={category}
                                items={categories}
                                setOpen={setOpen}
                                setValue={setCategory}
                                setItems={setCategories}
                                placeholder="Selecione uma categoria"
                                style={{ marginBottom: open ? 180 : 12 }} // espaço extra quando aberto
                                zIndex={3000}
                                zIndexInverse={1000}
                            />
                        </View>


                        <TextInput
                            placeholder="Preço"
                            value={price}
                            onChangeText={setPrice}
                            keyboardType="numeric"
                            style={styles.input}
                        />

                        <View style={styles.modalButtons}>
                            <TouchableOpacity
                                style={styles.saveButton}
                                onPress={handleSave}
                            >
                                <Text style={styles.buttonText}>Salvar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.cancelButton}
                                onPress={() => setModalVisible(false)}
                            >
                                <Text style={styles.buttonText}>Cancelar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
}
