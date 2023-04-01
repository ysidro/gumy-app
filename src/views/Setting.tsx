import { View, Text, Button } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { useDispatch } from 'react-redux';

import { globalStyles } from '../styles/Global';
import { logoutSuccess } from '../store/reducers/authReducer';

const SettingScreen = () => {
  const dispatch = useDispatch();

  return (
    <View style={globalStyles.screenContainer}>
      <Text style={globalStyles.title}>Settings</Text>
      <Button
        title="Cerrar Session"
        onPress={async () => {
          await SecureStore.deleteItemAsync('uToken');
          dispatch(logoutSuccess());
        }}
      />
    </View>
  );
};

export default SettingScreen;
