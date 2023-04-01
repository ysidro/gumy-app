import { View, Image, ActivityIndicator } from 'react-native';
import { FC } from 'react';

import { globalStyles } from '../styles/Global';

export const GumySpash: FC = () => {
  return (
    <View style={globalStyles.screenContainer}>
      <Image source={require('../../assets/icon.png')} style={globalStyles.img} />
      <ActivityIndicator size="large" />
    </View>
  );
};
