import { StyleSheet } from "react-native";

import { Colors } from "./Colors";

export const globalStyles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: Colors.light,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 0,
    marginHorizontal: 10,
    color: Colors.primary,
  },
  subTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  touchList: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    marginBottom: 8,
    marginHorizontal: 10,
    paddingHorizontal: 10,
    paddingVertical: 12,
  },
  contentSkeleton: {
    width: "100%",
    margin: 10,
    justifyContent: 'center',
    alignContent: 'center',
  },
  contentList: {
    borderBottomColor: Colors.secondary,
    borderBottomWidth: 1,
    marginBottom: 5,
    marginLeft: 10,
    marginRight: 10,
    paddingBottom: 5,
    width: "95%",
  },
  listTitle: {
    fontWeight: "bold",
    fontSize: 26,
    color: Colors.blueLight,
    margin: 10,
  },
  listTitleText: {
    color: Colors.secondary,
    fontWeight: "bold",
  },
  listContentText: {
    color: Colors.primary,
    fontWeight: "bold",
  },
  listsTotals: {
    fontWeight: "bold",
    fontSize: 18,
    color: Colors.blueLight
  },
  lisLabel: {
    fontWeight: "bold",
    fontSize: 12,
    color: Colors.grey,
  },
  img: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 25,
  },
  row: {
    width: "100%",
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  row5: {

    flexDirection: 'row',
    flexWrap: 'wrap',
  },

  rowBetween: {
    width: "100%",
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  }
})

export const salesResume = StyleSheet.create({
  salesReportContent: {
    width: "100%",
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  contentSkeleton: {
    width: "100%",
    margin: 10,
    justifyContent: 'center',
    alignContent: 'center',
  },
  contentList: {
    backgroundColor: Colors.light,
    padding: 10,
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,
    flexDirection: 'column',
    borderRadius: 12,
    width: "44%",
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
  listTotals: {
    fontWeight: "bold",
  },
})