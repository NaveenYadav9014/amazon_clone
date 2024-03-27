//import from packages
const express=require('express');
const mongoose=require('mongoose');
//import form other files

//import relative importing
const authRouter=require("./routes/auth");
//init
const PORT=3000;
const app=express();
const DB="mongodb+srv://nyadav9014:d6oHof2@cluster0.ovoujxs.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

//midleware
// client ->midleware-> server -> client
app.use(express.json());
app.use(authRouter);
//connection
//
 mongoose.connect(DB).then(()=>{
  console.log('connection successful');
 }).catch((e)=>{
  console.log(e);
 });
// creating an api

//Port,localhost, callback
app.listen(PORT,"0.0.0.0",()=>{
  console.log(`connected at port ${PORT}  hello`);
});
