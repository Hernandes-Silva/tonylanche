import { Stack } from "expo-router";
import { AuthProvider, useAuth } from "../hooks/useAuth";
import { View, ActivityIndicator } from "react-native";

const RootLayout = () => {
  const { isAuthenticated, isLoading } = useAuth();
  console.log(isAuthenticated, isLoading)

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0077b6" />
      </View>
    );
  }

  return (
      <Stack screenOptions={{headerShown: false}}> 
        {isAuthenticated ? (
          <Stack.Screen name="(authenticated)" />
        ) : (
          <Stack.Screen name="loginScreen" />
        )}
      </Stack>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <RootLayout />
    </AuthProvider>
  );
}