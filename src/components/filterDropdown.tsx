import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Modal } from 'react-native';
import { filterDisplayList } from '@/src/types/filterTypes';
import roundedCardWithShadow from '@/src/styles/roundedCardWithShadow';

type Props = {
    selectedValue: string;
    onChange: (value: string) => void;
    label: string;
};

const FilterDropdown: React.FC<Props> = ({ selectedValue, onChange, label }) => {
    const [visible, setVisible] = useState(false);

    return (
        <View style={styles.wrapper}>
            <TouchableOpacity style={styles.button} onPress={() => setVisible(true)}>
                <Text style={styles.buttonText}>
                    Filtro: {label}
                </Text>
            </TouchableOpacity>

            <Modal transparent visible={visible} animationType="fade">
                <TouchableOpacity
                    style={styles.overlay}
                    activeOpacity={1}
                    onPressOut={() => setVisible(false)}
                >
                    <View style={styles.dropdown}>
                        {filterDisplayList.map(([key, value]) => (
                            <TouchableOpacity
                                key={key}
                                style={styles.option}
                                onPress={() => {
                                    onChange(key);
                                    setVisible(false);
                                }}
                            >
                                <Text style={styles.optionText}>
                                    {value}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </TouchableOpacity>
            </Modal>
        </View>
    );
};

export default FilterDropdown;

const styles = StyleSheet.create({
    wrapper: {
        margin: 8,
        zIndex: 10,
    },
    button: {
        ...roundedCardWithShadow,
        backgroundColor: '#eee',
        padding: 12,
        borderRadius: 8,
    },
    buttonText: {
        fontSize: 16,
        color: '#333',
    },
    overlay: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.2)',
        paddingHorizontal: 32,
    },
    dropdown: {
        backgroundColor: '#fff',
        borderRadius: 8,
        elevation: 5,
        paddingVertical: 8,
    },
    option: {
        paddingVertical: 10,
        paddingHorizontal: 16,
    },
    optionText: {
        fontSize: 16,
    },
});
