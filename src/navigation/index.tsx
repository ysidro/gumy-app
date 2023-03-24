import { NavigationContainer } from "@react-navigation/native";
// import { useSelector } from "react-redux";

// import { selectIsLoggedIn } from "../store/modules/auth";
import AuthStack from "./AuthStack";

export default function Navigator() {
    // const isLoggedIn = useSelector(selectIsLoggedIn);
    const isLoggedIn = false;

    return (
        <NavigationContainer>
            {
                isLoggedIn ? <AuthStack /> : <AuthStack />
            }
        </NavigationContainer >
    )
}