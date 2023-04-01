import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { DrawerContent } from './DrawerContent';
import HomeScreen from '../views/Home';
import DasboardStack from './DasboardStack';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator drawerContent={(props) => <DrawerContent {...props} />}>
      <Drawer.Screen name="Home" component={DasboardStack} options={{ headerShown: false }} />
      {/* <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Almacen" component={HomeScreen} /> */}
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
