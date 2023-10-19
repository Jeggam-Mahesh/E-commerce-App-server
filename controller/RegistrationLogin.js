const bcrypt=require('bcrypt');
const secretkey="mahesh@$1234"
const saltround=10;
const jwt=require('jsonwebtoken');
const user_register=require('../model/UsersModel')
const register= async (req,res)=>{ 
    try{
const details=req.body;
console.log("details:",details)
const find= await user_register.findOne({email:details.email})
if(find){
    return res.send({msg:"user is already registered"})
}
const hashPswrd=bcrypt.hashSync(details.password,saltround);
details.password=hashPswrd;
console.log("hashed password",details.password);

const data=user_register.create(details);
const token=jwt.sign({email:details.email},secretkey,{expiresIn:'8d'})

return res.status(200).send({msg:"user is successfully registered",result:"OK",password:details.password,})
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

    const find= await user_register.findOne({email:details.email})
    if(!find){ 
        return res.send({msg:"user is not registered"}) 
    }
    const validate= await bcrypt.compare(details.password,find.password)
    // console.log("validate:",validate)
    if(!validate){
        return res.send({msg:"user password is wrong",error:"user is not authorized"});
    }
    let token =jwt.sign({email:details.email},secretkey,{expiresIn:'30d'}); 
    console.log("email==========",{email:find.email});
    const islogin= await user_register.findOneAndUpdate({email:find.email},{$set:{islogin:true}},{new:true})
    return res.status(200).send({msg:"user is successfully loged in",
    token:token,username:find.name,islogin:true,email:details.email})
    }
    catch(err){
        res.send({error:err})
    } 
}
const logout= async (req,res)=>{ 
    const {email}=req.params
  try{
  const updateLogOutStatus =await user_register.findOneAndUpdate({email:email},{ $set : { islogin : false } });
  if(updateLogOutStatus)
  res.status(200).send({msg:"Logged out succesfully",code:200,islogin:false,email:email})
else{
    res.status(400).json({code:res.status,msg:"failed to log out"})
}
  }

  catch(err){ 
    console.log({error:err});
    res.status(500).send({error:err})
    
  }
}
module.exports={register,login,logout};