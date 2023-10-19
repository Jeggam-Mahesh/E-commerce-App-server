const route=require('express').Router();
const home=require('../controller/Home')
const {Mobiles,Watches,Laptop,Headset,Addproduct,addtocart,getcartdetails,getdetails,removeFromCart,placeOrder}=require("../controller/Usercontroller")
const {register,login,logout}=require('../controller/RegistrationLogin');
const tokenVerification=require("../middleware/tokenVerification")
const temp=require('../controller/Usercontroller');
route.get("/",home);

route.get("/mobiles",Mobiles);
route.get("/vivo",)
route.get("/realme",)

route.get("/watches",Watches);
route.get("/noise",)
route.get("/boatwatches",)

route.get("/headset",Headset);
route.get("/boatbuds",)
route.get("/mivi",)
route.get("/laptop",Laptop);
route.get("/applelaptops")
route.get("/lenovo",)
route.post('/register',register);
route.post('/login',login);
route.post('/createproduct',Addproduct); 
// route.post('/createTrendingProducts',AddTrending)  
route.post("/addtocart",tokenVerification,addtocart)
route.get("/getcartdetails",tokenVerification,getcartdetails)
route.delete("/removefromcart/:id",tokenVerification,removeFromCart)
route.post('/placeOrder/:email',placeOrder)
// route.put("/updatequantity/:id",tokenVerification,UpdateQuantity)
route.get("/getdetails",tokenVerification,getdetails)
route.post("/logoutuser/:email",logout)
module.exports=route;   