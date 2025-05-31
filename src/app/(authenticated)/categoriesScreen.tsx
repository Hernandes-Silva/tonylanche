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

type Category = {
    id: string;
    name: string;
};

export default function CategoryScreen() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [name, setName] = useState('');


    const addCategory = () => {
        if (!name) return;

        const newCategory: Category = {
            id: Date.now().toString(),
            name
        };

        setCategories((prev) => [...prev, newCategory]);
        setName('');
        setModalVisible(false);
    };

    const renderItem = ({ item }: { item: Category }) => (
        <View style={styles.row}>
            <Text style={styles.cell}>{item.name}</Text>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}> Lista categorias </Text>
            <TouchableOpacity
                onPress={() => setModalVisible(true)}
                style={styles.addButton}
            >
                <Text style={styles.addButtonText}>+ Adicionar Categoria</Text>
            </TouchableOpacity>

            {/* Cabeçalho da tabela */}
            <View style={[styles.row, styles.header]}>
                <Text style={styles.headerCell}>Nome</Text>
            </View>

            {/* Lista de produtos */}
            <FlatList
                data={categories}
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
                        <View style={styles.modalButtons}>
                            <TouchableOpacity
                                style={styles.saveButton}
                                onPress={addCategory}
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

