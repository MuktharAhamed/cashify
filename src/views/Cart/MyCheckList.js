import React, { useEffect } from 'react';
import {
  ScrollView,
  View,
  TouchableOpacity,
  Image,
  Text,
  CreateStyle,
  StyleSheet,
  FlatList
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CartList from './CartList'

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql,
  HttpLink,
  createHttpLink,
  makeVar
} from '@apollo/client';

import { useTheme } from '@react-navigation/native';
import style from 'app-views/Cart/style';
import ToggleIncrementButton from '../../components/ToggleIncrementButton'
import { useState } from 'react/cjs/react.development';
import { color } from 'react-native-reanimated';
// import gql from 'graphql-tag';


const query = gql`
  query query {
    shop {
      name
      description
      products(first: 20) {
        edges {
          node {
            id
            title
            metafield(
              key: "related_products"
              namespace: "Products_metafields"
            ) {
              namespace
              value
            }
          }
        }
      }
    }
  }
`;
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

const productList = ProductsData?.data?.shop?.products?.edges



const Cart = () => {

  return (
    <>
      <View style={{ backgroundColor: "#f8f6f6", flexDirection: "column" }}>
        <FlatList
          data={productList}
          keyExtractor={item => item.id} //has to be unique
          renderItem={({ item, index }) =>
            <CartList item={item}
              index={index}
            />} //method to render the data in the way you want using styling u need
          horizontal={false}
        />
        <View style={{ ...style.productsContainer, flexDirection: "row",justifyContent:"space-between", height: 55 }}>
          <View style={{ flexDirection: "row",}}>
            <Icon name={'card-giftcard'} size={28} color={'green'} style={{ paddingLeft: 10, alignSelf: "center" }} />
            <Text style={{ fontSize: 18, paddingLeft: 10, alignSelf: "center" }}>Add Coupen Code</Text>
          </View>
          <TouchableOpacity style={{height:55,top:5}}>
            <Text style={{ fontSize: 16, paddingRight: 20, alignSelf: "center", color:"green" }}>Apply</Text>
          </TouchableOpacity>
        </View>

        <View style={{ ...style.productsContainer, height: 50 }}></View>
      </View>
    </>
  );
};

export default Cart;