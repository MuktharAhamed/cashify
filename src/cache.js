import { defaultDataIdFromObject } from '@apollo/client';
import {
  InMemoryCache,
  makeVar,
} from '@apollo/client';
export const CreateCustomerInput = makeVar([]);

export const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        customerCreate: {
          read() {
            return CreateCustomerInput();
          }
        }
      }
    }
  }
});

const cache = new InMemoryCache({
  typePolicies: {
    AllProducts: {
      // Singleton types that have no identifying field can use an empty
      // array for their keyFields.
      keyFields: [],
    },
    
    lineItems: {
      // In most inventory management systems, a single UPC code uniquely
      // identifies any product.
      keyFields: ["upc"],
    },
    Customer: {
      // In some user account systems, names or emails alone do not have to
      // be unique, but the combination of a person's name and email is
      // uniquely identifying.
      keyFields: ["name", "email"],
    },
    Checkout: {
      // If one of the keyFields is an object with fields of its own, you can
      // include those nested keyFields by using a nested array of strings:
      keyFields: ["title", "author", ["name"]],
    },
  },
});


const cache = new InMemoryCache({
  dataIdFromObject(responseObject) {
    switch (responseObject.__typename) {
      case 'Product': return `Product:${responseObject.upc}`;
      case 'Person': return `Person:${responseObject.name}:${responseObject.email}`;
      default: return defaultDataIdFromObject(responseObject);
    }
  }
});

// const ccq = gql`
// mutation customerCreate($input: CustomerCreateInput!) {
//   currentCustomerCreateInput @client @export(as: "input")
//   customerCreate(input: $input) {
//     customer {
//       id
//       email
//       password
//     }
//     customerUserErrors {
//       code
//       field
//       message
//     }
//   }
// }`;

// cache.writeQuery({
//   query: ccq,
//   CustomerInput: {
//     read() {
//       return CreateCustomerInput();
//     }
//   }
// });



