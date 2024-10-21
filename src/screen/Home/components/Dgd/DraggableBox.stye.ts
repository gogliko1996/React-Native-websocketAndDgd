import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    dropZone: {
      width: "80%",
      minHeight: 150,
      marginVertical: 20,
      paddingBottom: 5,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#f2f2f2",
      borderRadius: 10,
      borderColor: "#000",
      borderWidth: 1,
    },
    box: {
      width: "90%",
      zIndex: 100,
      height: 50,
      marginTop: 5,
      marginBottom: 5,
    //   backgroundColor: "blue",
      borderRadius: 5,
    },
    zoneText: {
      fontSize: 18,
      fontWeight: "bold",
      marginBottom: 10,
    },
  });