const mongoose=require('mongoose');
const Schema=mongoose.Schema 
const usersSchema=new Schema({
    name:String, 
    phone:Number,
    email:String,
    password:String,
    islogin:String,
})
module.exports=mongoose.model("RegisteredUsers",usersSchema);