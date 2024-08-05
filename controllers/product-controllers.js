const productService = require('../service/product-service');
const { default: axios } = require('axios');
class ProductControllers {
  async createProduct(req, res, next) {
    try {
      const { titleRu, titleMd, descriptionRu, descriptionMd, price, images, count } = req.body.product;
      const userData = await productService.createProduct(titleRu, titleMd, descriptionRu, descriptionMd, price, images, count);
      return res.json(userData);
    } catch (e) {
      console.log(e);
      next(e);
    }
  }
  async getProducts(req, res, next) {
    try {
      const products = await productService.getAllProducts();
      return res.json(products);
    } catch (e) {
      console.log(e);
      next(e);
    }
  }
  async getProduct(req, res, next) {
    try {
      const id = req.params.id;
      const product = await productService.getProduct(id);
      return res.json(product);
    } catch (e) {
      console.log(e);
      next(e);
    }
  }
  async updateProduct(req, res, next) {
    try {
      const body = req.body;
      const result = await productService.updateProduct(body);
      return res.json(result);
    } catch (e) {
      console.log(e);
      next(e);
    }
  }
  async removeProduct(req, res, next) {
    try {
      const id = req.params.id;
      const result = await productService.removeProduct(id);
      return res.json(result);
    } catch (e) {
      console.log(e);
      next(e);
    }
  }
  async translateText(req, res, next) {
    try {
      const text = req.body.text;
      const googleTranslateUrl = (from, to, text) =>
        `https://translate.googleapis.com/translate_a/single?client=gtx&dt=t&sl=${from}&tl=${to}&q=${text}`;
      const result = await axios(googleTranslateUrl('ru', 'ro', encodeURI(text)));
      return res.json(result.data[0][0][0]);
    } catch (e) {
      console.log(e);
      next(e);
    }
  }
}
module.exports = new ProductControllers();
