import { BottomTabNavigationOptions, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { AntDesign, FontAwesome } from '@expo/vector-icons';

import { Colors } from '../../styles/Colors';

// Screens
import SettingScreen from '../../views/Setting';
import HomeScreen from '../../views/Home';
import { SalesScreen } from '../../views/Sales';

const Tab = createBottomTabNavigator();

const BottonTabs = () => {
  const navigation = useNavigation();

  const screenParams: BottomTabNavigationOptions = {
    headerTitleAlign: 'center',
    // presentation: 'modal',
    tabBarActiveTintColor: Colors.primary
    // headerBackTitleVisible: false
  };

  return (
    <Tab.Navigator screenOptions={screenParams}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
              <FontAwesome name="align-left" size={16} style={{ marginLeft: 15 }} color={Colors.secondary} />
            </TouchableOpacity>
          ),
          tabBarIcon: ({ color }) => <AntDesign name="home" size={24} color={color} />
        }}
      />
      <Tab.Screen
        name="Sales"
        component={SalesScreen}
        options={{
          tabBarBadge: 0,
          tabBarBadgeStyle: {
            backgroundColor: Colors.secondary,
            color: Colors.blueLight
          },
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
              <FontAwesome name="align-left" size={16} style={{ marginLeft: 15 }} color={Colors.secondary} />
            </TouchableOpacity>
          ),
          tabBarIcon: ({ color }) => <AntDesign name="shoppingcart" size={24} color={color} />
        }}
      />

      <Tab.Screen
        name="Settings"
        component={SettingScreen}
        options={{
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
              <FontAwesome name="align-left" size={16} style={{ marginLeft: 15 }} color={Colors.secondary} />
            </TouchableOpacity>
          ),
          tabBarIcon: ({ color }) => <AntDesign name="setting" size={24} color={color} />
        }}
      />
    </Tab.Navigator>
  );
};

export { BottonTabs };
