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



