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
      paddingLeft: 5,
      paddingRight:1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 5,
      borderRadius: 10,
      borderWidth: 1,
      padding: 10,
    },
    zoneText: {
      fontSize: 18,
      fontWeight: "bold",
      marginBottom: 10,
    },

    input: {
      width: "90%",
      height: 50,
      marginTop:20,
      borderRadius: 10,
      borderWidth: 1,
      padding: 10,
    },
    buttonBox: {
      width: "80%",
      marginTop: 20,
      marginBottom: 10,
      flexDirection: 'row',
      justifyContent: "space-between",
      alignItems: "center",
    }
  });