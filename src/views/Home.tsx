import { Text, View } from "react-native";
import { useState } from "react";

import { globalStyles } from "../styles/Global";

const HomeScreen: React.FC = () => {
    const [name, setName] = useState(null);

    return (
        <View style={globalStyles.screenContainer}>
            <Text style={globalStyles.title}>Home</Text>
            <Text>{name}</Text>
            {/* <ServicesSales /> */}
        </View>
    )
}

export default HomeScreen;