import { StackNavigationOptions, createStackNavigator } from '@react-navigation/stack';

import { BottonTabs } from './Tabs';

// Screens
import SettingScreen from '../views/Setting';
import { SalesScreen } from '../views/Sales';

const HomeStack = createStackNavigator();

const DasboardStack = () => {
  const screenParams: StackNavigationOptions = {
    title: 'Gumy Tire Supply',
    headerTitleAlign: 'center',
    presentation: 'modal',
    headerShown: false,
    headerBackTitleVisible: false
  };

  return (
    <HomeStack.Navigator screenOptions={screenParams}>
      <HomeStack.Screen name="Dasboart" component={BottonTabs} />
      <HomeStack.Group screenOptions={{ headerShown: true }}>
        <HomeStack.Screen name="Ventas" component={SalesScreen} />
        {/* <HomeStack.Screen name="Order" component={Order}/>
              <HomeStack.Screen name="CrearOrden" component={CrearOrder}/>
              <HomeStack.Screen name="OrderDetails" component={OrderDetails}/>
              <HomeStack.Screen name="ViewsReport" component={ViewsReport}/> */}
        <HomeStack.Screen name="Settings" component={SettingScreen} />
      </HomeStack.Group>
    </HomeStack.Navigator>
  );
};

export default DasboardStack;
