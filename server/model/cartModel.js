// models/cartModel.js
import { Schema, model } from "mongoose";

const cartItemSchema = Schema({
  itemId: { type: Schema.Types.ObjectId, ref: "Item", required: true },
  quantity: { type: Number, required: true }
});

const cartSchema = Schema({
  userId: { type: Schema.Types.ObjectId, required: true },
  items: [cartItemSchema]
});

const Cart = model("Cart", cartSchema);
export default Cart;
