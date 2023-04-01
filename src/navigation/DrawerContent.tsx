import React from 'react';
import { View, StyleSheet } from 'react-native';
import { DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { useDispatch } from 'react-redux';
import { logoutSuccess } from '../store/reducers/authReducer';

interface DrawerContentProps {
  navigation: any;
}

export const DrawerContent = (props: DrawerContentProps) => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    // Call your logout API here
    dispatch(logoutSuccess());
  };

  return (
    <View style={styles.container}>
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      <DrawerItem label="Logout" onPress={handleLogout} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
