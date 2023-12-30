import { Schema,model } from "mongoose";

const ineventory=Schema({
    type:{type:String,required:true},
    subtype:{type:String,required:true},
    name:{type:String,required:true},
    weight:{type:Number,required:true},
    shape:{type:String,required:true},
    price:{type:Number,required:true},
    colour:{type:String,required:true},
    value:{type:Number,required:true},
    image:{type:String,required:true}
})
const Ineventory=model("Inventory",ineventory)
export default Ineventory