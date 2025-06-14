import mongoose, { model, Schema } from "mongoose";

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  specs: {
    processor: String,
    ram: String,
    storage: String,
    graphicsCard: String,
    screenSize: String,
    resolution: String,
    battery: String,
    os: String,
  },
  images: [String],
  price: {
    type: Number,
    required: true,
  },
  brand: String,
  model: String,
  inStock: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true
});

const Product = model('Product', productSchema);
export default Product;
