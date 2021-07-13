import {
  NavSplashScreen,
  NavProductDetailPage,
  NavProductListingPage,
} from 'app-constants/Navigations';
import Icon from 'react-native-vector-icons/MaterialIcons';
import React, { useEffect, useState } from 'react';
import {
  FlatList,
  PixelRatio,
  View,
  TouchableOpacity,
  Image,
  Text,
  Dimensions,
} from 'react-native';
import { Button } from 'react-native-paper';
import { Searchbar } from 'react-native-paper';
import Catergories from 'app-views/Home/Categories';
import ByPrice from 'app-views/Home/ByPrice';
import ByGrade from 'app-views/Home/ByGrade';
import ByBrand from 'app-views/Home/ByBrand';
import TodaysDeals from 'app-views/Home/TodaysDeals';
import styles from 'app-views/ProductListing/style';
import style from 'app-views/Home/style';
import { black } from 'react-native-paper/lib/typescript/styles/colors';


import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql,
  HttpLink,
  createHttpLink,
  useMutation
} from '@apollo/client';
import { createCheckout, CheckoutLineAdd } from "../../checkOut";


const screenWidth = Dimensions.get('window').width;

const ProductListing = ({ navigation }) => {
  const ProductsData =
  {
    "data": {
      "shop": {
        "name": "dvNikhilraj",
        "products": {
          "edges": [
            {
              "node": {
                "id": "Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0LzY4MDg5MzU5NTY2MzY=",
                "title": "Apple Iphone 12 64 GB",
                "variants": {
                  "edges": [
                    {
                      "node": {
                        "id": "Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC80MDEzMzcxNDc3MjEyNA==",
                        "title": "646 GB / Black / Grade_A",
                        "priceV2": {
                          "amount": "78000.0"
                        }
                      }
                    },
                    {
                      "node": {
                        "id": "Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC80MDE4MzgxMjkxNTM1Ng==",
                        "title": "256GB / Red / Grade_B",
                        "priceV2": {
                          "amount": "78000.0"
                        }
                      }
                    },
                    {
                      "node": {
                        "id": "Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC80MDE4NDI1MDY2MzA2OA==",
                        "title": "128GB / Blue / A",
                        "priceV2": {
                          "amount": "78000.0"
                        }
                      }
                    }
                  ]
                },
                "images": {
                  "edges": [
                    {
                      "node": {
                        "originalSrc": "https://cdn.shopify.com/s/files/1/0570/9286/6204/products/apple-iPhone-12-10-770x433.jpg?v=1623672111",
                        "src": "https://cdn.shopify.com/s/files/1/0570/9286/6204/products/apple-iPhone-12-10-770x433.jpg?v=1623672111"
                      }
                    }
                  ]
                }
              }
            },
            {
              "node": {
                "id": "Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0LzY4MTUwOTcxNTk4MzY=",
                "title": "iPhone 12 Pro Max",
                "variants": {
                  "edges": [
                    {
                      "node": {
                        "id": "Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC80MDE2MDczMjUxMjQxMg==",
                        "title": "Default Title",
                        "priceV2": {
                          "amount": "78001.0"
                        }
                      }
                    }
                  ]
                },
                "images": {
                  "edges": [
                    {
                      "node": {
                        "originalSrc": "https://cdn.shopify.com/s/files/1/0570/9286/6204/products/mobile2.png?v=1625489352",
                        "src": "https://cdn.shopify.com/s/files/1/0570/9286/6204/products/mobile2.png?v=1625489352"
                      }
                    }
                  ]
                }
              }
            },
            {
              "node": {
                "id": "Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0LzY4MTUwOTcxOTI2MDQ=",
                "title": "iPhone 12 Pro",
                "variants": {
                  "edges": [
                    {
                      "node": {
                        "id": "Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC80MDE2MDczMjU0NTE4MA==",
                        "title": "Default Title",
                        "priceV2": {
                          "amount": "78002.0"
                        }
                      }
                    }
                  ]
                },
                "images": {
                  "edges": [
                    {
                      "node": {
                        "originalSrc": "https://cdn.shopify.com/s/files/1/0570/9286/6204/products/mobile2.png?v=1625489352",
                        "src": "https://cdn.shopify.com/s/files/1/0570/9286/6204/products/mobile2.png?v=1625489352"
                      }
                    }
                  ]
                }
              }
            },
            {
              "node": {
                "id": "Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0LzY4MTUwOTcyMjUzNzI=",
                "title": "iPhone 12",
                "variants": {
                  "edges": [
                    {
                      "node": {
                        "id": "Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC80MDMzNTQ1NDI0MDkyNA==",
                        "title": "64 GB / Black / GRADE A",
                        "priceV2": {
                          "amount": "78003.0"
                        }
                      }
                    },
                    {
                      "node": {
                        "id": "Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC80MDMzNTQ1NDI3MzY5Mg==",
                        "title": "128GB / Blue / GRADE B",
                        "priceV2": {
                          "amount": "78003.0"
                        }
                      }
                    },
                    {
                      "node": {
                        "id": "Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC80MDMzNTQ1NDMwNjQ2MA==",
                        "title": "256GB / Black / GRADE A",
                        "priceV2": {
                          "amount": "78003.0"
                        }
                      }
                    },
                    {
                      "node": {
                        "id": "Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC80MDM1OTM1OTc3NDg3Ng==",
                        "title": "64 GB / Yellow / Grade  B",
                        "priceV2": {
                          "amount": "78003.0"
                        }
                      }
                    },
                    {
                      "node": {
                        "id": "Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC80MDM1OTYzMDkzMDA3Ng==",
                        "title": "64 GB / Black / Grade B",
                        "priceV2": {
                          "amount": "78003.0"
                        }
                      }
                    }
                  ]
                },
                "images": {
                  "edges": [
                    {
                      "node": {
                        "originalSrc": "https://cdn.shopify.com/s/files/1/0570/9286/6204/products/mobile2.png?v=1625489352",
                        "src": "https://cdn.shopify.com/s/files/1/0570/9286/6204/products/mobile2.png?v=1625489352"
                      }
                    }
                  ]
                }
              }
            },
            {
              "node": {
                "id": "Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0LzY4MTUwOTcyNTgxNDA=",
                "title": "iPhone 12 mini",
                "variants": {
                  "edges": [
                    {
                      "node": {
                        "id": "Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC80MDE2MDczMjYxMDcxNg==",
                        "title": "Default Title",
                        "priceV2": {
                          "amount": "78004.0"
                        }
                      }
                    }
                  ]
                },
                "images": {
                  "edges": [
                    {
                      "node": {
                        "originalSrc": "https://cdn.shopify.com/s/files/1/0570/9286/6204/products/mobile2.png?v=1625489352",
                        "src": "https://cdn.shopify.com/s/files/1/0570/9286/6204/products/mobile2.png?v=1625489352"
                      }
                    }
                  ]
                }
              }
            },
            {
              "node": {
                "id": "Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0LzY4MTUwOTczMjM2NzY=",
                "title": "iPhone SE (2nd Gen)",
                "variants": {
                  "edges": [
                    {
                      "node": {
                        "id": "Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC80MDE2MDczMjY3NjI1Mg==",
                        "title": "Default Title",
                        "priceV2": {
                          "amount": "78005.0"
                        }
                      }
                    }
                  ]
                },
                "images": {
                  "edges": [
                    {
                      "node": {
                        "originalSrc": "https://cdn.shopify.com/s/files/1/0570/9286/6204/products/mobile2.png?v=1625489352",
                        "src": "https://cdn.shopify.com/s/files/1/0570/9286/6204/products/mobile2.png?v=1625489352"
                      }
                    }
                  ]
                }
              }
            },
            {
              "node": {
                "id": "Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0LzY4MTUwOTczNTY0NDQ=",
                "title": "iPhone 11",
                "variants": {
                  "edges": [
                    {
                      "node": {
                        "id": "Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC80MDE3MzEyNjQ1MTM1Ng==",
                        "title": "13gb",
                        "priceV2": {
                          "amount": "78006.0"
                        }
                      }
                    }
                  ]
                },
                "images": {
                  "edges": [
                    {
                      "node": {
                        "originalSrc": "https://cdn.shopify.com/s/files/1/0570/9286/6204/products/mobile2.png?v=1625489352",
                        "src": "https://cdn.shopify.com/s/files/1/0570/9286/6204/products/mobile2.png?v=1625489352"
                      }
                    }
                  ]
                }
              }
            },
            {
              "node": {
                "id": "Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0LzY4MTUwOTc0MjE5ODA=",
                "title": "iPhone 11 Pro",
                "variants": {
                  "edges": [
                    {
                      "node": {
                        "id": "Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC80MDE2MDczMjc3NDU1Ng==",
                        "title": "Default Title",
                        "priceV2": {
                          "amount": "78007.0"
                        }
                      }
                    }
                  ]
                },
                "images": {
                  "edges": [
                    {
                      "node": {
                        "originalSrc": "https://cdn.shopify.com/s/files/1/0570/9286/6204/products/mobile2.png?v=1625489352",
                        "src": "https://cdn.shopify.com/s/files/1/0570/9286/6204/products/mobile2.png?v=1625489352"
                      }
                    }
                  ]
                }
              }
            },
            {
              "node": {
                "id": "Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0LzY4MTUwOTc0NTQ3NDg=",
                "title": "iPhone 11 Pro Max",
                "variants": {
                  "edges": [
                    {
                      "node": {
                        "id": "Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC80MDMyMzg1NjQ2NjA3Ng==",
                        "title": "Grade_A",
                        "priceV2": {
                          "amount": "78008.0"
                        }
                      }
                    }
                  ]
                },
                "images": {
                  "edges": [
                    {
                      "node": {
                        "originalSrc": "https://cdn.shopify.com/s/files/1/0570/9286/6204/products/mobile2.png?v=1625489352",
                        "src": "https://cdn.shopify.com/s/files/1/0570/9286/6204/products/mobile2.png?v=1625489352"
                      }
                    }
                  ]
                }
              }
            },
            {
              "node": {
                "id": "Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0LzY4MTUwOTc1MjAyODQ=",
                "title": "iPhone XR",
                "variants": {
                  "edges": [
                    {
                      "node": {
                        "id": "Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC80MDE2MDczMjkwNTYyOA==",
                        "title": "Default Title",
                        "priceV2": {
                          "amount": "78009.0"
                        }
                      }
                    }
                  ]
                },
                "images": {
                  "edges": [
                    {
                      "node": {
                        "originalSrc": "https://cdn.shopify.com/s/files/1/0570/9286/6204/products/mobile2.png?v=1625489352",
                        "src": "https://cdn.shopify.com/s/files/1/0570/9286/6204/products/mobile2.png?v=1625489352"
                      }
                    }
                  ]
                }
              }
            }
          ]
        }
      }
    }
  }
  console.log("ProductsData", ProductsData)
  return (
    <View style={styles.ProductListingContainer}>
      <View
        style={{
          borderTopWidth: 0.5,
          paddingTop: 6,
          paddingBottom: 4,
          flexDirection: 'row',
          margin: 5,

        }}>


        <Text style={{marginHorizontal: 1, fontWeight: 'bold', color: 'black'}}>

          {' '}
          Filters :{' '}
        </Text>
        <Text style={{ ...styles.selectedFilter, paddingHorizontal: 10 }}>
          Grade A
        </Text>
        <Text style={{ marginHorizontal: 1, paddingHorizontal: 10 }}>
          Grade B
        </Text>
        <Text style={{ marginHorizontal: 1, paddingHorizontal: 10 }}>Apple</Text>
        <Text style={{ marginHorizontal: 1, paddingHorizontal: 10 }}>
          Samsung
        </Text>
        <Text style={{ marginHorizontal: 1, paddingHorizontal: 10 }}>Redmi</Text>
      </View>
      <FlatList
        data={ProductsData.data.shop.products.edges}
        keyExtractor={item => item.node.id} //has to be unique
        renderItem={({ item, index }) => <ProductBlock item={item} />} //method to render the data in the way you want using styling u need
        horizontal={false}
        numColumns={2}
      />
    </View>
    // <View style={styles.ProductsSection}>
    //         <ScrollView
    //         style={{
    //             marginBottom: 15,
    //             height: 195,
    //             alignSelf: 'flex-start',
    //         }}>
    //         {productList.map((e, index) => (
    //             <ProductBlock
    //             key={index}
    //             text={e.text}
    //             source={e.source}
    //             price={e.price}
    //             grade={e.grade}
    //             />
    //         ))}
    //         </ScrollView>
    // </View>
  );
};

const ProductBlock = ({ item, index }) => {

  console.log(item);
  console.log(item.text);
  const [gqlAddToCart, { data, error }] = useMutation(createCheckout);
  const [LineItemToCart, { data: setdata }] = useMutation(CheckoutLineAdd);
  const [AddToCartList, setAddToCartList] = useState([]);


  useEffect(() => {
    if (AddToCartList && data.checkout.id) {
      LineItemToCart({
        "lineItems": AddToCartList,
        "checkoutId": data.checkoutId
      }).then((res, rej) => { setAddToCartList([]) })
    }
  }, [data, AddToCartList])


  const addToCart = (item) => {
    let previousData = [...AddToCartList]
    if (AddToCartList) {
      previousData = [...AddToCartList]
    }
    previousData.push({ quantity: 1, variantId: item.node.variants.edges[0].node.title })
    setAddToCartList([...previousData,])
  }

  return (
    <View style={styles.productsContainer}>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          marginVertical: 10,

        }}>

        <View
          style={{
            flex: 5,
            marginLeft: 5,
            alignItems: 'center',
            justifyContent: 'center',

          }}>

          <TouchableOpacity>
            <Image source={item.node.images.edges[0].node.src.source} style={styles.productsImage} />
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1, paddingHorizontal: 5 }}>
          <Icon name={'favorite-border'} size={30} color={'#D3D3D3'} />
        </View>
      </View>
      <View
        style={{
          marginLeft: 5,
          marginTop: 5,
          flex: 1,
        }}>

        <View>
          <Text style={{ ...styles.productsTitle, height: 45 }}>{item.node.title.text + ' ' + item.node.variants.edges[0].node.title}</Text>
          <Text style={styles.gradeText}>{"Grade A"}</Text>
          <Text style={[{ ...styles.productsTitle, color: '#F08080' }]}>
            {item.node.variants.edges[0].node.priceV2.amount}
          </Text>
        </View>
        <View style={{ marginVertical: 15 }}>
          <TouchableOpacity
            underlay
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 5,

            }}
            onPress={() => { addToCart }}>

            <Text color="#1877F2" style={styles.addToCartButton}>
              Add to Cart
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ProductListing;
