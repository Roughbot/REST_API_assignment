import mongoose from 'mongoose';


const productSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  name: { type: String, required: true }
});


const catalogSchema = new mongoose.Schema({
  seller: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  products: [productSchema],
});

const Catalog = mongoose.model('Catalog', catalogSchema);

export default Catalog;
