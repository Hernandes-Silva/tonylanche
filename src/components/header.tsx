import {FC, ReactNode} from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from 'expo-router';
import { DrawerActions } from '@react-navigation/native';
import { Ionicons } from "@expo/vector-icons";
type Props = {
    title: string,
}

const Header: FC<Props> = ({title}) => {
    const navigation = useNavigation();

    const openDrawer = () => {
      navigation.dispatch(DrawerActions.openDrawer());
    };

    return (
        <View style={styles.header}>
            <TouchableOpacity onPress={openDrawer} style={styles.menuButton}>
                <Ionicons name="menu" size={24} color="white" />
            </TouchableOpacity>
            <View style={styles.titleContainer}>
                <Text style={styles.headerTitle}>{title}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    header:{
        height: 60,
        flexDirection:"row",
        alignItems:"center",
        backgroundColor: '#0077b6',
        position: 'relative',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 4,

        elevation: 10,
    },
    menuButton: {
        zIndex: 2,
        marginLeft:10
    },
    titleContainer: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerTitle:{
        alignSelf:'center',
        color:"#f8f9fa",
        fontSize: 24,
        fontWeight: 'bold',
        letterSpacing: 1.2
    },
})

export default Header