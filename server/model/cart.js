// import { Schema, model } from "mongoose";

// const cartSchema = new Schema({
//   clarity: { type: String, required: false },
//   colour: { type: String, required: true },
//   dimenensions: { type: String, required: true },
//   hardness: { type: Number, required: false },
//   image: { type: String, required: true },
//   name: { type: String, required: true },
//   quantity: { type: Number, required: false },
//   shape: { type: String, required: true },
//   size: { type: Number, required: false },
//   subtype: { type: String, required: false },
//   transparency: { type: String, required: true },
//   units: { type: String, required: true },
//   userIds: { type: String, required: true },
//   weight: { type: Number, required: true },
// });

// const cartData = model("cartData", cartSchema);

// export default cartData;


import { Schema, model } from "mongoose";

const cartSchema = new Schema({
  clarity: { type: String, required: false, default: "Unknown" },
  colour: { type: String, required: true },
  dimensions: { type: String, required: true, default: "N/A" },
  hardness: { type: Number, required: false, default: 0 },
  image: { type: String, required: false },
  name: { type: String, required: true },
  quantity: { type: Number, required: false, default: 1 },
  shape: { type: String, required: true },
  size: { type: Number, required: false, default: 0 },
  subtype: { type: String, required: false, default: "Unknown" },
  transparency: { type: String, required: true, default: "Opaque" },
  units: { type: String, required: true, default: "pcs" },
  userIds: { type: String, required: true },
  weight: { type: Number, required: true, default: 0 },
});

const cartData = model("cartData", cartSchema);

export default cartData;
