import AccordionOptions from './AccordionOptions';
// color: `#42c8b7`,
import base64 from 'base-64';
import utf8 from 'utf8';
import {gql, useMutation, useLazyQuery, useQuery} from '@apollo/client';
import {
  GraphqlAdminApi,
  GraphqlStoreFrontApi,
} from 'app-constants/GraphqlConstants';
import {useNavigation} from '@react-navigation/core';
import {NavHome} from 'app-constants/Navigations';
import React, {useState, useEffect} from 'react';
import ProductService from '../../utils/ProductService';
import {
  Modal,
  Image,
  SafeAreaView,
  Dimensions,
  ScrollView,
  View,
  TouchableOpacity,
  LayoutAnimation,
  Text,
  TextInput,
  UIManager,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Button} from 'react-native-paper';
import RelatedProducts from './relatedProducts';
import Slider from 'app-components/Slider/Slider';
import styles from 'app-views/ProductDetail/style';
// import ImageViewer from 'react-native-image-zoom-viewer';
import ImageZoom from 'react-native-image-pan-zoom';
import {color} from 'react-native-reanimated';
// import ImageView from  "react-native-image-viewing";
const ProductDetail = props => {
  ////https://www.npmjs.com/package/react-native-image-zoom-viewer
  const zoomImages = [
    {
      props: {
        // Or you can set source directory.
        source: require('app-assets/mob/mobile1.jpg'),
      },
    },
  ];
  const DefaultExpandState = {
    SIZE: false,
    COLOR: false,
    GRADE: false,
  };
  const product = {
    title: 'Realme X 128 GB Grade D',
    grade: {
      grade: 'A',
    },
    price: '₹6,110',
    source: require('app-assets/mob/mobile1.jpg'),
  };
  const RamAttribute = [
    {
      isSelected: false,
      title: '16 GB',
    },
    {
      isSelected: true,
      title: '8 GB',
    },
  ];

  const ColorAttribute = [
    {
      isSelected: true,
      title: 'Black',
    },
  ];

  const Gradeattribute = [
    {
      isSelected: true,
      title: 'Grade A',
    },
    {
      isSelected: false,
      title: 'Grade C',
    },
    {
      isSelected: false,
      title: 'Grade B',
    },
  ];

  const allAttributes = [
    {
      title: 'SIZE',
      availableOptions: RamAttribute,
    },
    {
      title: 'COLOR',
      availableOptions: ColorAttribute,
    },
    {
      title: 'GRADE',
      availableOptions: Gradeattribute,
    },
  ];
  // const {productId} = route.params;
  // const [product,setProduct] = useState({});
  const getProductQuery = gql`
    query getProductQuery($input: ID!) {
      product(id: $input) {
        description
        id
        title
        images(first: 1) {
          edges {
            node {
              id
              originalSrc
            }
          }
        }
        metafields(first: 10) {
          edges {
            node {
              key
              id
              value
            }
          }
        }
        variants(first: 10) {
          edges {
            node {
              id
              title
              price
              inventoryQuantity
              selectedOptions {
                value
                name
              }
            }
          }
        }
      }
    }
  `;
  // const [
  //   getProductByQuery,
  //   {loading: productLaoding, error: productError, data: productData},
  // ] = useLazyQuery(getProductQuery);
  const {loading, error, data} = useQuery(getProductQuery, {
    context: GraphqlAdminApi,
    variables: {
      input: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0LzY4MTUwOTcyMjUzNzI=',
    },
  });
  // console.log(data);
  const defaultProd = {
    imgUrl: {
      id: '',
      imgSrc: '',
    },
    productTitle: '',
    productId: '',
  };

  // const availableOption = [
  //   {
  //     isSelected: false,
  //     title: '',
  //   },
  // ],

  // const allAvailableOptions = [
  //   {
  //     title: 'SIZE',
  //     availableOptions: availableOption,
  //   },
  //   {
  //     title: 'COLOR',
  //     availableOptions: availableOption,
  //   },
  //   {
  //     title: 'GRADE',
  //     availableOptions: availableOption,
  //   },
  // ];
  const [currentProduct, setSeletctedProduct] = useState(defaultProd);
  const [relatedProducts, setRelatedProducts] = useState([{}]);
  const [allSizes, setSizeOptions] = useState([]);
  const [allColors, setColorOptions] = useState([]);
  const [allGrades, setGradeOptions] = useState([]);
  const [availableVariants, setAllAvailableVariants] = useState([]);
  const [zoomProductImage, setZoomProductImage] = useState(false);
  const [qtyValue, setQtyInputText] = useState('1');
  const [selectedVariant, setSelectedVariant] = useState({});
  const [expandedState, setExpandedState] = useState(DefaultExpandState);
  const [isProductFetched, setIsProductFetched] = useState(false);

  const toggleExpand = groupName => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedState(prev => {
      var newState = {...prev};
      newState[groupName] = !prev[groupName];
      return newState;
    });
  };

  const quantityTextHandler = e => {
    setQtyInputText(e.replace(/[^0-9]/g, ''));
  };

  const increaseQtyHandler = () => {
    setQtyInputText(prevState => {
      var qty = parseInt(prevState);
      qty += 1;
      return qty.toString();
    });
  };

  const decreaseQtyHandler = () => {
    setQtyInputText(prevState => {
      var qty = parseInt(prevState);
      qty -= 1;
      return qty.toString();
    });
  };

  // const groupBy = (objectArray, property) => {
  //   return objectArray.reduce((acc, obj) => {
  //     const key = obj[property];
  //     if (!acc[key]) {
  //       acc[key] = [];
  //     }
  //     // Add object to list for given key's value
  //     acc[key].push(obj);
  //     return acc;
  //   }, {});
  // };
  const unique = (array, prop) => {
    const keyValueArray = array.map(entry => [entry[prop], entry]);
    const map = new Map(keyValueArray);
    return Array.from(map.values());
  };

  useEffect(() => {
    // console.log('Hite');
    if (!loading && data != null) {
      if (error) {
        // console.log(error);
      } else {
        const prodDetails = {};
        if (data.product.images.edges.length > 0) {
          const imageData = {
            id: data.product.images.edges[0].node.id,
            imgSrc: data.product.images.edges[0].node.originalSrc,
          };
          prodDetails.imgUrl = imageData;
        }
        prodDetails.productTitle = data.product.title;
        prodDetails.productId = data.product.id;
        setSeletctedProduct(prodDetails);
        console.log('data.product');
        const allVariants = [];
        data.product.variants.edges.forEach(x => {
          console.log(x);
          console.log(x.node.inventoryQuantity);
          // if (x.node.inventoryQuantity > 0) {
          const utf8Bytes = utf8.encode(x.node.id);
          console.log('title');
          allVariants.push({
            id: base64.encode(utf8Bytes),
            title: x.node.title,
            price: x.node.price,
            // selectedOption: x.node.selectedOptions,
            grade: x.node.selectedOptions.find(
              x => x.name.toLowerCase() == 'grade',
            )?.value,
            color: x.node.selectedOptions.find(
              x => x.name.toLowerCase() == 'color',
            )?.value,
            size: x.node.selectedOptions.find(
              x => x.name.toLowerCase() == 'size',
            )?.value,
          });
          // }
        });
        console.log('allVariants');
        // console.log();
        var currentSelectedVariant;
        if (props.routeParams?.VariantId) {
          console.log('asdfffffffasdfasdfas');
          currentSelectedVariant = allVariants.find(
            x =>
              x.id ==
              'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC80MDMzNTQ1NDI0MDkyNA==',
          );
        } else {
          console.log('111asdfffffffasdfasdfas');
          currentSelectedVariant = allVariants[0];
          // await setSelectedVariant(allVariants[0]);
        }
        setSelectedVariant(currentSelectedVariant);
        // const allAvailableOptions = [
        //   {
        //     title: 'SIZE',
        //     availableOptions: availableOption,
        //   },
        //   {
        //     title: 'COLOR',
        //     availableOptions: availableOption,
        //   },
        //   {
        //     title: 'GRADE',
        //     availableOptions: availableOption,
        //   },
        // ];

        console.log('allVariants[0].selectedOption');
        const gradeAvailableOptions = [];

        // console.log(allVariants);
        // console.dir(allVariants);
        // console.log(JSON.stringify(allVariants, null, 4));
        // var allAvailableVariants = allVariants
        //   .map(o => {
        //     // console.log(o);
        //     // console.log('o');
        //     return o.selectedOption.map(a => {
        //       return {
        //         id: o.id,
        //         ...a,
        //       };
        //     });
        //   })
        //   .flat();
        // console.log('users');
        // console.log('allVariants');

        setAllAvailableVariants(allVariants);
        console.log('all');
        console.log(JSON.stringify(allVariants, null, 4));
        var size = allVariants.map(s => {
          return {
            // id: s.id,
            isSelected: currentSelectedVariant.size == s.size,
            value: s.size,
          };
        });
        console.log('size');
        console.log(size);
        setSizeOptions(unique(size, 'value'));

        // var sizeIds = size.map(a => a.id);
        console.log(
          '//// Filter by selected size and selected color (with values not ID',
        );
        console.log(selectedVariant.title);
        var colors = [...allVariants]
          .filter(
            a =>
              a.size.replace(/\s/g, '').toLowerCase() ==
              currentSelectedVariant.size.replace(/\s/g, '').toLowerCase(),
          )
          .map(s => {
            return {
              // id: s.id,
              isSelected: currentSelectedVariant.color == s.color,
              value: s.color,
            };
          });
        setColorOptions(unique(colors, 'value'));
        console.log(colors);
        var grade = [...allVariants]
          .filter(
            a =>
              a.size.replace(/\s/g, '').toLowerCase() ==
                currentSelectedVariant.size.replace(/\s/g, '').toLowerCase() &&
              a.color.replace(/\s/g, '').toLowerCase() ==
                currentSelectedVariant.color.replace(/\s/g, '').toLowerCase(),
          )
          .map(s => {
            return {
              // id: s.id,
              isSelected: currentSelectedVariant.grade == s.grade,
              value: s.grade,
            };
          });
        setGradeOptions(unique(grade, 'value'));
        // allVariants.forEach(x => {
        //   // var arr = groupBy(x.selectedOption, 'name');
        //   // const groupByBrand = groupBy('value', x.selectedOption);
        //   // console.log("groupByBrand");
        //   console.log('x.selectedOption');
        //   console.log(x.selectedOption.length);
        //   // x.selectedOption.forEach(a => {
        //   //   console.log('currentValue');
        //   var size = x.selectedOption.map(siz => {
        //     if (siz.name.toLowerCase() == 'size') {
        //       return {
        //         isSelected: false,
        //         title: siz.value,
        //       };
        //     }
        //   });
        //   console.log('size');
        //   console.log(size);
        //   //   // console.log(groupByBrand);
        //   // });
        //   // console.log('arr');
        //   // console.log(arr);
        //   // var flattened = [].concat.apply([], x.selectedOption);
        //   // // var currentSelectedOption = x.selectedOption.map(a => {
        //   // //   if (a.name.toLowerCase() == 'size') {
        //   // //     return a.value;
        //   // //   }
        //   // // });
        //   // console.log('currentSelectedOption');
        //   // console.log(flattened);
        // });
        // console.log(data.product.variants.edges[1].node);
        setIsProductFetched(true);
        // console.log('productError');
      }

      // console.log(error);
    }
  }, [loading]);

  // useEffect(async () => {
  //   var input = {
  //     input: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0LzY4MTUwOTcxOTI2MDQ=',
  //   };
  //   getProductByQuery({
  //     context: GraphqlAdminApi,
  //     variables: input,
  //   });
  //   // if (!loading && data != null) {
  //   //   console.log('datas');
  //   //   console.log(data);
  //   // }
  // }, []);
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
  const closeButton = (
    <Text
      style={{flex: 6, color: '#ffff'}}
      onPress={() => {
        setZoomProductImage(false);
      }}
    >
      X
    </Text>
  );
  const zoomProductImageHandler = () => {
    setZoomProductImage(prev => !prev);
  };

  const changeVariantHandler = (color, size, grade) => {
    if ((color, size, grade)) {
      var currentVariant = availableVariants.find(
        a => a.color == color && a.size == a.size && a.grade == a.grade,
      );
      setSelectedVariant(currentVariant);
      {
      }
    }
  };
  //   return(
  //     <ZoomImage uri={product.source}/>
  //   );
  // };
  return (
    <>
      {isProductFetched && (
        <>
          <View style={styles.container}>
            <ScrollView>
              <ProductBlock
                handler={zoomProductImageHandler}
                imgUrl={currentProduct.imgUrl.imgSrc}
                title={
                  currentProduct.productTitle + ' - ' + selectedVariant.title
                }
                grade={selectedVariant.grade}
                price={selectedVariant.price}
              />
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
              <Modal
                animationType="slide"
                visible={zoomProductImage}
                swipeDirection="down"
                onSwipeComplete={e => {
                  setZoomProductImage(false);
                }}
                onRequestClose={() => {
                  setZoomProductImage(false);
                }}
              >
                {/*  */}
                <ImageZoom
                  cropWidth={Dimensions.get('window').width}
                  cropHeight={Dimensions.get('window').height}
                  onSwipeDown={e => {
                    setZoomProductImage(false);
                  }}
                  enableSwipeDown={true}
                  swipeDownThreshold={100}
                  pinchToZoom={true}
                  imageWidth={200}
                  imageHeight={200}
                >
                  {/* <Text onPress={() => setZoomProductImage(false)}>X</Text> */}
                  <Image
                    style={{width: 200, height: 200}}
                    source={{
                      uri: currentProduct.imgUrl.imgSrc,
                    }}
                  />
                </ImageZoom>
              </Modal>
              <View>
                <Text style={styles.SelectAttrText}>Available Options</Text>
              </View>
              <View>
                <AccordionOptions
                  title={'SIZE'}
                  toggleExpand={toggleExpand}
                  expandedState={expandedState}
                  availableOptions={allSizes}
                  changeVariant={changeVariantHandler}
                />
                <AccordionOptions
                  title={'COLOR'}
                  toggleExpand={toggleExpand}
                  expandedState={expandedState}
                  availableOptions={allColors}
                  changeVariant={changeVariantHandler}
                />
                <AccordionOptions
                  title={'GRADE'}
                  toggleExpand={toggleExpand}
                  expandedState={expandedState}
                  availableOptions={allGrades}
                  changeVariant={changeVariantHandler}
                />
                {/* {allAttributes.map((attr, ind) => {
                  return (
                    <View key={ind + attr.title}>
                      <TouchableOpacity
                        style={styles.accordionRow}
                        onPress={() => toggleExpand(attr.title)}
                      >
                        <Text style={styles.accordionTitle}>{attr.title}</Text>
                        <Icon
                          name={
                            expandedState[attr.title]
                              ? 'keyboard-arrow-up'
                              : 'keyboard-arrow-down'
                          }
                          size={30}
                          color={'#A9A9A9'}
                        />
                      </TouchableOpacity>
                      <View style={styles.accordionParentHr}>
                        {expandedState[attr.title] &&
                          attr.availableOptions.map((opt, i) => {
                            return (
                              <View
                                key={i + opt.title}
                                style={styles.accordionChild}
                              >
                                <View
                                  style={{
                                    flexDirection: 'row',
                                    borderColor: opt.isSelected
                                      ? '#0000CD'
                                      : '#fff',
                                    ...styles.attributesContainer,
                                    ...styles.boxShadw,
                                  }}
                                >
                                  <Text>{opt.title}</Text>
                                </View>
                              </View>
                            );
                          })}
                      </View>
                    </View>
                  );
                })} */}
              </View>
              <View style={styles.horizontalLine} />

              <View style={styles.qtySection}>
                <View style={styles.qtyTextContainer}>
                  <Text style={styles.SelectQtyText}>Select Quantity</Text>
                </View>
                <View style={styles.InputContainer}>
                  <TouchableOpacity
                    disabled={qtyValue == 0}
                    onPress={decreaseQtyHandler}
                  >
                    <Icon
                      style={styles.qtyInputIcons}
                      name="remove"
                      size={20}
                    />
                  </TouchableOpacity>
                  <TextInput
                    underlineColorAndroid="transparent"
                    keyboardType={'numeric'}
                    style={{...styles.qtyInput}}
                    onChangeText={quantityTextHandler}
                    value={qtyValue}
                  />
                  <TouchableOpacity onPress={increaseQtyHandler}>
                    <Icon style={styles.qtyInputIcons} name="add" size={20} />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.InformationSection}>
                <View style={{flex: 5}}>
                  <Text style={styles.InformationTitle}>
                    Check the sample images for your reference
                  </Text>
                  <Text style={styles.InformationContent}>
                    Please note that these images are not the exact replica of
                    this device, they are just a representation of the physical
                    condition.
                  </Text>
                </View>
                <View style={{flex: 1}}>
                  <Icon
                    name="arrow-right"
                    size={20}
                    color="black"
                    type="entypo"
                  />
                </View>
              </View>
              <View></View>
              <RelatedProducts />
              <View
                style={{
                  ...styles.InformationSection,
                  marginVertical: 5,
                  marginHorizontal: 10,
                }}
              >
                <View style={{flex: 5}}>
                  <Text style={styles.InformationTitle}>
                    Check out our grading process
                  </Text>
                  <Text style={styles.InformationContent}>
                    Description on how the products looks like
                  </Text>
                </View>
                <View style={{flex: 1}}>
                  <Icon
                    name="arrow-right"
                    size={20}
                    color="black"
                    type="entypo"
                  />
                </View>
              </View>
            </ScrollView>
          </View>
          <View style={styles.StaticFooterContainer}>
            <View style={styles.StaticFooter}>
              <TouchableOpacity underlay style={{flex: 3}}>
                <Button color="#1877F2" style={styles.addToCartButton}>
                  Add to Cart
                </Button>
              </TouchableOpacity>
              <TouchableOpacity style={{flex: 3}}>
                <Button color="#ffff" style={styles.buyButton}>
                  Buy now
                </Button>
              </TouchableOpacity>
            </View>
          </View>
        </>
      )}
    </>
  );
};

const ProductBlock = ({handler, imgUrl, title, grade, price}) => {
  console.log('imgUrl111134');
  console.log(imgUrl);
  return (
    <View
      style={{
        ...styles.boxShadw,
        flex: 1,
        flexDirection: 'row',
        marginHorizontal: 10,
        marginVertical: 5,
      }}
    >
      <View style={{flex: 2}}>
        <TouchableOpacity onPress={handler}>
          <Image
            style={styles.prod_img}
            source={{
              uri: imgUrl,
            }}
          />
        </TouchableOpacity>
      </View>
      <View style={{flex: 3}}>
        <Text style={{fontWeight: 'bold', fontSize: 17, marginTop: 10}}>
          {title.toUpperCase()}
        </Text>
        <Text
          style={{
            ...styles.bygradetext,
            color: '#42c8b7',
          }}
        >
          {grade}
        </Text>
        <Text style={styles.priceText}>{'₹ ' + price}</Text>
      </View>
      <View style={{flex: 1}}>
        <Icon
          style={{marginTop: 10}}
          name={'favorite-border'}
          size={30}
          color={'#A9A9A9'}
        />
      </View>
    </View>
  );
};

export default ProductDetail;
