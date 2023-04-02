import { BottomTabNavigationOptions, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { AntDesign, FontAwesome } from '@expo/vector-icons';

// Screens
import { StackNavigationOptions, createStackNavigator } from '@react-navigation/stack';
import { CustomerDetailScreen, CustomerShopHistoryScreen, CustomersScreen } from '../../views/Customers';
import { Colors } from '../../styles/Colors';

const Tab = createBottomTabNavigator();

const CustomerTabs = ({ navigation }: any) => {
  const screenParams: StackNavigationOptions = {
    headerTitleAlign: 'center',
    headerBackTitleVisible: false,
    headerShown: true
  };

  return (
    <Tab.Navigator screenOptions={screenParams}>
      <Tab.Screen
        name="Clientes"
        component={CustomersScreen}
        options={{
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
              <FontAwesome name="align-left" size={16} style={{ marginLeft: 15 }} color={Colors.secondary} />
            </TouchableOpacity>
          ),
          tabBarIcon: ({ color }) => <AntDesign name="setting" size={24} color={color} />
        }}
      />

      <Tab.Screen name="Cliente" component={CustomerDetailScreen} />
      <Tab.Screen name="HistoricoCompras" component={CustomerShopHistoryScreen} />
    </Tab.Navigator>
  );
};

export { CustomerTabs };
