// model/cartsModel.js

import { Schema, model } from 'mongoose';

const cartsSchema = Schema({
  totalItems: { type: Number, required: true },
  totalCost: { type: Number, required: true },
  shipping: { type: String, required: true },
  estimatedTax: { type: Number, required: true },
  grandTotal: { type: Number, required: true },
});

const Cart = model('Carts', cartsSchema);

export default Cart;
