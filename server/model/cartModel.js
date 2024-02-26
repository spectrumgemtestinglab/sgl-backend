import { Schema, model } from "mongoose";

const cartSchema = new Schema({
  clarity: { type: String, required: false },
  colour: { type: String, required: true },
  dimensions: { type: String, required: true },
  hardness: { type: Number, required: true },
  image: { type: String, required: true },
  name: { type: String, required: true },
  quantity: { type: Number, required: false },
  shape: { type: String, required: true },
  size: { type: Number, required: false },
  subtype: { type: String, required: false },
  transparency: { type: String, required: true },
  units: { type: String, required: true },
  userIds: { type: String, required: true },
  weight: { type: Number, required: true },
});

const Cart = model("Cart", cartSchema);

export default Cart;
