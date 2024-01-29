import { Schema, model } from "mongoose";

const astrologyGems = Schema({
  yellowSapphire:{type:String,required:true},
  blueSapphire:{type:String,required:true},
  emerald:{type:String,required:true},
  ruby:{type:String,required:true},
  opal:{type:String,required:true},
  pearl:{type:String,required:true},
  redCoral:{type:String,required:true},
  hessonite:{type:String,required:true}
});


const AstrologyGems = model("AstrologyGems", astrologyGems);
export default AstrologyGems;

