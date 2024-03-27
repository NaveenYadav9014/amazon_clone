const jwt=require('jsonwebtoken');
const auth=async(req, res,next)=>{
  try{
       const token=req.header('x-auth-token');
       if(!token){
         return res.status(401).json({msg:'no auth token, access denied'});

       }
       const verified=jwt.verify(token, "passwordkey");
       if(verified) return res.json(false);
  }catch(err){
    res.status(500).json({error:err.message});
  }
}
