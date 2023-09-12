import * as React from 'react'
import Constants from "expo-constants";
import { View, Text, FlatList, SafeAreaView, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native'

import { useSelector, useDispatch } from "react-redux"
import { AntDesign, FontAwesome } from "@expo/vector-icons"
import { globalStyles, salesResume } from '../../styles/global'
import CustomButtons from '../../components/CustomButtons'
import { Colors } from "../../constants/Colors";
import { MotiView } from 'moti';
import { Skeleton } from 'moti/skeleton'
import ListCustomers from '../../components/ListCustomers' 

export default function VendedorHistoricoVisitas({ navigation, route }) {

    const { name, adm_token } = useSelector(state => state.user)
    const vendedor = useSelector(state => state.user);
    const dispatch = useDispatch()

    const [customerData, setCustomerData] = React.useState(route.params.history)
    const [ids, setIds] = React.useState(new Set());
    const [loadingData, setLoadingData] = React.useState(true);
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
       const newData = customerData.sort(function(a,b){
            // Turn your strings into dates, and then subtract them
            // to get a value that is either negative, positive, or zero.
            return new Date(b.date) - new Date(a.date);
          });
          setCustomerData(newData);
        // try {
        //     console.log("hola");
        // //     var requestOptions = {
        // //         method: 'GET',
        // //         body: "",
        // //         redirect: 'follow'
        // //     };
            

        // //     fetch(`https://api.admcloud.net/api/Customers?SalesRepID=${adm_token}&skip=${skip}&token=${Constants.expoConfig.extra.AMD_TOKEN}`, requestOptions)
        // //         .then(response => response.json())
        // //         .then(result => {

        // //             const filteredData = result.data.filter(item => !ids.has(item.ID));
        // //             const newIds = new Set([...ids, ...filteredData.map(item => item.ID)]);

        // //             setCustomerData([...customerData, ...filteredData]);
        // //             console.log(customerData.length);
        // //             setIds(newIds);
        // //             setLoading(false);
        // //             setLoadingData(true)

        // //         })
        // //         .catch(error => console.log('error', error));

        // // }
        // catch (err) {
        //     console.error('any fail.', err);
        // }
    }

    const Spacer = ({ height = 16 }) => <MotiView style={{ height }} />
    const Item = ({ data }) => {
        console.log(data.index + 1,data.item.date, data.item.sale,data.item.saleJustification,data.item.customerData.Name)
        return(
        <TouchableOpacity style={globalStyles.touchList} onPress={() => navigation.navigate('Cliente', { data : data.item.ID })}>
         
         <View style={globalStyles.row}>
         <View>
         <Text style={{width:15, marginTop:4,marginRight:5,flex:1,fontWeight:"700", justifyContent:"center", alignContent:"center", fontSize:22}}>{data.index + 1}</Text>
         </View>
         <View style={{width:"70%"}}>
          <Text style={globalStyles.listContentText}> {data.item.saleJustification}</Text>
        
          <Text style={globalStyles.listContentText}> {data.item?.customerData?.Name}</Text>
         </View>
         <View>
         <Text style={globalStyles.listTitleText}>{data.item.date}</Text>
         </View>
         </View>
         
         
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
            
            <Skeleton width={"100%"} colorMode={'light'} height={125} />
            <Spacer height={15} />
            <Skeleton width={"100%"} colorMode={'light'} height={35} />
            <Spacer height={15} />
            <Skeleton width={"100%"} colorMode={'light'} height={15} />
            <Spacer height={15} />
            
            <Skeleton width={"100%"} colorMode={'light'} height={15} />
            <Spacer height={15} />
     
            <Skeleton width={"100%"} colorMode={'light'} height={15} />
            <Spacer height={15} />
            <Skeleton width={"100%"} colorMode={'light'} height={15} />
     
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

           // onEndReached={pushScroll} 
           // onEndReachedThreshold={.5}
           // ListFooterComponent={renderFooter}
        /></>
        }
    </SafeAreaView>
    )
}

const style = StyleSheet.create({
    content: {
      justifyContent: 'center',
      marginTop: 15,
      paddingHorizontal: 10,
      width: "100%",
    },
  
  })