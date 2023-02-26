const mongoose=require('mongoose');
const UserDetailsSchema=new mongoose.Schema(
    {
        userName:String,
        email:{type:String,unique:true},
        phoneNo:String,
        password:String
    },
    {
        collection:"UserInfo",
    }
);
mongoose.model("UserInfo",UserDetailsSchema);
