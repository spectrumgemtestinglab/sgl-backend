import { Schema, model } from 'mongoose';

const jewelrySchema = Schema({
  image1: { type: String, required: true },
  image2:{type:String,required:true},
  name: { type: String, required: true },
  price: { type: Number, required: false },
  weight: { type: Number, required: true },
  colour: { type: String, required: true },
  subtype: { type: String, required: true },
  units: { type: String, required: true },
  shape: { type: String, required: true },
  dimensions:{type:String,required:true},
  description:{type:String,required:true}
});

const Jewelry = model('Jewelry', jewelrySchema);

export default Jewelry;
