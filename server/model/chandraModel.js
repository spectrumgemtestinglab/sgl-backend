
// chandraModel.js
import { Schema, model } from 'mongoose';

const chandraSchema = Schema({
  images: [{ type: String, required: true }],
  name: { type: String, required: true },
  price: { type: Number, required: true },
});

const Chandra = model('Chandra', chandraSchema);

export default Chandra;
