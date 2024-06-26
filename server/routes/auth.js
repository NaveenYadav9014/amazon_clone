const express=require("express");
const bcryptjs= require("bcryptjs");
const User=require("../models/user");
const authRouter=express.Router();
const jwt=require("jsonwebtoken");

// SIGN UP
authRouter.post('/api/signup', async (req, res)=>{
 // get data from client
  try{
       const{name, email, password} =req.body;

         const existingUser=await User.findOne({email});
         if(existingUser){
           return res.status(400).json({msg:' User with same email already exists!'});
         }

       const hashedPassword=  await bcryptjs.hash(password,8);
          let user=new User({
              email,
              password: hashedPassword,
              name,
         })
         user=await user.save();
         res.json(user);
       // post data in database
       // return that data to user
  } catch(e){
    res.status(500).json({error: e.message});
  }
});

//SIGN IN ROUTE

authRouter.post('/api/signin',async(req,res)=>{
  try{
      const {email, password}= req.body;
      const user=await User.findOne({ email});
      if(!user){
         return res.status(400).json({msg: 'User with this email does not exists'});
      }
      // password hell123  ,
     const isMatch= await bcryptjs.compare(password,user.password);
     if(!isMatch){
         return res.status(400).json({msg: 'wrong password'});
     }

      const token=jwt.sign({id:user._id},'passwordkey');
      res.json({token, ...user._doc})
  }catch(e){
  res.status(500).json({error:e.message});
  }
});
authRouter.post('/tokenIsValid',async(req,res)=>{
   try{

      const token=req.header('x-auth-token');
      if(!token) return res.json(false);
     const verified= jwt.verify(token,"passwordKey");
      if(!verified) return res.json(false);

      const user=await User.findById(verified.id);
      if(!user) return res.json(false);
      res.json(true);
   }catch(e){
     res.status(500).json({error:e.message});
   }
});

//get user data
authRouter.get('/',auth)
module.exports=authRouter;