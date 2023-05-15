import { StyleSheet } from "react-native";

import { Colors } from "../constants/Colors";

export const globalStyles = StyleSheet.create({
    screenContainer:{
        flex: 1,
        backgroundColor: Colors.ligth,
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
    secundaryTitle:{
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
          borderBottomColor: Colors.secundary,
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
          color: Colors.Blueligth,
          margin:10,
      },
      listTitleText:{
          color:Colors.secundary,
          fontWeight:"bold",
      },
      listContentText:{
        color:Colors.primary,
        fontWeight:"bold",
      },
      lisstTotals:{
          fontWeight:"bold",
          fontSize: 18,
          color: Colors.Blueligth
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
      pendingLabelContainer:{
        borderRadius: 8,
        padding:5,
        backgroundColor: Colors.orange,
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
      }
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
        backgroundColor: Colors.ligth,
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
        color: Colors.secundary,
        fontWeight: "bold",
      },
      
      lisstTotals: {
        fontWeight: "bold",
      },
})