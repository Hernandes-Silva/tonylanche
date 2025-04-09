
import { Drawer } from 'expo-router/drawer';

export default function DrawerLayout() {
  return (
    <>
        <Drawer screenOptions={{ headerShown: false }}>
            <Drawer.Screen name="(tabs)" options={{ drawerLabel: 'Home' }} />
            <Drawer.Screen name="(drawer)" options={{ drawerLabel: 'Sobre o App' }} />
        </Drawer>
    </>
  );
}