const mongoose=require('mongoose');
const Schema=mongoose.Schema 
const cartSchema=new Schema({ 
    userEmail:String,
    cart:[{
    id:String, 
    product_tittle:String,
    image:String,
    price:Number,
    highlights:String,
    category:String,
    quantity:String,
}]})
module.exports=mongoose.model("cart",cartSchema);