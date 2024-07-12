const mongoose= require("mongoose")
const userSchema= new mongoose.Schema({
    numberoremail: {type: String, required: true , max:20},
    fullname: { type: String, required: true,max:30,min:3 },
    username:{ type:String, required:true, unique:true },
    password: { type: String, required: true, min: 6 },
    followers: { type: Array, default: [] },
    followings: { type: Array, default: [] },
    img: {type: String},
    desc: {type :String, max:50}
},
{ timestamps: true })

module.exports = mongoose.model("insta_user", userSchema);