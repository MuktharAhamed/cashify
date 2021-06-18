// var Shopify = require('shopify-api-node');

// const client = new Shopify({
//   apiKey: "47ef5a6093bb31daec56a56855670a00",
//   password: "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",
//   shopName: 'dvnikhilraj.myshopify.com'
// });
const client = {};
export default class ProductService {
  static async getAllProducts() {    
    const res = await client.product.list();
    return res;
  }

  static async getProductWithId(id) {
    if(id == null)
        return null;
    const res = await client.product.get(id);
    return res;
  }

  static async getAllCategoriesWithProducts(pageNumber = null)
  {
    if(pageNumber)
    {
      const res = await client.collectionListing.list({ page: pageNumber });
      return res;
    }
    const res = await client.collectionListing.list();
    return res
  }

  static async getProductsInACategory(categoryId)
  {
    const res = await client.collection.products(categoryId);
    return res
  }

  // static async getProductUsingQuery(query)
  // {
  //   ////Make sure query is an object that contains fileds of the object. 
  //   //// Ex : const query = { query:"title:Apple Iphone 12 64 GB" };
  //   //// const query = {    query: "variants:['title:64GB']" };
  //   ////https://shopify.dev/concepts/about-apis/search-syntax
  //   const res = client.product.fetchQuery(query);
  //   return res
  // }
}
