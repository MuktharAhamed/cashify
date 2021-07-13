import {StyleSheet,Dimensions} from 'react-native';
const {height} = Dimensions.get("screen");
const height_logo = height * 0.7 * 0.4;
const styles = StyleSheet.create({
    container : {
        flex : 1,
        backgroundColor : '#05375a',
    },
    header : {
        flex : 3,
        justifyContent : 'center',
        alignItems : 'center'
    },
    footer : {
        flex : 1,
        backgroundColor : 'white',
        borderTopLeftRadius : 30,
        borderTopRightRadius : 30,
        paddingVertical : 50,
        paddingHorizontal : 30,
    },
    logo :{ 
        width : height_logo,
        height : height_logo,
    },
    title : {
        color : '#05375a',
        fontWeight : 'bold',
        fontSize : 30,
    },
    text :{
        color : 'grey',
        marginTop : 5,
    },
    button : {
        alignItems : 'flex-end',
        marginTop : 30,
    },
    signIn : {
        width:200,
        height:50,
        justifyContent : 'center',
        alignItems:'center',
        borderRadius : 50,
        flexDirection : 'row',        
    },
    textSign:{
        color : 'white',
        fontWeight : 'bold'
    }   
});  
export default styles;