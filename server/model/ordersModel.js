import { Schema, model } from "mongoose";

const orderSchema = Schema({
  userName: { type: String, required: true }, 
  userId: { type: Number, required: true },
  items: [
    {
      image: { type: String, required: true },
      name: { type: String, required: true },
      price: { type: Number, required: true },
      weight: { type: Number, required: true },
      colour: { type: String, required: true },
      subtype: { type: String, required: true },
      units: { type: String, required: true },
      value: { type: String, required: true },
      shape: { type: String, required: true },
    },
  ],
  orderId: { type: String, required: true },
  date: { type: Date, required: true },
  status: { type: String, required: true },
  address: { type: String, required: true },
  totalPrice: { type: Number, required: true },
});

const Orders = model("Orders", orderSchema);
export default Orders