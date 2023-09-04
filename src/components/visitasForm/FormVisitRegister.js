import { View, Text, SafeAreaView, StyleSheet, Alert } from "react-native";
import * as React from "react";
import Constants from "expo-constants";
import Checkbox from "expo-checkbox";
import { useSelector, useDispatch } from "react-redux"

import { db } from "../../firebaseConfig"
import { doc, setDoc,addDoc,collection } from 'firebase/firestore';

import CustomDropDown from "../../components/CustomDropDown";
import CustomButtons from "../../components/CustomButtons";
import CustomInput from "../../components/CustomInputs";
import ListCustomers from "../../components/ListCustomers";

import { globalStyles } from "../../styles/global";
import { Colors } from "../../constants/Colors";

export default function FormVisitRegister({setUpdateScreen})
{

  const {  id } = useSelector(state => state.user)
    const noVenta = [
      { ID: "Venta concretada", Name: "Venta concretada" },  
      { ID: "Completo de Inventario", Name: "Completo de Inventario" },
        { ID: "Precio Elevado", Name: "Precio Elevado" },
        { ID: "Fata de Crédito", Name: "Fata de Crédito" },
        { ID: "Compra a Competencia", Name: "Compra a Competencia" },
        { ID: "Encargado Ausente", Name: "Encargado Ausente" },
        { ID: "Falta de Stock Gumi", Name: "Falta de Stock Gumi" },
        { ID: "Producto no disponible", Name: "Producto no disponible" },
        
        { ID: "Otras Razones", Name: "Otras Razones" },
      ];
      const [dataVisita, setDataVisita] = React.useState({
        vendedor_id: id,
        date: new Date(Date.now()).toLocaleDateString("es-ES"),
        customerData: [],
        comments: "",
        sale: true,
        saleJustification: "",
      });

      const [validState, setValidState] = React.useState(0);
    
      const [isChecked, setChecked] = React.useState(true);
    
      function handleInputsChange(value, index) {
       
        const newState = { ...dataVisita };
        let newValidate = [];
        newState[index] = value;
 
        setDataVisita(newState);

      }

      function handleSaveVisita()
      {
        let allValidate = true;
        if(dataVisita.saleJustification === ""){
          allValidate = false;
        }

        if(!dataVisita.comments){
          allValidate = false;
        }

        if(!dataVisita.saleJustification){
          allValidate = false;
        }

        if(allValidate){
          registerUser();
        }else{
          Alert.alert("Aun faltan campos por llenar")
        }
      }
    

      async function registerUser() {
        try {
          
         //const user = { name: name, email: email, rolle:role, token:token, adm_token:admToken};
    
         const newUserRef =  await addDoc(collection(db, 'visitas'), dataVisita);
         if(newUserRef){
          setDataVisita({
            vendedor_id: id,
            date: new Date(Date.now()).toLocaleDateString("es-ES"),
            customerData: [],
            comments: "",
            sale: true,
            saleJustification: "",
          })
          Alert.alert("Visita Completada")
          setUpdateScreen(true)
         }
          
      
          console.log('User registered:', newUserRef.id);
        } catch (error) {
          console.error('Error registering user:', error);
        }
      }
    

      return (
        <SafeAreaView style={style.content}>
          <View style={{ marginHorizontal: 5, marginBottom: 15, width: "98%" }}>
            <Text style={{ marginLeft: 5, fontWeight: "bold" }}>
              Fecha: {dataVisita.date}
            </Text>
          </View>
  
          <View style={{ marginHorizontal: 5, width: "98%" }}>
            <Text style={{ marginLeft: 5 }}>Cliente</Text>
            <ListCustomers
              value={dataVisita.customerData}
              onChange={(value) => handleInputsChange(value, "customerData")}
              label={"Cliente"}
              tokenID={Constants.expoConfig.extra.AMD_TOKEN}
            />
          </View>
    
          <View style={{ marginEnd: 15, marginLeft: 1 }}>
            <Text style={{ marginEnd: 15, marginLeft: 15 }}>
              Comentario Vendedor
            </Text>
            <CustomInput
              label={"Comentario Vendedor"}
              value={dataVisita.comments}
              typeTextArea ={true}
              onChangeText={(value) => handleInputsChange(value, "comments")}
            />
          </View>
    
          <View style={{ margin: 12, width: "100%" }}>
            <Text style={{ marginBottom: 10 }}>Venta</Text>
            <View style={globalStyles.row}>
              <Checkbox
                value={dataVisita.sale}
                onValueChange={()=> handleInputsChange(!dataVisita.sale, "sale")}
                color={isChecked ? Colors.primary : undefined}
              />
    
              <Text style={{ marginLeft: 10 }}>Si / No</Text>
            </View>
          </View>
          <View style={[{ marginHorizontal: 15, width: "90%" }]}>
            <Text>Razon de No venta</Text>
            <CustomDropDown
              data={noVenta}
              label={"Razon de No venta"}
              value={dataVisita.saleJustification}
              onChangeSelect={(value)=> handleInputsChange(value, "saleJustification")}
            />
          </View>
    
          <View style={{ marginHorizontal: 5, width: "98%" }}>
            <CustomButtons title={"Guardar Registro"} onPress={() => handleSaveVisita()} />
          </View>
        </SafeAreaView>
      );
}

const style = StyleSheet.create({
  content: {
    justifyContent: "center",
    marginTop: 15,
    width: "100%",
  },
  customStyle: {
    height: 300,
  },
});
