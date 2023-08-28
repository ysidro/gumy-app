
import { useNavigation } from '@react-navigation/native'
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import {AntDesign, FontAwesome} from "@expo/vector-icons"

import Settings from "../screens/Settings"
import MensajeriaTabs from "./MensajeriaTabs"
import DeliveryHome from "../screens/DeliveryProfile/DeliveryHome"
import { Colors } from "../constants/Colors";
import { TouchableOpacity } from "react-native-gesture-handler";

const DeliveryButtonTabsNavs = createBottomTabNavigator();

export default function DeliveryBottonTabs() {
    const navigation = useNavigation()
    const screenParams = {
        headerTitleAlign:"center",
        presentation: "modal",
        tabBarActiveTinColor: Colors.primary,
        headerBackTitleVisible: false
    }
    return (
        <DeliveryButtonTabsNavs.Navigator
        screenOptions={screenParams}>

            <DeliveryButtonTabsNavs.Screen 
                screenOptions={{ screen:"Dasboard" }} 
                name="DeliveryHome" component={MensajeriaTabs}
               
                options={{
                    headerShown:false,
                    // headerLeft: () => (
                    // <TouchableOpacity onPress={() => navigation.openDrawer() }>
                    // <FontAwesome name="align-left" size={22} style={{marginLeft:25}} color={Colors.secondary} />
                    // </TouchableOpacity>
                    // ),
                    tabBarIcon:({color}) => (
                    <AntDesign name="home" size={24} color={color} />
                    )
                }}

                />
                 <DeliveryButtonTabsNavs.Screen 
      name="Settings" 
      component={Settings}
      options={{
        // headerLeft: () => (
        //   <TouchableOpacity onPress={() => navigation.openDrawer() }>
        //     <FontAwesome name="align-left" size={16} style={{marginLeft:15}} color={Colors.secondary} />
        //   </TouchableOpacity>
        //   ),
        tabBarIcon:({color}) => (
        <AntDesign name="setting" size={24} color={color} />
        )
      }} />

        </DeliveryButtonTabsNavs.Navigator>
    )

}