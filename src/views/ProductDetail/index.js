import {useNavigation} from '@react-navigation/core';
import {NavHome} from 'app-constants/Navigations';
import React, {useState,useEffect} from 'react';
import ProductService from '../../utils/ProductService'
import {Modal,Image,SafeAreaView, Dimensions,ScrollView, View, TouchableOpacity, LayoutAnimation, Text, TextInput,UIManager} from 'react-native';
import Icon from "react-native-vector-icons/MaterialIcons";
import {Button} from 'react-native-paper';
import RelatedProducts from './relatedProducts'
import Slider from 'app-components/Slider/Slider';
import styles from 'app-views/ProductDetail/style';
// import ImageViewer from 'react-native-image-zoom-viewer';
import ImageZoom from 'react-native-image-pan-zoom';
// import ImageView from  "react-native-image-viewing";
const ProductDetail = ({route, navigation}) => {
////https://www.npmjs.com/package/react-native-image-zoom-viewer
  const zoomImages = [
    {
      props: {
      // Or you can set source directory.
      source: require('app-assets/mob/mobile1.jpg')
      }
    }
  ];
  const DefaultExpandState = {
          SIZE : false,
          COLOR : false,
          GRADE : false
      }
  const product = {
    title : 'Realme X 128 GB Grade D',
    grade : {
      grade  : 'A',
      color : `#42c8b7`,
    },
    price : '₹6,110',
    source: require('app-assets/mob/mobile1.jpg'),

  };
  const RamAttribute= [
    {
      isSelected : false,
      title :"16 GB"
    },
    {
      isSelected : true,
      title :"8 GB"
    }
  ];

  const ColorAttribute= [
    {
      isSelected : true,
      title :"Black"
    }
  ];

  const Gradeattribute = [
    {
      isSelected : true,
      title :"Grade A"
    },
    {
      isSelected : false,
      title :"Grade C"
    },
    {
      isSelected : false,
      title :"Grade B"
    }
  ];
  
  const allAttributes = [
    {
      title : "SIZE",
      availableOptions : RamAttribute
    },
    {
      title : "COLOR",
      availableOptions : ColorAttribute
    },
    {
      title : "GRADE",
      availableOptions : Gradeattribute
    },
  ]
  const { productId } = route.params;
  // const [product,setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([{}]);
  const [zoomProductImage, setZoomProductImage] = useState(false);
  const [qtyValue, setQtyInputText] = useState('1');
  const [selectedVariant, setSelectedVariant] = useState({});
  const[expandedState, setExpandedState] = useState(DefaultExpandState);

  const  toggleExpand = (groupName) =>{
    console.log("groupName");
    console.log(groupName);
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedState((prev)=>{
      var newState = { ...prev };
      newState[groupName] = !prev[groupName];
      return newState;
    })
  }

  const quantityTextHandler = (e) => {
    setQtyInputText(e.replace(/[^0-9]/g, ''));
  }

  const increaseQtyHandler = () =>{
    
    setQtyInputText(prevState =>{
      var qty = parseInt(prevState);
      qty +=1;
     return  qty.toString()
    });
  }

  const decreaseQtyHandler = () =>{
    setQtyInputText(prevState =>{
      var qty = parseInt(prevState);
      qty -=1;
     return  qty.toString()
    });
  }
  // useEffect(async () => {
  //   // check if the user is logged in
  //   // if logged in then navigate to home
  //   // navigation.navigate(NavHome);
  //   // else to login page
  //   // navigation.navigate(NavLogin);
  //   // var product = await ProductService.getProductWithId(productId);
  //   // console.log(product.images[0].src);
  //   // setProduct(product);
    
  //   setExpandedState({
  //       SIZE : false,
  //       COLOR : false,
  //       GRADE : false
  //   });
  //   setRelatedProducts();
  //   if (Platform.OS === 'android') {
  //     UIManager.setLayoutAnimationEnabledExperimental(true);
  // }
  // }, [productId]);
  const closeButton =  <Text style={{flex:6,color:"#ffff"}} onPress={() => {
    setZoomProductImage(false)}}>X</Text>;
  const zoomProductImageHandler = () => {
    console.log("Hit");
    setZoomProductImage(prev=> !prev);
  }
//   return(
//     <ZoomImage uri={product.source}/>
//   );
// };
  return (
    <>
    <View style={styles.container}>
          <ScrollView>
          <ProductBlock handler={zoomProductImageHandler} imgUrl={product.source} title={product.title} grade={product.grade} price={product.price}/>
          {/* <ImageView
              images={zoomImages}
              imageIndex={0}
              visible={zoomProductImage}
              onRequestClose={() => setZoomProductImage(false)}
              // renderFooter={(currentImage) =>   (<View><Text>My footer</Text></View>)}
          /> */}
          {/* <Modal
          animationType="slide"
          visible={zoomProductImage}
          onRequestClose={() => {
            setZoomProductImage(false);
          }}><ZoomImage uri={product.source}/></Modal> */}
          {/* <ImageView images={zoomImages} imageIndex={0} visible={zoomProductImage} onRequestClose={() => setZoomProductImage(false)} />; */}
          <Modal  animationType="slide"
          visible={zoomProductImage}
          swipeDirection="down"
          onSwipeComplete={(e) => { console.log("Swipy"); setZoomProductImage(false); }}
          onRequestClose={() => {
            setZoomProductImage(false)}}>
                {/*  */}
                <ImageZoom cropWidth={Dimensions.get('window').width}
                       cropHeight={Dimensions.get('window').height}
                       onSwipeDown={(e) => { console.log("Swipy22"); setZoomProductImage(false); }}
                       enableSwipeDown={true}
                       swipeDownThreshold = {100}
                       pinchToZoom={true} 
                       imageWidth={200}
                       imageHeight={200}>
                <Image  source={product.source}/>
                </ImageZoom>
           
            </Modal>
          <View>
            <Text style ={styles.SelectAttrText}>Select Attributes</Text>
          </View>
          <View>
          {
            allAttributes.map((attr,ind)=>{
            return(
            <View key={ind+attr.title}>
                <TouchableOpacity style={styles.accordionRow} onPress={()=>toggleExpand(attr.title)}>
                    <Text style={styles.accordionTitle}>{attr.title}</Text>
                    <Icon name={expandedState[attr.title] ? 'keyboard-arrow-up' : 'keyboard-arrow-down'} size={30} color={'#A9A9A9'} />
                </TouchableOpacity>
                <View style={styles.accordionParentHr}>
                {
                    expandedState[attr.title] &&
                    attr.availableOptions.map((opt,i)=>
                      {
                        return(
                        <View key={i+opt.title} style={styles.accordionChild}>
                          <View style={{flexDirection : 'row',borderColor : opt.isSelected?"#0000CD":"#fff",...styles.attributesContainer,...styles.boxShadw}}>
                            <Text>{opt.title}</Text>    
                          </View>
                        </View>
                        )
                      })
                }
                </View>
            </View>
            )
            })}
          </View>
          <View style={styles.horizontalLine}/>
          
          <View style={styles.qtySection}>
            <View style={styles.qtyTextContainer}>
                <Text style={styles.SelectQtyText}>Select Quantity</Text>
            </View>
            <View style={styles.InputContainer}>
                <TouchableOpacity disabled={qtyValue == 0} onPress={decreaseQtyHandler}>
                  <Icon style={styles.qtyInputIcons} name ="remove" size={20}/>
                </TouchableOpacity>
                <TextInput 
                  underlineColorAndroid="transparent" 
                  keyboardType={'numeric'} 
                  style={{...styles.qtyInput}} 
                  onChangeText={quantityTextHandler}
                  value = {qtyValue}/>
                <TouchableOpacity onPress={increaseQtyHandler}>
                <Icon style={styles.qtyInputIcons} name="add" size={20}/>
                </TouchableOpacity>
            </View>
          </View>
          <View style={styles.InformationSection}>
            <View style={{flex:5}}>
              <Text style={styles.InformationTitle}>Check the sample images for your reference</Text>
              <Text style={styles.InformationContent}>
                Please note that these images are not the exact replica of this device, they are just a representation of the physical condition.
              </Text>
            </View>
            <View style={{flex:1}}>
              <Icon name="arrow-right" size={20} color="black" type="entypo" />
            </View>
          </View>
          <View>
          </View>
          <RelatedProducts/>
          <View style={{...styles.InformationSection, marginVertical : 5, marginHorizontal :10}}>
            <View style={{flex:5}}>
              <Text style={styles.InformationTitle}>Check out our grading process</Text>
              <Text style={styles.InformationContent}>
                Description on how the products looks like
              </Text>
            </View>
            <View style={{flex:1}}>
              <Icon name="arrow-right" size={20} color="black" type="entypo" />
            </View>
          </View>
      </ScrollView>
    
    </View>
      <View style={styles.StaticFooterContainer}>
      <View style={styles.StaticFooter}>
        <TouchableOpacity underlay style={{flex : 3}}>
          <Button color='#1877F2' style={styles.addToCartButton}>Add to Cart</Button>
        </TouchableOpacity>
        <TouchableOpacity style={{flex : 3}}>
          <Button color='#ffff' style={styles.buyButton}>Buy now</Button>
        </TouchableOpacity>
        </View>
      </View>
      </>
  );
};

const ProductBlock = ({handler,imgUrl,title, grade, price}) => {
  return(
    <View style={{ 
      ...styles.boxShadw,
      flex: 1, 
      flexDirection : 'row',
      marginHorizontal : 10,
      marginVertical : 5,
      }}>
        <View style={{flex: 2}}>
          <TouchableOpacity onPress={handler}>
            <Image  style={styles.prod_img} source={imgUrl}/>
            </TouchableOpacity>
        </View>
        <View style={{flex: 3}}>
            <Text style={{fontWeight : 'bold', fontSize : 15, marginTop : 10}}>{title}</Text>
            <Text style={{
              ...styles.bygradetext,
              color : grade.color
            }}>{'Grade '+grade.grade}</Text>
            <Text style={styles.priceText}>{price}</Text>
        </View>
        <View style={{flex: 1}}>
          <Icon style={{marginTop : 10}} name={'favorite-border'} size={30} color={'#A9A9A9'} />
        </View>
    </View>
  );
};

export default ProductDetail;

