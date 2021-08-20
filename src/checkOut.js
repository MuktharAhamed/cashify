import gql from 'graphql-tag';

export const CheckoutLineAdd = gql`
  mutation checkoutLineItemsAdd(
    $lineItems: [CheckoutLineItemInput!]!
    $checkoutId: ID!
  ) {
    checkoutLineItemsAdd(lineItems: $lineItems, checkoutId: $checkoutId) {
      checkout {
        id
      }
      checkoutUserErrors {
        code
        field
        message
      }
    }
  }
`;

export const CheckoutCreate = gql`
  mutation checkoutCreate($input: CheckoutCreateInput!) {
    checkoutCreate(input: $input) {
      checkout {
        id
      }
      checkoutUserErrors {
        code
        field
        message
      }
      queueToken
    }
  }
`;

const CheckoutFragment = gql`
  fragment CheckoutFragment on Checkout {
    id
    webUrl
    totalTax
    subtotalPrice
    totalPrice
    lineItems(first: 100) {
      edges {
        node {
          id
          title
          variant {
            id
            title
            # image {
            #   src
            # }
            price
          }
          quantity
        }
      }
    }
  }
`;
export const TokenizedPayV3 = gql`
  mutation checkoutCompleteWithTokenizedPaymentV3(
    $checkoutId: ID!
    $payment: TokenizedPaymentInputV3!
  ) {
    checkoutCompleteWithTokenizedPaymentV3(
      checkoutId: $checkoutId
      payment: $payment
    ) {
      checkout {
        id
      }
      checkoutUserErrors {
        code
        field
        message
      }
      payment {
        id
      }
    }
  }
`;
export const ShippingAddressUpdate = gql`
  mutation checkoutShippingAddressUpdateV2(
    $shippingAddress: MailingAddressInput!
    $checkoutId: ID!
  ) {
    checkoutShippingAddressUpdateV2(
      shippingAddress: $shippingAddress
      checkoutId: $checkoutId
    ) {
      checkout {
        id
      }
      checkoutUserErrors {
        code
        field
        message
      }
    }
  }
`;
export const DiscountApply = gql`
  mutation checkoutDiscountCodeApplyV2(
    $discountCode: String!
    $checkoutId: ID!
  ) {
    checkoutDiscountCodeApplyV2(
      discountCode: $discountCode
      checkoutId: $checkoutId
    ) {
      checkout {
        id
      }
      checkoutUserErrors {
        code
        field
        message
      }
    }
  }
`;
export const lastIncompleteCheckout = gql`
  query myQuery($input: String!) {
    customer(customerAccessToken: $input) {
      lastIncompleteCheckout {
        id
        lineItems(first: 20) {
          edges {
            node {
              id
              quantity
              title
              variant {
                id
                title
                currentlyNotInStock
                priceV2 {
                  amount
                }
                availableForSale
                quantityAvailable
              }
            }
          }
        }
        lineItemsSubtotalPrice {
          amount
          currencyCode
        }
      }
    }
  }
`;
export const CustomerAddress = gql`
  query CustomerAddress($input: String!) {
    customer(customerAccessToken: $input) {
      addresses(first: 10) {
        edges {
          node {
            address1
            address2
            city
            company
            country
            firstName
            lastName
            phone
            province
            zip
            id
          }
        }
      }
      defaultAddress {
        id
      }
    }
  }
`;

export const createCheckout = gql`
  mutation checkoutCreate($input: CheckoutCreateInput!) {
    checkoutCreate(input: $input) {
      userErrors {
        message
        field
      }
      checkout {
        ...CheckoutFragment
      }
    }
  }
  ${CheckoutFragment}
`;

export const checkoutLineItemsAdd = gql`
  mutation checkoutLineItemsAdd(
    $checkoutId: ID!
    $lineItems: [CheckoutLineItemInput!]!
  ) {
    checkoutLineItemsAdd(checkoutId: $checkoutId, lineItems: $lineItems) {
      userErrors {
        message
        field
      }
      checkout {
        ...CheckoutFragment
      }
    }
  }
  ${CheckoutFragment}
`;

export const checkoutLineItemsUpdate = gql`
  mutation checkoutLineItemsUpdate(
    $checkoutId: ID!
    $lineItems: [CheckoutLineItemUpdateInput!]!
  ) {
    checkoutLineItemsUpdate(checkoutId: $checkoutId, lineItems: $lineItems) {
      userErrors {
        message
        field
      }
      checkout {
        ...CheckoutFragment
      }
    }
  }
  ${CheckoutFragment}
`;

export const checkoutLineItemsRemove = gql`
  mutation checkoutLineItemsRemove($checkoutId: ID!, $lineItemIds: [ID!]!) {
    checkoutLineItemsRemove(
      checkoutId: $checkoutId
      lineItemIds: $lineItemIds
    ) {
      userErrors {
        message
        field
      }
      checkout {
        ...CheckoutFragment
      }
    }
  }
  ${CheckoutFragment}
`;

export const checkoutCustomerAssociate = gql`
  mutation checkoutCustomerAssociateV2(
    $checkoutId: ID!
    $customerAccessToken: String!
  ) {
    checkoutCustomerAssociateV2(
      checkoutId: $checkoutId
      customerAccessToken: $customerAccessToken
    ) {
      checkout {
        ...CheckoutFragment
      }
      checkoutUserErrors {
        code
        field
        message
      }
      customer {
        id
      }
    }
  }

  ${CheckoutFragment}
`;

export function addVariantToCart(variantId, quantity) {
  this.props
    .checkoutLineItemsAdd({
      variables: {
        checkoutId: this.state.checkout.id,
        lineItems: [{variantId, quantity: parseInt(quantity, 10)}],
      },
    })
    .then(res => {
      this.setState({
        checkout: res.data.checkoutLineItemsAdd.checkout,
      });
    });

  this.handleCartOpen();
}

export function updateLineItemInCart(lineItemId, quantity) {
  this.props
    .checkoutLineItemsUpdate({
      variables: {
        checkoutId: this.state.checkout.id,
        lineItems: [{id: lineItemId, quantity: parseInt(quantity, 10)}],
      },
    })
    .then(res => {
      this.setState({
        checkout: res.data.checkoutLineItemsUpdate.checkout,
      });
    });
}

export function removeLineItemInCart(lineItemId) {
  this.props
    .checkoutLineItemsRemove({
      variables: {
        checkoutId: this.state.checkout.id,
        lineItemIds: [lineItemId],
      },
    })
    .then(res => {
      this.setState({
        checkout: res.data.checkoutLineItemsRemove.checkout,
      });
    });
}

export function associateCustomerCheckout(customerAccessToken) {
  this.props
    .checkoutCustomerAssociate({
      variables: {
        checkoutId: this.state.checkout.id,
        customerAccessToken: customerAccessToken,
      },
    })
    .then(res => {
      this.setState({
        checkout: res.data.checkoutCustomerAssociate.checkout,
        isCustomerAuthOpen: false,
      });
    });
}
