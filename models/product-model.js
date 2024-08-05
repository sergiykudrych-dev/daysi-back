const { Schema, model } = require('mongoose');

const productModel = new Schema({
  titleRu: {
    type: String,
    unique: true,
    required: true,
  },
  titleMd: {
    type: String,
    unique: true,
    required: true,
  },
  descriptionRu: {
    type: String,
    required: true,
  },
  descriptionMd: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  images: {
    type: [String],
  },
  count: {
    type: Number,
    default: 0,
  },
});

module.exports = model('Product', productModel);
