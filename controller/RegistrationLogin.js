const bcrypt=require('bcrypt');
const secretkey="mahesh@$1234"
const saltround=10;
const jwt=require('jsonwebtoken');
const client=require('../database/connection')
const db=client.db('E-commerce')
const user=db.collection('Users') 

const register= async (req,res)=>{ 
    try{
const details=req.body;
console.log("details:",details)
const find= await user.findOne({email:details.email})
if(find){
    return res.send({msg:"user is already registered"})
}
const hashPswrd=bcrypt.hashSync(details.password,saltround);
details.password=hashPswrd;
console.log("hashed password",details.password);
// arr.push(details);
const data=user.insertOne(details);
const token=jwt.sign({email:details.email},secretkey,{expiresIn:'8d'})

return res.status(200).send({msg:"user is successfully registered",result:"OK",password:details.password,result:details})
}
catch(err){
    res.send({error:err})
    console.log({error:err});
}
}
///login ...

const login=async(req,res)=>{
    try{
    const details=req.body;
    console.log("details:",details)
    // const find=arr.find((item)=>item.email===details.email) 
    const find= await user.findOne({email:details.email})
    if(!find){ 
        return res.send({msg:"user is not registered"}) 
    }
    const validate= await bcrypt.compare(details.password,find.password)
    // console.log("validate:",validate)
    if(!validate){
        return res.send({msg:"user password is wrong",error:"user is not authorized"});
    }
    let token =jwt.sign({email:details.email},secretkey,{expiresIn:'30d'}); 
    console.log("token:",token);
    const islogin=user.updateOne({email:find.email},{$set:{islogin:true}})
    return res.status(200).send({msg:"user is successfully loged in",token:token,result:"OK",username:find.name,islogin:true})
    }
    catch(err){
        res.send({error:err})
    } 
}
const logout= async (req,res)=>{
  userEmail=req.email;
  try{
  const updateLogOutStatus =await user.updateOne({email:userEmail},{ $set : { isLogin : false } });
  res.staus(200).send({msg:"Logged out succesfully"})
  }
  catch(err){ 
    console.log({error:err});
    res.status(500).send({error:err})
    
  }
}
module.exports={register,login,logout};