import React, { useEffect, useRef,useState } from 'react'
import {
    View,
    Text,
    SafeAreaView, StyleSheet,
    FlatList,
    TouchableOpacity,
    Alert
} from 'react-native'

import { BottomSheetModal,  BottomSheetModalProvider} from "@gorhom/bottom-sheet";
import { useSelector, useDispatch } from "react-redux"
import * as SecureStore from 'expo-secure-store'
import { Skeleton } from 'moti/skeleton'
import { MotiView } from 'moti';

import { globalStyles } from "../../styles/global";
import { Colors } from '../../constants/Colors';
import { restoreToken } from '../../features/auth/auth'
import CustomButtons from "../../components/CustomButtons";
import BottomModal from '../../components/BottomModal'

export default function QuoteDetails({ route, navigation }) {
    const Authorize = "Authorize";
    const Reject = "Reject";
    const MarkPendingAuthorization = "MarkPendingAuthorization";

    const orderID = route.params.orderID
    const [orderData, setOrderData] = useState([]);
    const [loadingData, setLoadingData] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const bottomSheetModalRef = useRef(null);
    const snapPoints = ["45%","48%"];
    const [justifica, setJustifica] = useState(null);
    const dispatch = useDispatch()

  
    function handlePresentModal() {
      bottomSheetModalRef.current?.present();
      setTimeout(() => {
        setIsOpen(true);
      }, 100);
    }

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

                fetch(`https://api.admcloud.net/api/Quotes/${orderID}?token=${result}`, requestOptions)
                    .then(response => response.json())
                    .then(result => {
                        setOrderData(result.data)
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

    async function UpdateOrderStatus(action) {
        try {
            let result = await SecureStore.getItemAsync('uToken');
  
            if (result !== null) {
                dispatch(restoreToken('uToken'))
                var requestOptions = {
                    method: 'PUT',
                    body: "",
                    redirect: 'follow'
                };
                fetch(`https://api.admcloud.net/api/Quotes/${action}?id=${orderID}&token=${result}`, requestOptions)
                .then(response => response.json())
                .then(result => {
                    Alert.alert(`El Status de esta order a sido actualizada`);
                })
                .catch(error => console.log('error', error));
                
                bottomSheetModalRef.current?.present();
                setTimeout(() => {
                  setIsOpen(false);
                }, 100);
            }
        } catch (error) {
            console.error('any fail.', error);
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
        <BottomSheetModalProvider>
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
                        <CustomButtons title={"Actualizar Cotización"} onPress={() => handlePresentModal() } />
                    </View>
                </>
                :
                <View style={style.contentSkeleton}>
                    <Skeleton width={"100%"} colorMode={'light'} height={35} />
                    <View style={style.cartContent}>
                        <View style={style.cartItems}>
                            <Spacer height={30} />
                            <Skeleton width={"20%"} colorMode={'light'} height={10} />
                        </View>
                        <View style={style.cartItems}>
                            <Spacer height={5} />
                            <Skeleton width={"70%"} colorMode={'light'} height={15} />
                        </View>
                        <View style={style.cartItems}>
                            <Spacer height={10} />
                            <Skeleton width={"20%"} colorMode={'light'} height={10} />
                        </View>
                        <View style={style.cartItems}>
                            <Spacer height={5} />
                            <Skeleton width={"50%"} colorMode={'light'} height={15} />
                        </View>
                        <View style={style.cartItems}>
                            <Spacer height={10} />
                            <Skeleton width={"20%"} colorMode={'light'} height={10} />
                        </View>
                        <View style={style.cartItems}>
                            <Spacer height={5} />
                            <Skeleton width={"90%"} colorMode={'light'} height={15} />
                        </View>
                        <View style={style.cartItems}>
                            <Spacer height={10} />
                            <Skeleton width={"20%"} colorMode={'light'} height={10} />
                        </View>
                        <View style={style.cartItems}>
                            <Spacer height={5} />
                            <Skeleton width={"70%"} colorMode={'light'} height={15} />
                        </View>
                    </View>
                </View>
            }
            <BottomSheetModal
                style={style.modalShadow}
                ref={bottomSheetModalRef}
                index={1}
                snapPoints={snapPoints}
                backgroundStyle={{ borderRadius: 12, backgroundColor:"#eeeeee" }}
                onDismiss={() => setIsOpen(false)}>
                    <View  style={style.bottomSheet} >

                        <TouchableOpacity style={style.btnPrimaryStyle} onPress={() => UpdateOrderStatus(Authorize)}>
                                <Text style={style.btnTextStyle}>Autorizar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={style.btnWarningStyle} onPress={() => UpdateOrderStatus(Reject)}>
                                <Text style={style.btnTextStyle}>Rejectar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={style.btnSecondaryStyle} onPress={() => UpdateOrderStatus(MarkPendingAuthorization)}>
                                <Text style={style.btnTextStyle}>Pendiente Autorización</Text>
                        </TouchableOpacity>
                    </View>
                </BottomSheetModal>
        </SafeAreaView>
        </BottomSheetModalProvider>
    )
}

const style = StyleSheet.create({
    bottomSheet:{
        backgroundColor: "#eee",
        height: '100%',
        paddingTop: 26,
    },
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
        color: Colors.secondary,
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
        backgroundColor: Colors.secondary,
        borderRadius: 8,
        padding: 14,
    },
    contentSkeleton: {
        justifyContent: 'center',
        width: "100%",
        padding: 16,
    },
    btnPrimaryStyle: {
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
        backgroundColor: Colors.primary,
        padding: 12,
        borderRadius: 8,
        width: "auto",
        marginHorizontal: 15,
        marginVertical: 10,
        flexDirection: "row",
    },
    btnSecondaryStyle: {
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
        backgroundColor: Colors.secondary,
        padding: 12,
        borderRadius: 8,
        width: "auto",
        marginHorizontal: 15,
        marginVertical: 10,
        flexDirection: "row",
    },
    btnWarningStyle: {
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
        backgroundColor: Colors.red,
        padding: 12,
        borderRadius: 8,
        width: "auto",
        marginHorizontal: 15,
        marginVertical: 10,
        flexDirection: "row",
    },
    btnTextStyle:{
        color: Colors.white,
        fontWeight: "bold",
        fontSize: 18,
    },
    modalBackgroundColor:{
        backgroundColor: "#eeeeee",
    },  
    modalShadow:{
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.4,
        shadowRadius: 15.65,
        elevation: 2, 
        backgroundColor: "#eeeeee",
    }

})