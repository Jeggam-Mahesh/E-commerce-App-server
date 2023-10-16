const mongoose=require('mongoose')
const connectdb=()=>
    mongoose.connect(process.env.MONGO_URL)
    .then(()=>console.log("connected to mongoose....."))
    .catch((e)=>console.log("error",e))


module.exports=connectdb 