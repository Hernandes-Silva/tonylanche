import {FC, ReactNode} from "react";
import { StyleSheet, Text, View } from "react-native";

type Props = {
    children: ReactNode,
}

const ContainerAuthenticated: FC<Props> = ({children}) => {
    return (
        <View style={styles.container}>
            {children}
        </View>
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