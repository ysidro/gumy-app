import { BottomTabNavigationOptions, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { AntDesign, FontAwesome } from '@expo/vector-icons';

import { Colors } from '../styles/Colors';

// Screens
import { StackNavigationOptions, createStackNavigator } from '@react-navigation/stack';
import { CustomerDetailScreen, CustomerShopHistoryScreen, CustomersScreen } from '../views/Customers';

const Stack = createStackNavigator();

const CustomerStack = ({ navigation }: any) => {
  const screenParams: StackNavigationOptions = {
    headerTitleAlign: 'center',
    headerBackTitleVisible: false,
    headerShown: true
  };

  return (
    <Stack.Navigator screenOptions={screenParams}>
      <Stack.Screen
        name="Clientes"
        component={CustomersScreen}
        options={{
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
              <FontAwesome name="align-left" size={16} style={{ marginLeft: 15 }} color={Colors.secondary} />
            </TouchableOpacity>
          )
        }}
      />

      <Stack.Screen name="Cliente" component={CustomerDetailScreen} />
      <Stack.Screen name="HistoricoCompras" component={CustomerShopHistoryScreen} />
    </Stack.Navigator>
  );
};

export { CustomerStack };
