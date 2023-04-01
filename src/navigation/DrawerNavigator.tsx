import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react';

import { DrawerContent } from './DrawerContent';
import DasboardStack from './DasboardStack';
import { CustomerStack } from './CustomerStack';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator drawerContent={(props) => <DrawerContent {...props} />}>
      <Drawer.Screen name="Home" component={DasboardStack} options={{ headerShown: false }} />
      <Drawer.Screen
        name="CustomerStack"
        component={CustomerStack}
        options={{ headerShown: false, title: 'Clientes' }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
