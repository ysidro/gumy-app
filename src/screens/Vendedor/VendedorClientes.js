import * as React from 'react'
import Constants from "expo-constants";
import { View, Text, FlatList, SafeAreaView, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native'

import { useSelector, useDispatch } from "react-redux"
import { AntDesign, FontAwesome } from "@expo/vector-icons"
import { globalStyles, salesResume } from '../../styles/global'
import CustomButtons from '../../components/CustomButtons'
import { Colors } from "../../constants/Colors";

import { Skeleton } from 'moti/skeleton'
import ListCustomers from '../../components/ListCustomers' 

export default function VendedorClientes({ navigation }) {

    const { name, adm_token } = useSelector(state => state.user)
    const vendedor = useSelector(state => state.user);
    const dispatch = useDispatch()

    const [customerData, setCustomerData] = React.useState([])
    const [ids, setIds] = React.useState(new Set());
    const [loadingData, setLoadingData] = React.useState(null);
    const [skip, setSkip] = React.useState(0);
    const [loading, setLoading] = React.useState(false);
    const [tokenID, setTokenID] = React.useState(null);
    const [searchCustomer, setSearchCustomer] = React.useState(null);

    React.useEffect(() => {
        getValueFor()
        setTokenID(Constants.expoConfig.extra.AMD_TOKEN);
    }, [])

    const pushScroll = () =>{
        customerData.length > 10 ?  setSkip(skip + 1) : "";
       
    }

    React.useEffect(()=> { 
        getValueFor() 
        setLoading(true);
        
    },[skip])

    React.useEffect(()=> {
        if(searchCustomer){
        const searchCustomerByID = searchCustomer.ID
        setSearchCustomer(null);
        navigation.navigate('Cliente', { data : searchCustomerByID })
        }
    },[searchCustomer])
    
    async function getValueFor() {
        try {

            var requestOptions = {
                method: 'GET',
                body: "",
                redirect: 'follow'
            };
            

            fetch(`https://api.admcloud.net/api/Customers?SalesRepID=${adm_token}&skip=${skip}&token=${Constants.expoConfig.extra.AMD_TOKEN}`, requestOptions)
                .then(response => response.json())
                .then(result => {

                    const filteredData = result.data.filter(item => !ids.has(item.ID));
                    const newIds = new Set([...ids, ...filteredData.map(item => item.ID)]);

                    setCustomerData([...customerData, ...filteredData]);
                    console.log(customerData.length);
                    setIds(newIds);
                    setLoading(false);
                    setLoadingData(true)

                })
                .catch(error => console.log('error', error));

        }
        catch (err) {
            console.error('any fail.', err);
        }
    }

    const Item = ({ data }) => {
  
        return(
        <TouchableOpacity style={globalStyles.touchList} onPress={() => navigation.navigate('Cliente', { data : data.item.ID })}>
          <Text style={globalStyles.listTitleText}>{data.item.Name}</Text>
          <Text style={globalStyles.listContentText}> {data.item.Phone1}</Text>
         
        </TouchableOpacity>
      )};

      const renderFooter = () => {
        if (!loading) return null;
        return (
            <ActivityIndicator animating size="large" />
        );
      };
    

    return (
    <SafeAreaView style={style.content}>
        {!loadingData ? <View style={style.contentSkeleton}>
            <Skeleton width={"95%"} colorMode={'light'} height={310} />
        </View>: <>
        <ListCustomers
                            value={searchCustomer}
                            onChange={(value) => setSearchCustomer(value)}
                            label={"Cliente"}
                            tokenID={tokenID}
                            userID={adm_token}
                        />
        <FlatList
            data={customerData}
            renderItem={(item) => <Item data={item} />}
            keyExtractor={item => item.ID}

            onEndReached={pushScroll} 
            onEndReachedThreshold={.5}
            ListFooterComponent={renderFooter}
        /></>
        }
    </SafeAreaView>
    )
}

const style = StyleSheet.create({
    content: {
      justifyContent: 'center',
      marginTop: 15,
      width: "100%",
    },
  
  })