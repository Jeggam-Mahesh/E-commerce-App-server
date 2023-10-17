const jwt=require("jsonwebtoken")
const secretkey="mahesh@$1234"
const tokenVerification= async (req,res,next)=>{
const token=req.header("authorization");
console.log("tpoken========",token);
if(!token)
return res.status(401).json({msg:"unothorized"})
  const validate=await jwt.verify(token,secretkey) 
  if(validate){
    // console.log("validate",validate);
    req.email=validate.email;
    next()
    // res.send({msg:"valid user"})
  }
  else{
    return res.status(401).json({msg:"invalid token"});
  }
}
module.exports=tokenVerification