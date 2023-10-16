const express=require('express')
const route=require('./router/Routing');
// const client=require('./database/connection')
const connectdb=require('./database/mongooseconnection')
require('dotenv').config();
const cors=require('cors'); 
const app=express();
app.use(express.json());
app.use(cors({ 
    origin:"*"
})) 
const port=5000; 
console.log(port); 
app.use('/',route); 
// async function  dbconnect(req,res){
//     try{
//         await client.connect()
//         console.log("db connected")
        
//     }
//     catch(e){
//         console.log("erroe",e)
//     }
// }
// dbconnect(); 

const startdb= async(req,res)=>{
    try{ 
        await connectdb(process.env.MONGO_URL);
        // console.log("db connected")
       }
    catch(e){
        console.log("error",e);
    }
   
}
startdb()
app.listen(port,()=>{
    console.log("server 5000")
})
