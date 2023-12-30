import { Schema,model } from "mongoose";

const orders=Schema({
    userName:{type:String,required:true},
    items:{type:String,required:true},
    orderId:{type:String,required:true},
    date:{type:Date,required:true},
    status:{type:String,required:true},
    address:{type:String,required:true},
    totalPrice:{type:Number,required:true}
})
const Orders=model("Orders",orders)
export default Orders