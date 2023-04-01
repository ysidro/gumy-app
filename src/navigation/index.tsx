import { NavigationContainer } from '@react-navigation/native';
import { useSelector } from 'react-redux';

import DrawerNavigator from './DrawerNavigator';
import { RootState } from '../store';
import AuthStack from './AuthStack';

export default function Navigator() {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  return <NavigationContainer>{isLoggedIn ? <DrawerNavigator /> : <AuthStack />}</NavigationContainer>;
}
