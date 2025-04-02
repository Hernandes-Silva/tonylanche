import { Stack } from "expo-router";

export default function RootLayout() {
  console.log("aquiii")
  return (
    <Stack screenOptions={{headerShown: false}}> 
        <Stack.Screen name="(authenticated)" />
    </Stack>
  )
}
