import React, { useEffect, useState } from 'react'
import {
    View,
    Text,
    SafeAreaView, StyleSheet,
    FlatList,
    ScrollView
} from 'react-native'

import { useSelector, useDispatch } from "react-redux"
import * as SecureStore from 'expo-secure-store'
import { Skeleton } from 'moti/skeleton'
import { MotiView } from 'moti';

import { globalStyles } from "../../styles/global";
import { Colors } from '../../constants/Colors';
import { restoreToken } from '../../features/auth/auth'
import CustomButtons from "../../components/CustomButtons";

export default function OrderDetails({ route, navigation }) {
    const orderID = route.params.orderID
    const [orderData, setOrderData] = useState([]);
    const [loadingData, setLoadingData] = useState(null);

    const dispatch = useDispatch()



    useEffect(() => {
        getValueFor('uToken', orderID)
    }, [])

    async function getValueFor(key, orderID) {
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

                fetch(`https://api.admcloud.net/api/SalesOrders/${orderID}?token=${result}`, requestOptions)
                    .then(response => response.json())
                    .then(result => {
                        console.log(result)
                        setOrderData(result.data)
                        setLoadingData(true)

                    })
                    .catch(error => console.log('error', error));
            } else {
                dispatch(restoreToken(null))
                console.log('no data');
            }
        }
        catch (err) {
            console.error('any fail.', err);
        }
    }

    const Item = ({ data }) => (
        <View style={globalStyles.touchList}>
            <View style={globalStyles.rowBetween}>
                <Text style={globalStyles.lisLabel}> SKU {data.item.ItemSKU}</Text>
                <Text style={globalStyles.lisLabel}> {data.item.AuthorizationStatusDesc}</Text>
            </View>
            <View>
                <Text style={globalStyles.subTitle}>{data.item.Name}</Text>
            </View>
            <View style={globalStyles.rowBetween}>
                <Text style={globalStyles.listContentText}> {data.item.PriceWihTax}</Text>
                <Text style={globalStyles.listTitleText}>Cantidad {data.item.Quantity}</Text>
            </View>
        </View>
    );

    const Spacer = ({ height = 16 }) => <MotiView style={{ height }} />
    return (
        <SafeAreaView style={style.content}>
            {loadingData ?
                <>
                    

                    <View style={style.cartContent}>
                        <View style={style.cartItems}>
                            <Text style={globalStyles.subTitle}>Orden de Compra</Text>
                            <Text style={globalStyles.title}>{orderData.RelationshipName}</Text>
                        </View>
                        <View style={style.cartItems}>
                            <View >
                                <Text style={style.listTitle}>{orderData.StatusDesc}</Text>
                                <Spacer height={6} />
                                <Text style={style.listTitle}>{orderData.BillingStatusDesc}</Text>
                                <Spacer height={6} />
                                <Text style={style.listTitle}>{orderData.LineBasedAuthorizationStatusDesc}</Text>
                            </View>
                        </View>

                        <View style={style.cartItems}>
                            <View style={globalStyles.rowBetween}>
                                <Text style={style.subListTitleText}>Itbis</Text>
                                <Text style={style.listTitleText}> {orderData.TaxAmount}</Text>
                            </View>

                            <Spacer height={5} />
                            <View style={globalStyles.rowBetween}>
                                <Text style={style.subListTitleText}>Total: </Text>
                                <Text style={style.listTitleText}> {orderData.CalculatedTotalAmount}</Text>
                            </View>

                            <Spacer height={10} />
                            <Text style={style.listTitle}>{orderData.TextAmount}</Text>
                        </View>


                    </View>



                    <FlatList
                        data={orderData.Items}
                        renderItem={(item) => <Item data={item} />}
                        keyExtractor={item => item.ID}
                    />
                    <View style={globalStyles.rowBetween}>
                        <CustomButtons title={"Autorizar"} onPress={() => navigation.navigate('Order')} />
                    </View>
                </>
                :
                <View style={style.contentSkeleton}>
                    <Skeleton width={"100%"} colorMode={'ligth'} height={35} />
                    <View style={style.cartContent}>
                        <View style={style.cartItems}>
                            <Spacer height={30} />
                            <Skeleton width={"20%"} colorMode={'ligth'} height={10} />
                        </View>
                        <View style={style.cartItems}>
                            <Spacer height={5} />
                            <Skeleton width={"70%"} colorMode={'ligth'} height={15} />
                        </View>
                        <View style={style.cartItems}>
                            <Spacer height={10} />
                            <Skeleton width={"20%"} colorMode={'ligth'} height={10} />
                        </View>
                        <View style={style.cartItems}>
                            <Spacer height={5} />
                            <Skeleton width={"50%"} colorMode={'ligth'} height={15} />
                        </View>
                        <View style={style.cartItems}>
                            <Spacer height={10} />
                            <Skeleton width={"20%"} colorMode={'ligth'} height={10} />
                        </View>
                        <View style={style.cartItems}>
                            <Spacer height={5} />
                            <Skeleton width={"90%"} colorMode={'ligth'} height={15} />
                        </View>
                        <View style={style.cartItems}>
                            <Spacer height={10} />
                            <Skeleton width={"20%"} colorMode={'ligth'} height={10} />
                        </View>
                        <View style={style.cartItems}>
                            <Spacer height={5} />
                            <Skeleton width={"70%"} colorMode={'ligth'} height={15} />
                        </View>
                    </View>
                </View>
            }
        </SafeAreaView>
    )
}

const style = StyleSheet.create({
    content: {
        justifyContent: 'center',
        flex: 1,
        width: "100%",
    },
    cartContent: {
        paddingVertical: 18,
        margin: 8,
        backgroundColor: Colors.white,
        borderRadius: 12,
    },
    cartItems: {
        paddingHorizontal: 18,
        paddingVertical: 6,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: "center",
        marginTop: 15,
        marginBottom: 0,
        marginHorizontal: 10,
        color: Colors.primary,
    },
    listTitle: {
        fontWeight: "bold",
        fontSize: 12,
        color: Colors.grey,
    },
    listTitleText: {
        color: Colors.secundary,
        fontSize: 18,
        fontWeight: "bold",
    },
    subListTitleText: {
        color: Colors.black,
        fontSize: 18,
        fontWeight: "bold",
    },
    smallLinkText: {
        color: Colors.red,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    regularButton: {
        backgroundColor: Colors.secundary,
        borderRadius: 8,
        padding: 14,
    },
    contentSkeleton: {
        justifyContent: 'center',
        width: "100%",
        padding: 16,
    }

})