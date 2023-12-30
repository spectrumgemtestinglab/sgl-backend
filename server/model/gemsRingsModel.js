import { Schema, model } from "mongoose";

const gemsringsSchema = Schema({
  image: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
});

const GemsRings = model("GemsRings", gemsringsSchema);

export default GemsRings;
