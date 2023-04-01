import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';
import { globalStyles } from '../styles/Global';

const HomeScreen = () => {
  const [name, setName] = useState(null);

  return (
    <View style={globalStyles.screenContainer}>
      <Text style={globalStyles.title}>Home</Text>
      <Text>{name}</Text>
      {/* <ServicesSales/> */}
    </View>
  );
};

export default HomeScreen;
