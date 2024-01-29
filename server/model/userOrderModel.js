
import { Schema, model } from 'mongoose';

const userOrderSchema = Schema({
  totalItems: { type: Number, required: true },
  totalCost: { type: Number, required: true },
  shipping: { type: String, required: true },
  // estimatedTax: { type: Number, required: true },
  grandTotal: { type: Number, required: true },
});

const UserOrders = model('UserOrders', userOrderSchema);

export default UserOrders;
