import {StyleSheet} from 'react-native';
const styles = StyleSheet.create({
    container:{
      flex:1,
      backgroundColor: '#ffff',
    },
    accordionTitle:{
        fontSize: 13,
        fontWeight:'bold',
        color : '#000000'
    },
    accordionRow:{
        marginHorizontal : 12,
        flexDirection: 'row',
        justifyContent:'space-between',
        height:40,
        paddingHorizontal : 10,
        alignItems:'center',
        // borderWidth : 1,
        
        borderColor: 'lightgrey',
        borderRadius: 3,
    },
    SelectAttrText:{
        marginVertical : 10,
        marginHorizontal : 12,
        fontSize : 14,
    },
    prod_img:{
        width:150,
        height:150,
        alignSelf: 'flex-start',
    },
    bygradetext: {
        fontSize: 12,
        fontWeight: 'bold',
        marginLeft : 0,
        marginVertical : 15,
        borderWidth: 1,
        borderRadius: 3,
        shadowColor: '#000',
        shadowOpacity: 0.4,
        shadowRadius: 3,
        width : 60,
        height:20,
        textAlign:'center',
        borderColor: 'lightgrey',
        alignSelf: 'flex-start',
    },
    priceText :{
        fontSize: 17,
        fontWeight: 'bold',
        color : '#B22222'
    },
    boxShadw :{
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: {width: 1, height: 1},
        shadowOpacity: 0.4,
        shadowRadius: 3,
        elevation: 5,
        backgroundColor: '#fff',
    },
    accordionChild : {
        marginHorizontal : 5,
        borderColor: 'lightgrey',
        borderRadius: 3,
        flexDirection : 'row',
        height : 50,
    },
    attributesContainer : {
        width : 70,
        height : 45,
        marginHorizontal : 5,
        borderWidth: 1,
    },
    accordionParentHr :{
        marginHorizontal : 12,
        flexDirection : 'row'
    },
    qtyInput: {
        borderWidth: 1,
        width:90,
        height: 35,
        fontSize: 14,
        paddingVertical: 0,
        color : 'black',
        marginHorizontal : 15,
        marginTop: 5,
        borderColor :'#D3D3D3',
        textAlign : 'center',
        fontWeight :'bold',
        fontSize : 16,
        backgroundColor : 'white'
        
         // <- line height should be corresponding to your font size
      },
 
      qtyTextContainer:{
        flex : 3,
        paddingHorizontal : 12,        
      },
      horizontalLine: {
        borderBottomColor: '#D3D3D3',
        marginHorizontal : 12,
        paddingBottom : 10, 
        borderBottomWidth: 1,
      },
      InputContainer :{
          flex : 3, 
          flexDirection : 'row',
          alignItems:'center'
    },
    SelectQtyText:{
        fontSize : 16
    },
    qtySection:{
        marginTop : 10, 
        flexDirection : 'row',
        alignItems:'center'
    },
    qtyInputIcons:{
      color: 'black',
    },
    InformationSection : {
        flexDirection : 'row',
        marginHorizontal : 20,
        marginVertical : 10,
        padding : 8,
        alignItems: 'center',
        borderRadius: 5,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: {width: 1, height: 1},
        shadowOpacity: 0.4,
        shadowRadius: 3,
        elevation: 5,
        backgroundColor: '#fff',
    },
    RelatedProductsSection :{
      marginHorizontal : 12,
    },
    relatedProductsImage: {
        width: 90,
        height: 100,
        borderRadius: 5,
      },
      gradeText: {
        color: '#66cdaa',
        fontSize: 12,
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
        borderColor: 'lightgrey',
      },
      relatedProductsTitle: {
        fontSize: 12,
        fontWeight: 'bold',
        textAlign: 'left',
        color: 'black',
        paddingVertical:4,
      },
      relatedProductContainer:{
        marginRight: 15,
        marginTop: 2,
        marginLeft: 1,
        width: 130,
        height: 185,
        justifyContent: 'center',
        alignItems: 'flex-start',
        borderRadius: 5,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: {width: 1, height: 1},
        shadowOpacity: 0.4,
        shadowRadius: 3,
        elevation: 5,
        backgroundColor: '#fff',
      },
      InformationContent :{
        color: '#BCBCBC',
        padding : 5
      },
      InformationTitle :{
        padding : 5,
        textDecorationLine : 'underline',
        color : '#1877F2'
        // textd/
      },
      addToCartButton:{
        height : 45,
        borderColor : '#1877F2',
        backgroundColor : '#ffff',
        borderWidth : 1,
        textAlign : "center",
        borderRadius : 5,
        marginLeft : 5,
        borderTopRightRadius : 0,
        borderBottomRightRadius : 0,
      },
      buyButton :{
        height : 45,
        backgroundColor : '#1877F2',
        borderWidth : 1,
        textAlign : "center",
        borderRadius : 5,
        borderTopLeftRadius : 0,
        borderBottomLeftRadius : 0,
        marginRight : 5,
        borderColor : '#1877F2',
      },
  StaticFooter:{
    flexDirection : 'row',
    backgroundColor : "white",
    // height : 40,
    marginHorizontal : 10,
    marginVertical : 5,
    alignItems : 'center'
  },
  StaticFooterContainer : {
      backgroundColor : 'white',
    //   marginBottom : 10, 
      
      // borderRadius : 5,
      borderWidth : 1,
      borderColor : "white",
        // marginBottom : 15,
    }
  });  
export default styles;