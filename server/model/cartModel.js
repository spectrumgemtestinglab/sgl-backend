// cartModel.js
import { Schema, model } from "mongoose";

const cart = new Schema({
  username: { type: String, required: false },
  quantity: { type: Number, required: false },
  image: { type: String, required: false },
  name: { type: String, required: false },
  price: { type: Number, required: false },
  weight: { type: Number, required: false },
  colour: { type: String, required: false },
  units: { type: String, required: false },
  value: { type: String, required: false },
  shape: { type: String, required: false },
  dimenensions: { type: String, required: false },
  transparency: { type: String, required: false },
  hardness: { type: Number, required: false },
  microscopicexamination: { type: String, required: false },
  size: { type: Number, required: false },
  clarity: { type: String, required: false },
  subtype:{type:String,required:false}
});

const Cart = model("Cart", cart);

export default Cart;
