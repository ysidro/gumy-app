import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react';

import { CustomerTabs } from './Tabs/CustomerTabs';
import { DrawerContent } from './DrawerContent';
import DasboardStack from './DasboardStack';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator drawerContent={(props) => <DrawerContent {...props} />}>
      <Drawer.Screen name="Home" component={DasboardStack} options={{ headerShown: false }} />
      <Drawer.Screen name="CustomerTabs" component={CustomerTabs} options={{ headerShown: false, title: 'Clientes' }} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
