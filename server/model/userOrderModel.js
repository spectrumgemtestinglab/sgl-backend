import { Schema, model } from 'mongoose';

const userOrderSchema = Schema({
  totalItems: { type: Number, required: true },
  totalCost: { type: Number, required: true },
  shipping: { type: String, required: false },
  grandTotal: { type: Number, required: true },
  username: { type: String, required: true },
  date: { type: Date, required: true },
  address: { type: String, required: true },
  orderId: { type: String, required: true },
  items: [
    {
      productId: { type: String, required: true },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true },
      // Add more fields if needed
    },
  ],
});

const UserOrders = model('UserOrders', userOrderSchema);

export default UserOrders;
