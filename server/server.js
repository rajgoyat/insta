require('dotenv').config();
const express= require("express");
const cors= require("cors")
const mongoose= require("mongoose")
const router= require('./routes/route')
const app= express();
const allowedOrigins = ['http://localhost:3000', 'https://rajgahlot1.github.io'];
corsOptions={
    origin: (origin, callback) => {
        if (allowedOrigins.includes(origin) || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    method:"GET, PUT, POST, DELETE,PATCH, HEAD",
    credentials: true
}
app.use(cors(corsOptions));
app.use(express.json());
app.use('/insta',router)

const connectDb= async(req,res)=>{
    try {
       await mongoose.connect(process.env.MONGODB_URI)
        console.log("Database connected successfully")}     
     catch (error) {
        console.error("Database connection error:", error);  
 process.exit(1);      
    }
}
connectDb().then(()=>{
    app.listen('5000',()=>{
        console.log("connected to port 5000")
    })
})