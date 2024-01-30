import { Schema, model } from "mongoose";

const chandraSchema = Schema({
  id: { type: Number, required: true },
  items: [
    {
      image: { type: String, required: true },
      name: { type: String, required: true },
      price: { type: Number, required: true },
      weight: { type: Number, required: true },
      colour: { type: String, required: true },
      subtype: { type: String, required: false },
      units: { type: String, required: true },
      value: { type: String, required: true },
      shape: { type: String, required: true },
      dimenensions: { type: String, required: true },
      transparency: { type: String, required: true },
      hardness: { type: Number, required: true },
      microscopicexamination: { type: String, required: true },
      size: { type: Number, required: false },
      clarity: { type: String, required: false },
    },
  ],
  totalItems: { type: Number, required: true },
});

const Chandra = model("Chandra", chandraSchema);
export default Chandra;
