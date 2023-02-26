const express=require("express");
const app=express();
const mongoose=require("mongoose");
const cors=require('cors');
app.use(cors());
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const JWT_SECRET="dnjnfjdnfjenjew1234()rnfbhrfkrmr?[]jnjfnjfj";
app.use(express.json());
const mongoUrl="mongodb+srv://abhi:mod8nr@cluster0.rsnz5ei.mongodb.net/?retryWrites=true&w=majority";
mongoose.set('strictQuery',false);
mongoose.connect(mongoUrl,{
    useNewUrlParser:true
}).then(()=>{
    console.log('Connected to database');
}).catch((e)=>console.log(e))
require('./userDetails');
const User=mongoose.model('UserInfo');
app.post('/register',async(req,res)=>{
    const {userName,email,phoneNo,password}=req.body;
    const encryptedPassword=await bcrypt.hash(password,10);
    try{
        const oldUser= await User.findOne({email});
        if(oldUser){
           return res.json({error:"User Exists"});
        }
        await User.create({
            userName,
            email,
            phoneNo,
            password:encryptedPassword,
        });
        res.send({status:'ok'});
    }catch(error){
        res.send({status:"error"})
    }
})
app.post('/login',async(req,res)=>{
    const {email,password}=req.body;
    const user=await User.findOne({email});
    if(!user){
        return res.json({error:"User Not found"});
    }
    if(await bcrypt.compare(password,user.password)){
        const token=jwt.sign({},JWT_SECRET);
        if(res.status(201)){
            return res.json({status:"ok",data:token});
        }
        else{
            return res.json({error:"error"});
        }
    }
    res.json({status:'error',error:'Invalid Password'})
})
app.listen(8000,()=>{
    console.log('Server Started');
})
