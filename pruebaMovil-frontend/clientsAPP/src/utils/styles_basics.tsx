import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
    },
    card: {
      backgroundColor: '#99c2ff',
      borderRadius: 8,
      padding: 12,
      marginBottom: 8,
      marginHorizontal: 10,
    },  
    Title: {
      fontSize: 28,
      fontWeight: 'bold',
      marginVertical: 15,
      marginBottom: 20,
      marginLeft:28,
      color: 'black',
      
    },
    cardTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 4,
    },
    cardText: {
      fontSize: 16,
      marginBottom: 2,
    },
    
    cardFooter: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    addButton: {
      backgroundColor: '#007bff',
      paddingVertical: 8,
      borderRadius: 8,
      alignItems: 'center',
      marginBottom: 16,
      width: 160,
      marginStart:100,
    },
    addButtonLabel: {
      color: 'white',
      fontSize: 16,
      fontWeight: 'bold',
    },
    
    switchLabel: {
      
    },
   
    modalContainer: {
      flex: 1,
      padding: 16,
      backgroundColor: '#8CABFF',
      alignItems: 'stretch',
    },
    modalContent: {
      backgroundColor: '#512B81',
      padding: 20,
      borderRadius: 10,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    modalHeader:{
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems:'center',
      backgroundColor: '#4477CE',
      fontSize: 15,
    },
    modalTitle: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
      color: 'white',
    },
    modalText: {
      fontSize: 16,
      marginBottom: 2,
      color: 'white',
    },

    closeModelButton: {
      backgroundColor: '#4477CE',
      borderRadius: 8,
      marginBottom: 16,
      width: 60,
      alignItems: 'center',
      marginEnd:10,
      marginTop:8, 
    
    },
    input: {
      width: '80%',
      height: 40,
      borderColor: 'gray',
      borderWidth: 1,
      marginBottom: 10,
      paddingLeft: 10,
      color: 'white',
    },

  })

 

  export {
    styles
    
  }