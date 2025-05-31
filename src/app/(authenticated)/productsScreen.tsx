import React, { useState } from 'react';
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

type Product = {
    id: string;
    name: string;
    category: string;
    price: number;
};

export default function ProductScreen() {
    const [products, setProducts] = useState<Product[]>([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [price, setPrice] = useState('');

    const addProduct = () => {
        if (!name || !category || !price) return;

        const newProduct: Product = {
            id: Date.now().toString(),
            name,
            category,
            price: parseFloat(price),
        };

        setProducts((prev) => [...prev, newProduct]);
        setName('');
        setCategory('');
        setPrice('');
        setModalVisible(false);
    };

    const renderItem = ({ item }: { item: Product }) => (
        <View style={styles.row}>
            <Text style={styles.cell}>{item.name}</Text>
            <Text style={styles.cell}>{item.category}</Text>
            <Text style={styles.cell}>R$ {item.price.toFixed(2)}</Text>
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
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
            />

            {/* Modal */}
            <Modal visible={modalVisible} animationType="slide" transparent>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Novo Produto</Text>
                        <TextInput
                            placeholder="Nome do Produto"
                            value={name}
                            onChangeText={setName}
                            style={styles.input}
                        />
                        <TextInput
                            placeholder="Categoria"
                            value={category}
                            onChangeText={setCategory}
                            style={styles.input}
                        />
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
                                onPress={addProduct}
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
