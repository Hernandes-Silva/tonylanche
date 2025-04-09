import Header from "@/src/components/header";
import { Stack } from "expo-router";

export default function DrawerLayout() {
  return (
    <>
        <Header title="Finance Lanche" />
        <Stack screenOptions={{headerShown: false}}> 
            <Stack.Screen name="index" />
        </Stack>
    </>
  )
}