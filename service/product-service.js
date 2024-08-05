const ProductModel = require('../models/product-model');
const ApiError = require('../exception/api-error');

class ProductService {
  async createProduct(titleRu, titleMd, descriptionRu, descriptionMd, price, images, count) {
    const items = await ProductModel.findOne({ titleRu });
    if (items) {
      throw ApiError.BadRequest(`Такой товар уже есть`);
    }
    await ProductModel.create({ titleRu, titleMd, descriptionRu, descriptionMd, price, images, count });
    let status = 200;
    return status;
  }
  async getAllProducts() {
    let products = await ProductModel.find();
    return products;
  }

  async getProduct(id) {
    const product = await ProductModel.findOne({ _id: id });
    return product;
  }
  async updateProduct(body) {
    let { titleRu, titleMd, descriptionRu, descriptionMd, price, images, count, id } = body.product;
    console.log(id);
    const updateDoc = {
      $set: {
        titleRu: titleRu,
        titleMd: titleMd,
        descriptionRu: descriptionRu,
        descriptionMd: descriptionMd,
        images: images,
        price: price,
        count: count,
      },
    };
    const options = { returnDocument: 'after' };
    const product = await ProductModel.findOneAndUpdate({ _id: id }, updateDoc, options);
    if (product) {
      return { message: 'Продукт успешно обновлен' };
    } else if (!product) {
      throw ApiError.BadRequest(`Не удалось оновить продукт`);
    } else {
      throw ApiError.BadRequest(`Что-то пошло не так`);
    }
  }
  async removeProduct(id) {
    const response = await ProductModel.findOneAndDelete({ _id: id });
    if (response) {
      return { message: 'Продукт успешно удален' };
    } else if (!response) {
      throw ApiError.BadRequest(`Не удалось удалить продукт`);
    } else {
      throw ApiError.BadRequest(`Что-то пошло не так`);
    }
  }
}

module.exports = new ProductService();
