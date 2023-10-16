const mongoose=require('mongoose');
const Schema=mongoose.Schema
const productSchema=new Schema({
    product_tittle:String,
    image:String,
    price:Number,
    highlights:String,
    brand:String,
    category:String,
})
module.exports = mongoose.model('Products',productSchema)