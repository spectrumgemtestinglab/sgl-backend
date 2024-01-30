//cartModel.js
import { Schema, model } from "mongoose";

const cartItemSchema = new Schema({
  item: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, required: true },
  identifier: { type: String, required: true }
});

const CartSchema = new Schema({
  items: [cartItemSchema],
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // Optional: if you want to associate the cart with a user
  totalAmount: { type: Number, default: 0 }
});

const Cart = model("Cart", CartSchema);

export default Cart;
