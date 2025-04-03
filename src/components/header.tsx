import {FC, ReactNode} from "react";
import { StyleSheet, Text, View } from "react-native";

type Props = {
    title: string,
}

const Header: FC<Props> = ({title}) => {
    return (
        <View style={styles.header}>
            <Text style={styles.headerTitle}>{title}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    header:{
        width:"100%",
        height: 60,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: '#0077b6',

        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 4,

        elevation: 10,
    },
    headerTitle:{
        color:"#f8f9fa",
        fontSize: 24,
        fontWeight: 'bold',
        letterSpacing: 1.2
    }
})

export default Header