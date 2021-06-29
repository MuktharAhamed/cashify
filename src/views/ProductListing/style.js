import {StyleSheet,Dimensions} from 'react-native';
const styles = StyleSheet.create({
    ProductsSection :{
      marginHorizontal : 12,
    },
    selectedFilter :{
      borderRadius: 3,
      backgroundColor: 'white',
      elevation: 2,
      shadowColor: '#000',
      shadowOpacity: 0.4,
      color: '#66cdaa',
      borderColor :'#66cdaa',
      borderWidth : 1,
      marginHorizontal :1,
    },
    productImageContainer:{
      marginLeft: 5, 
      marginTop: 5,
      alignItems :'center',
      justifyContent : 'center'
    },
    productsContainer:{
      marginTop: 2,
      marginLeft: 1,
      width: Dimensions.get('window').width/2,    
      borderColor : "#BCBCBC",
      elevation: 2,
      shadowColor: '#000',
      shadowOffset: {width: 1, height: 1},
      shadowOpacity: 0.4,
      shadowRadius: 3,
      elevation: 5,
      backgroundColor: '#fff',      
    },    
    productsImage: {
      width: 90,
      height: 100,
      borderRadius: 5,
      justifyContent :'center'
    },
    gradeText: {
      color: '#66cdaa',
      fontSize: 14,
      fontWeight: 'bold',
      textAlign: 'left',
      borderWidth: 1,
      alignSelf: 'flex-start',
      paddingHorizontal: 6,
      borderRadius: 3,
      backgroundColor: '#f0f8ff',
      elevation: 2,
      shadowColor: '#000',
      shadowOpacity: 0.4,
      shadowRadius: 3,
      marginHorizontal : 5,
      marginVertical : 5,
      borderColor: 'lightgrey',
      backgroundColor : 'white'
    },
    addToCartButton:{
      width : 190,
      borderColor : '#1E90FF',
      fontSize : 14,
      fontWeight : '700',
      marginRight : 5,
      backgroundColor : '#ffff',
      borderWidth : 1,
      textAlign : "center",
      paddingHorizontal  : 10,
      paddingVertical : 5,
      borderRadius : 5,
      marginVertical : 5,
      color : '#1E90FF',
      height : 30,
    },
    productsTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      textAlign: 'left',
      color: 'black',
      paddingBottom:4,
      marginHorizontal :5,
  },
  ProductListingContainer :{
    backgroundColor : "#ffffff",
  }
});  
export default styles;