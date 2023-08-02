import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, FlatList, Alert } from 'react-native'
import * as React from 'react'
import { db } from '../../firebaseConfig';
import { collection, addDoc, setDoc, doc, updateDoc, getDocs } from 'firebase/firestore';
import { Colors } from '../../constants/Colors';
import { globalStyles } from '../../styles/global'
import CustomButtons from '../../components/CustomButtons'
export default function Admin({navigation}) {

  const [listUsers, setListUsers] = React.useState([])

  React.useEffect(() => {
    getAllUsersFormDatabase()
},[])

  async function getAllUsersFormDatabase() {
    try {
        const userRef = collection(db, 'users')
        const snapshot = await getDocs(userRef);
        const users = [];
        let itsAssigned = true;

        snapshot.forEach((doc) => {
            users.push({ id: doc.id, ...doc.data() });
        });

   
        setListUsers(users);
    

    } catch (err) {
        console.error('any fail.', err)
    }
}

const Item = ({ data }) => {
  //if(validateOrderDelivery(data.item.task)){
  return (<View key={data.index} style={styles.itemDelivery}>
      <TouchableOpacity style={ styles.itemDeliveryContainer} onPress={ null } >
        
          <View style={styles.itemDeliveryDetail}>
              <Text style={styles.labelName}>{data.item.name ? data.item.name : "No Name"}</Text>
              <Text  style={styles.labelEmail}>{data.item.email}</Text>
          </View>
      </TouchableOpacity>
  </View>)
// }
};
  return (
    <SafeAreaView style={globalStyles.content}>
  
    
        <View>
        <FlatList
                            data={listUsers}
                            renderItem={(item) => <Item data={item} />}
                        />
          <CustomButtons title='Crear Usuario' onPress={() => navigation.navigate('RegisterNewUser') } />
          </View>
 
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  content: {
      justifyContent: 'center',
      marginTop: 15,
      width: "100%",
  },
  btnTextStyle: {
      color: 'white',
      textAlign: 'center',
      fontWeight: 'bold',
      marginHorizontal: 5,
      paddingTop: 5,
  },
  btnIconStyle: { },
  labelName:{
      fontWeight: 300,
      fontSize: 22,
      color: Colors.primary
  },
  labelEmail:{
      fontWeight: 'bold',
      fontSize: 10,
      color:"#000000"
  },
  itemDelivery: {
      backgroundColor: 'white',
      width: "94.5%",
      borderRadius: 8,
      padding: 10,
      marginBottom: 10,
      marginLeft:10,
      marginRight:10,
  },
  itemDeliveryContainer: {
      display: "flex",
      justifyContent: "start",
      alignContent: "center",
      flexWrap: "nowrap",
      flexDirection: "row",
  },
  itemDeliveryDetail: {
      marginLeft: 10,
  },
  btnSecondaryStyle: {
      display: "flex",
      justifyContent: "center",
      alignContent: "center",
      backgroundColor: Colors.secondary,
      padding: 12,
      borderRadius: 8,
      width: "100%",
      marginVertical: 10,
      flexDirection: "row",
      color: "#ffffff"
  },

  btnPrimaryStyle: {
      display: "flex",
      justifyContent: "center",
      alignContent: "center",
      backgroundColor: Colors.primary,
      padding: 12,
      borderRadius: 8,
      width: "100%",
      marginVertical: 10,
      flexDirection: "row",
      color: "#ffffff"
  },

  btnPrimaryStyleNull: {
      display: "flex",
      justifyContent: "center",
      alignContent: "center",
      backgroundColor: Colors.Bluelight ,
      padding: 12,
      borderRadius: 8,
      width: "100%",
      marginVertical: 10,
      flexDirection: "row",
      color: "#dddddd"
  },
  title: {
      textAlign: "center",
      fontSize: 22,
      fontWeight: "bold",
      color: Colors.primary,
      marginBottom: 10,
  },
  subTitle: {
      textAlign: "center",
      fontSize: 22,
      fontWeight: "light",
      color: "#000000",
  },
  modalContentContainer: {
      backgroundColor: '#ffffff',
      width: '100%',
      height: "100%",
      paddingHorizontal: 20,
      paddingVertical: 20,

  },
  rowBetween: {
      width: "100%",
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
  }

})