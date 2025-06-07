import { Stack } from "expo-router";
import { AuthProvider, useAuth } from "../hooks/useAuth";

const RootLayout = () => {
  const { isAuthenticated } = useAuth();
  console.log(isAuthenticated)
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