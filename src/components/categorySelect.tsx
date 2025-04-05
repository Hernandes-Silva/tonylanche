import React from 'react'
import { StyleSheet, Text, ScrollView, Pressable } from "react-native";

import roundedCardWithShadow from '@/src/styles/roundedCardWithShadow';

type CategorySelectProps = {
    categories: string[];
    actualSelectedCategory: string
    onPressHandler: (category: string) => void;
};
const CategorySelect = React.memo(({ categories, actualSelectedCategory, onPressHandler}: CategorySelectProps) => {
    const renderCategory = (category: string) => (
        <Pressable
            key={category}
            style={[
                styles.categoryCard,
                actualSelectedCategory === category && styles.categoryCardSelected,
            ]}
            onPress={() => onPressHandler(category)}
        >
            <Text
                style={[
                    styles.categoryText,
                    actualSelectedCategory === category && styles.categoryTextSelected,
                ]}
            >
                {category}
            </Text>
        </Pressable>
    );

    return (
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.categoryContainer}
        >
            {categories.map(renderCategory)}
        </ScrollView>

    )

})

export default CategorySelect;

const styles = StyleSheet.create({
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


});