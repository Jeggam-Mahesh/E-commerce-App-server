const mongoose=require('mongoose');
const Schema=mongoose.Schema 
const islogin=new Schema({ 
    userEmail:String,
    islogin:String,
    islogout:String
})
module.exports=mongoose.model("islogin",islogin);