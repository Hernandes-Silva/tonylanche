
import Header from '@/src/components/header';
import { Drawer } from 'expo-router/drawer';

const renderHeader = () =>{
  return  <Header title="Finanche Lanche" />
}
export default function DrawerLayout() {
  return (
    <>
        <Drawer initialRouteName="(tabs)">
            <Drawer.Screen name="(tabs)" options={{ drawerLabel: 'Home', headerShown: false }} />
            <Drawer.Screen name="productsScreen" options={{drawerLabel: 'Lista Produtos', header: renderHeader }} />
            <Drawer.Screen name="categoriesScreen" options={{drawerLabel: 'Lista Categorias', header: renderHeader}} />
        </Drawer>
    </>
  );
}