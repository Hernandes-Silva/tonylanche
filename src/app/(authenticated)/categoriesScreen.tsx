import React, { use, useEffect, useState } from 'react';
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
import { Ionicons } from '@expo/vector-icons';

import styles from '@/src/styles/tableDefaultStyle'; 
import { createCategory, getCategories, updateCategory } from '@/src/services/categoriesService';

type Category = {
    uuid: string;
    name: string;
};


export default function CategoryScreen() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [name, setName] = useState('');
    const [updateId, setUpdateId] = useState('')
    const [isUpdate, setIsUpdate] = useState(false)


    useEffect(() => {
        getCategories().then(data => {
            setCategories(data)
        })
    }, [])

    const handleSave = async () => {
        if(isUpdate){
            return await editCategory()
        }

        return await addCategory()
    }
    const addCategory = async () => {
        if (!name) return;

        var newCategory = await createCategory(name)

        setCategories((prev) => [...prev, newCategory]);
        setName('');
        setModalVisible(false);
    };

    const handleEdit = async (category: Category) => {
        setIsUpdate(true)
        setName(category.name)
        setUpdateId(category.uuid)
        setModalVisible(true)
    }

    const editCategory = async () => {
        if (!name) return;

        var updatedCategory = await updateCategory(updateId, name)

        setCategories((prev) =>
            prev.map((category) =>
                category.uuid === updateId ? updatedCategory : category
        ));
        setName('');
        setUpdateId('');
        setIsUpdate(false)
        setModalVisible(false); 
    };

    const renderItem = ({ item }: { item: Category }) => (
        <View style={styles.row}>
            <Text style={styles.cell}>{item.name}</Text>
            <TouchableOpacity onPress={() => handleEdit(item)}>
                <Ionicons name="pencil" size={20} color="#0077b6" />
            </TouchableOpacity>
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
                keyExtractor={(item) => item.uuid}
                renderItem={renderItem}
            />

            {/* Modal */}
            <Modal visible={modalVisible} animationType="slide" transparent>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>{isUpdate ? ("Atualizar") : "Nova"} Categoria</Text>
                        <TextInput
                            placeholder="Nome da Categoria"
                            value={name}
                            onChangeText={setName}
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

