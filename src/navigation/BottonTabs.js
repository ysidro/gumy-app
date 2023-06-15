
import { useNavigation } from '@react-navigation/native'
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import {AntDesign, FontAwesome} from "@expo/vector-icons"

import Home from "../screens/Home";
import Sales from "../screens/Sales/Sales";
import Settings from "../screens/Settings";
import { Colors } from "../constants/Colors";
import { TouchableOpacity } from "react-native-gesture-handler";


const ButtonTabsNavs = createBottomTabNavigator()

export default function BottonTabs() {
    const navigation = useNavigation()
    const screenParams = {
        headerTitleAlign:"center",
        presentation: "modal",
        tabBarActiveTinColor: Colors.primary,
        headerBackTitleVisible: false
    }
  return (
    <ButtonTabsNavs.Navigator
        screenOptions={screenParams}
    >
      <ButtonTabsNavs.Screen 
      screenOptions={{ screen:"Dasboard" }} 
      name="Home" component={Home}
      options={{
        headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.openDrawer() }>
          <FontAwesome name="align-left" size={16} style={{marginLeft:15}} color={Colors.secundary} />
        </TouchableOpacity>
        ),
        tabBarIcon:({color}) => (
          <AntDesign name="home" size={24} color={color} />
        )
      }}

       />
      <ButtonTabsNavs.Screen 
        name="Sales" 
        component={Sales}
        options={{
         // tabBarBadge:0,
          tabBarBadgeStyle:{
            backgroundColor: Colors.secundary,
            color:Colors.Blueligth,
          },
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.openDrawer() }>
              <FontAwesome name="align-left" size={16} style={{marginLeft:15}} color={Colors.secundary} />
            </TouchableOpacity>
            ),
          tabBarIcon:({color}) => (
            <AntDesign name="shoppingcart" size={24} color={color} />
          )
        }} />

      <ButtonTabsNavs.Screen 
      name="Settings" 
      component={Settings}
      options={{
        headerLeft: () => (
          <TouchableOpacity onPress={() => navigation.openDrawer() }>
            <FontAwesome name="align-left" size={16} style={{marginLeft:15}} color={Colors.secundary} />
          </TouchableOpacity>
          ),
        tabBarIcon:({color}) => (
        <AntDesign name="setting" size={24} color={color} />
        )
      }} />
    </ButtonTabsNavs.Navigator>
  )
}