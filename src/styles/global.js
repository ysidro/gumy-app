import { StyleSheet } from "react-native";

import { Colors } from "../constants/Colors";

export const globalStyles = StyleSheet.create({
  content: {
    justifyContent: 'center',
    marginTop: 15,
    width: "100%",
},
    screenContainer:{
        flex: 1,
        backgroundColor: Colors.light,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title:{
        fontSize: 28,
        fontWeight: 'bold',
        marginTop:10,
        marginBottom:0,
        marginHorizontal:10,
        color: Colors.primary,
    },
    subTitle:{
        fontSize: 16,
        
        fontWeight: 'bold',
        color: Colors.primary,
    },
    SecondaryTitle:{
      fontSize: 16,
      marginHorizontal:10,
      fontWeight: 'bold',
      color: Colors.primary,
  },
    touchList:{
        backgroundColor: Colors.white,
        borderRadius:12,
        marginBottom:8,
        marginHorizontal:10,
        paddingHorizontal:10,
        paddingVertical:12,
    },
    contentSkeleton:{
        width:"100%",
        margin:10,
        justifyContent: 'center',
        alignContent: 'center',
      },
      constentList:{
          borderBottomColor: Colors.secondary,
          borderBottomWidth:1,
          marginBottom:5,
          marginLeft:10,
          marginRight:10,
          paddingBottom:5,
          width:"95%",
      },
      listTitle:{
          fontWeight:"bold",
          fontSize:26,
          color: Colors.Bluebright,
          margin:10,
      },
      listTitleText:{
          color:Colors.secondary,
          fontWeight:"bold",
      },
      listContentText:{
        color:Colors.primary,
        fontWeight:"bold",
      },
      lisstTotals:{
          fontWeight:"bold",
          fontSize: 18,
          color: Colors.Bluebright
      },
      lisLabel: {
        fontWeight: "bold",
        fontSize: 12,
        color: Colors.grey,
      },
      authorizedLabel: {
        fontWeight: "bold",
        fontSize: 12,
        color: Colors.white,
      },
      pendingLabel: {
        fontWeight: "bold",
        fontSize: 12,
        color: Colors.white,
        
      },
      authorizedLabelContainer:{
        borderRadius: 8,
        backgroundColor: Colors.green,
        padding:5,
      },
      rejectedLabelContainer:{
        borderRadius: 8,
        backgroundColor: Colors.red,
        padding:5,
      },
      pendingLabelContainer:{
        borderRadius: 8,
        padding:5,
        backgroundColor: Colors.orange,
      },
      defaultLabelContainer:{
        borderRadius: 8,
        padding:5,
        backgroundColor: Colors.primary,
      },
    img: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom:25,
      },
      row:{
        width: "100%",
        flexDirection: 'row',
        flexWrap: 'wrap',
      },
      row5:{
        
        flexDirection: 'row',
        flexWrap: 'wrap',
      },

      rowBetween:{
        width: "100%",
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
      },
      itemDeliveryContainer: {
        display: "flex",
        justifyContent: "flex-start",
        alignContent: "center",
        flexWrap: "nowrap",
        flexDirection: "row",
    },
    itemDeliveryBtnContainer: {
        display: "flex",
        justifyContent: "center",
        width: "100%",
        alignContent: "center",
        flexWrap: "nowrap",
        flexDirection: "row",
    },
    btnWarning:{
      display: "flex",
      justifyContent: "center",
      alignContent: "center",
      backgroundColor: Colors.white,
      padding: 12,
      borderRadius: 8,
      marginHorizontal: 10,
      marginVertical: 5,
      flexDirection: "row",
      color: "#ffffff",
      borderColor: Colors.primary,
      borderWidth:1,
    },
      btnSecondaryStyle: {
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
        backgroundColor: Colors.secondary,
        padding: 12,
        borderRadius: 8,
        width: "100%",
        marginVertical: 15,
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
      backgroundColor: Colors.grey,
      padding: 12,
      borderRadius: 8,
      width: "100%",
      marginVertical: 10,
      flexDirection: "row",
      color: "#dddddd"
  },
})

export const salesResume = StyleSheet.create({
    salesRerportcontent: {
        width: "100%",
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 30,
      },
      contentSkeleton: {
        width: "100%",
        margin: 10,
        justifyContent: 'center',
        alignContent: 'center',
      },
      constentList: {
        backgroundColor: Colors.light,
        padding: 10,
        marginBottom: 10,
        marginLeft: 10,
        marginRight: 10,
        flexDirection: 'column',
        borderRadius: 12,
        width:"43%",
      },
      listTitle: {
        fontWeight: "bold",
        fontSize: 26,
        margin: 10,
      },
      listTitleText: {
        color: Colors.primary,
        fontWeight: "bold",
      },
      listSubTitleText: {
        color: Colors.secondary,
        fontWeight: "bold",
      },
      
      lisstTotals: {
        fontWeight: "bold",
      },
})

export const searchStyle = StyleSheet.create({

  dropdown2BtnStyle: {
      width: '95%',
      height: 45,
      justifyContent: 'flex-start',
      margin: 10,
      padding: 5,
      backgroundColor: Colors.light,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: Colors.primary,
      
      zIndex: 100,
    },
    viewContainer: { marginHorizontal: 16, zIndex: 1 },
    androidContainer: {
      minHeight: 500,
      marginBottom: -428,
    },

    BtnTxtStyle: {
      textAlign: 'center',
      fontWeight: 'bold',
      
    },
    dropdown2DropdownStyle: {
      backgroundColor: '#fff',
      borderBottomLeftRadius: 12,
      borderBottomRightRadius: 12,
      borderTopLeftRadius: 12,
      borderTopRightRadius: 12,
    },
    dropdown2RowStyle: {
      backgroundColor: '#fff', 
      borderBottomColor: '#C5C5C5'},
    dropdown2RowTxtStyle: {
      textAlign: 'center',
      fontWeight: 'bold',
      color: "#fff",
    },
    dropdown3searchInputStyleStyle: {
      backgroundColor: Colors.primary,
      borderBottomWidth: 1,
      color: "#fff",
      borderBottomColor: '#FFF',
    },
    dropdown3RowChildStyle: {
      flex: 1,
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      alignItems: 'flex-start',
      paddingHorizontal: 8,
    },
    dropdown3RowTxt: {
      color: Colors.primary,
      textAlign: 'left',
      fontWeight: 'bold',
      fontSize: 14,
      marginHorizontal: 12,
      width: "100%",
    },
    dropdown3BtnChildStyle: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 0,
    },
    dropdown3BtnTxt: {
      textAlign: 'left',
      fontWeight: 'bold',
      fontSize: 14,
      marginHorizontal: 0,
    },

})