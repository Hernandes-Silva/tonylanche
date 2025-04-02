import { Tabs } from "expo-router"
console.log("oushh")
export default function TLayout() {
    console.log("aquiii22222")
    return (
        <Tabs initialRouteName="home">
            <Tabs.Screen name="index" />
            <Tabs.Screen name="home" />
            <Tabs.Screen name="graphics" />
        </Tabs>
    )
}