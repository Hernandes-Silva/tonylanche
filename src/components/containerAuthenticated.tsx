import {FC, ReactNode} from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";

type Props = {
    children: ReactNode,
}

const ContainerAuthenticated: FC<Props> = ({children}) => {
    return (
        
        <SafeAreaView style={styles.container}>
            {children}
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: "#f8f9fa", 
        flex:1,
        padding:10
    }
})

export default ContainerAuthenticated;