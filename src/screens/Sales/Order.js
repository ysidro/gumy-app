import React, { useEffect, useState, useRef } from 'react'
import { View, Text, FlatList, SafeAreaView, StyleSheet, TouchableOpacity,ActivityIndicator, useWindowDimensions } from 'react-native'
import { useSelector, useDispatch } from "react-redux"
import * as SecureStore from 'expo-secure-store'
import { Skeleton } from 'moti/skeleton'

import { restoreToken } from '../../features/auth/auth'
import CustomFormartDate from '../../components/CustomFormartDate'
import InputDate from "../../components/CustomInputDate"
import { globalStyles } from '../../styles/global'
import { BottomSheetModal, BottomSheetModalProvider, } from "@gorhom/bottom-sheet";
import SearchAny from '../../components/SearchAny'

export default function Order({navigation}) {
  const [salesData, setSalesData] = useState([]);
  const [ids, setIds] = useState(new Set());
  const [loadingData, setLoadingData] = useState(null);
  const [skip, setSkip] = useState(0);
  const [loading, setLoading] = useState(false);
  const [tokenID, setTokenID] = useState(null);
  const [searchSelected, setSearchSelected] = useState(null);
  const [DateFrom,setDateFrom] = useState(new Date("2001-01-02"));
  const [DateTo,setDateTo] = useState(new Date());

  const bottomSheetModalRef = useRef(null);
  const snapPoints = ["70%", "70%"];
  const { width } = useWindowDimensions();
  const [isOpen, setIsOpen] = useState(false);

  function handlePresentModal() {
    bottomSheetModalRef.current?.present();
    setTimeout(() => {
      setIsOpen(true);
    }, 100);
  }

  const dispatch = useDispatch()
  useEffect(() => {
    getValueFor('uToken')
  }, [])

  useEffect(() => {
    console.log(DateFrom,DateTo)
    getValueFor('uToken')
  }, [DateFrom,DateTo])

  useEffect(() => {
    setLoading(true);
    getValueFor('uToken')
  }, [skip])

  useEffect(() => {
    if(searchSelected){
      //console.log("searchSelected of search",searchSelected.ID);
      navigation.navigate('OrderDetails',{orderID : searchSelected.ID})
    }
    //navigation.navigate('OrderDetails',{orderID : data.item.ID})
  },[searchSelected])

  const handleLoadMore = () =>{
    
     setSkip(skip + 1)

  }

  async function getValueFor(key) {
    try {
      let result = await SecureStore.getItemAsync(key);
      if (result !== null) {
        dispatch(restoreToken(key))
        var raw = "";

        var requestOptions = {
          method: 'GET',
          body: raw,
          redirect: 'follow'
        };
        setTokenID(result)
        // DateFrom=2023-07-28T00:00:00&DateTo=2023-07-28T00:00:00
        fetch(`https://api.admcloud.net/api/SalesOrders?token=${result}&skip=${skip}&DateFrom=${DateFrom}T00:00:00&DateTo=${DateTo}T00:00:00`, requestOptions)
          .then(response => response.json())
          .then(result => {
           
            const filteredData = result.data.filter(item => !ids.has(item.id));
            const newIds = new Set([...ids, ...filteredData.map(item => item.id)]);
            setSalesData([...salesData, ...filteredData]);
            setIds(newIds);
            console.log('salesData',salesData)
            setLoading(false);
            setLoadingData(true)

          })
          .catch(error => console.log('error', error));
      } else {
        dispatch(restoreToken(null))
        console.log('SalesOrders no data');
      }
    }
    catch (err) {
      console.error('any fail.', err);
    }
  }

  const renderFooter = () => {
    if (!loading) return null;

    return (
      <ActivityIndicator
        size="large"
        style={{ marginBottom: 10 }}
      />
    );
  };

  const Item = ({ data }) => {
    const date = new Date(data.item.DocDate);
    const formattedDate = date.toLocaleDateString();
    let AuthorizationStatusDesc, labelContainer;
    
    if(data.item.AuthorizationStatusDesc === "Autorizada"){
      AuthorizationStatusDesc = globalStyles.authorizedLabel;
      labelContainer = globalStyles.authorizedLabelContainer;
    }else if(data.item.AuthorizationStatusDesc === "Pendiente"){
      AuthorizationStatusDesc = globalStyles.pendingLabel;
      labelContainer = globalStyles.pendingLabelContainer;
    }

    return(
      <TouchableOpacity style={globalStyles.touchList} onPress={() => navigation.navigate('OrderDetails',{orderID : data.item.ID}) }>

       <View style={globalStyles.rowBetween}>
       {data.item.AuthorizationStatusDesc ?  
       <View style={labelContainer}>
        
          <Text style={AuthorizationStatusDesc}>Estatus: {data.item.AuthorizationStatusDesc}</Text>
       </View> : ""}
       <Text>Días {data.item.Days} </Text>
      </View>
      <View style={globalStyles.rowBetween}>
      <View >
       {data.item.DocumentTypeName ?  <Text>Prioridad: {data.item.PriorityDesc} / {data.item.DocumentTypeName}</Text> : ""}
       </View>
       <CustomFormartDate DocDate={data.item.DocDate}/>
       
</View>
      <View style={globalStyles.rowBetween}>
        <Text style={globalStyles.listTitleText}>{data.item.RelationshipName}</Text>
        {data.item.DocID ? <Text style={globalStyles.listContentText}>No.:{data.item.DocID}</Text> : ""}
        
      </View>
      
      <View style={globalStyles.rowBetween}>
        <Text style={globalStyles.listContentText}>{data.item.CurrencyID}$ {data.item.TotalAmount.toLocaleString()}</Text>
      </View>

      <View style={globalStyles.rowBetween}>
      {data.item.LocationName ?  <Text>{data.item.LocationName}</Text> : ""}
      </View> 
  
      
      
    </TouchableOpacity>  
    )};

// onChange={(value) => setSearchCustomer(value)}
  return (
    <BottomSheetModalProvider>


      <SafeAreaView style={style.content}>
       
        {loadingData ? <> 
          <SearchAny searchIn="SalesOrders" data={salesData} tokenID={tokenID} searchSelected={(value) => setSearchSelected(value)} /> 
          
          <TouchableOpacity style={globalStyles.btnWarning} onPress={() => handlePresentModal()}>
          <View style={[globalStyles.rowBetween,{marginHorizontal:20,width:"90%"}]} > 
          
            <Text>Desde {DateFrom.toLocaleDateString()} </Text>
            <Text>Hasta  {DateTo.toLocaleDateString()} </Text>
          
          </View>
          </TouchableOpacity>
          <FlatList
          data={salesData}
          renderItem={(item) => <Item data={item} />}
          keyExtractor={item => item.ID}
          onEndReached={()=> handleLoadMore()}
          onEndReachedThreshold={.5}
          ListFooterComponent={renderFooter}

        /></> : <View style={globalStyles.contentSkeleton}>
          <Skeleton width={"95%"} colorMode={'ligth'} height={710} />
          <Skeleton width={"95%"} colorMode={'ligth'} height={710} />
          <Skeleton width={"95%"} colorMode={'ligth'} height={710} />
        </View>
        }
      </SafeAreaView>
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={1}
        snapPoints={snapPoints}
        backgroundStyle={{ borderRadius: 8 }}
        onDismiss={() => setIsOpen(false)}>  
        <View >
                    

                    <InputDate
                      value={DateFrom}
                      onChangeText={(value) => setDateFrom(value)}
                      label={"Desde"} minimumDate={false} maximumDate={true} /> 

              </View>
              <View >
                   <InputDate
                      value={DateTo}
                      onChangeText={(value) => setDateTo(value)}
                      label={"Hasta"} minimumDate={false} maximumDate={true}  /> 

              </View>
        </BottomSheetModal>
    </BottomSheetModalProvider>
  )
}

const style = StyleSheet.create({
  content: {
    justifyContent: 'center',
    marginTop: 15,
    width: "100%",
  },

})