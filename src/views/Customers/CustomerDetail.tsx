import { View, Text, SafeAreaView, StyleSheet, Linking, TouchableOpacity } from 'react-native';

import { Colors } from '../../styles/Colors';

const CustomerDetailScreen = ({ navigation }: any) => {
  return <SafeAreaView style={style.content}></SafeAreaView>;
};

const style = StyleSheet.create({
  content: {
    justifyContent: 'center',
    width: '100%'
  },
  cartContent: {
    paddingVertical: 18,
    margin: 8,
    backgroundColor: Colors.white,
    borderRadius: 12
  },
  cartItems: {
    paddingHorizontal: 18,
    paddingVertical: 6
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 15,
    marginBottom: 0,
    marginHorizontal: 10,
    color: Colors.primary
  },
  listTitle: {
    fontWeight: 'bold',
    fontSize: 12,
    color: Colors.grey
  },
  listTitleText: {
    color: Colors.secondary,
    fontSize: 18,
    fontWeight: 'bold'
  },
  mapLink: {
    backgroundColor: Colors.primary,
    borderRadius: 8,
    padding: 16
  },
  mapLinkWarning: {
    backgroundColor: Colors.red,
    borderRadius: 8,
    padding: 16
  },
  mapLinkText: {
    color: Colors.blueLight,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  regularButton: {
    backgroundColor: Colors.secondary,
    borderRadius: 8,
    padding: 14
  },
  contentSkeleton: {
    justifyContent: 'center',
    width: '100%',
    padding: 16
  }
});

export { CustomerDetailScreen };
