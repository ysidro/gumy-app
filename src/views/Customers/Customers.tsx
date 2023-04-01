import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Skeleton } from 'moti/skeleton';
import { useEffect } from 'react';

import { getCustomersFailure, getCustomersStart, getCustomersSuccess } from '../../store/reducers/customerReducer';
import { globalStyles } from '../../styles/Global';
import { CustomerService } from '../../service';
import { RootState } from '../../store';

const CustomersScreen = ({ navigation }: any) => {
  const dispatch = useDispatch();
  const { loading, customers, error } = useSelector((state: RootState) => state.customers);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      dispatch(getCustomersStart());
      const result = await new CustomerService().getCustomers<any>();

      if (result && result.success && result.data) {
        dispatch(getCustomersSuccess(result.data));
      } else {
        throw new Error('no data.');
      }
    } catch (error: any) {
      dispatch(getCustomersFailure(error.message));
    }
  };

  const pushCustomer = () => {
    // const sumIndex = index + 1;
    // setIndex(sumIndex)
    // alert(`index es igual a ${index}`)
  };

  const Item = ({ data }) => (
    <TouchableOpacity
      style={globalStyles.touchList}
      onPress={() => navigation.navigate('Cliente', { data: data.item.ID })}
    >
      <Text style={globalStyles.listTitleText}>{data.item.Name}</Text>
      <Text style={globalStyles.listContentText}> {data.item.Phone1}</Text>
    </TouchableOpacity>
  );

  const renderFooter = () => {
    if (!loading) return null;
    return (
      <View style={{ paddingVertical: 20 }}>
        <ActivityIndicator animating size="large" />
      </View>
    );
  };

  return (
    <SafeAreaView style={style.content}>
      {loading ? (
        <View style={globalStyles.contentSkeleton}>
          <Skeleton width={'95%'} colorMode="light" height={310} />
        </View>
      ) : (
        <FlatList
          data={customers}
          renderItem={(item) => <Item data={item} />}
          keyExtractor={(item) => item.ID}
          onEndReached={pushCustomer}
          onEndReachedThreshold={0.5}
          refreshing={loading}
          ListFooterComponent={renderFooter}
        />
      )}
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  content: {
    justifyContent: 'center',
    marginTop: 15,
    width: '100%'
  }
});

export { CustomersScreen };
