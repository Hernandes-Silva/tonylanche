import Header from "@/src/components/header"
import { Tabs } from "expo-router"

export default function TLayout() {
    return (
        <>
            <Header title="Finance Lanche"/>
            <Tabs screenOptions={{headerShown: false}}>
                <Tabs.Screen name="index" options={{href: null}}/>
                <Tabs.Screen name="home" />
                <Tabs.Screen name="historic" />
                <Tabs.Screen name="graphics" />
            </Tabs>
        </>
    )
}