const User= require('../models/model')
const bcrypt= require("bcrypt")
const register=async(req,res)=>{
    const {numberoremail,fullname,username,password}= req.body
    try {
        const userExist= await User.findOne({numberoremail:numberoremail})
        if(userExist){return console.log(userExist)}
        const saltRound = 10;
    const hash_pass = await bcrypt.hash(password, saltRound);
        const userCreate=await User.create({
            numberoremail,fullname,username, password:hash_pass
        })
        res.status(201).json({ message: "data send successfully", user: userCreate, }) 
    } catch (error) {
        res.status(500).json(error)
    }
}
const login= async(req,res)=>{
try {
    const {username,password}= req.body;
    const userExist= await User.findOne({ $or:[{numberoremail: username},{fullname: username},{ username: username}]})

    if(!userExist){return res.status(401).json({message:"invalid credentials user not exist"})}
    const user= await bcrypt.compare(password,userExist.password)
    if(user){ res.status(200).json({ message: "login successfuly", user: userExist });

} else {
  res.status(401).json("invalid input");
} }
    catch (error) {
        res
          .status(400)
          .json({ message: "incorrect email or password", user: error });
      }
}
const getuserdata=async(req,res)=>{
    try {
        const user= await User.find();
        const details= user.map((user)=>{
           const {username,...details}= user._doc;
           return { details };
        })
        res.status(200).json(details)
    } catch (error) {
        res.status("500").json("Failed to retrive the user")
    }
}
module.exports= {login, register, getuserdata}