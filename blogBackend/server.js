require('dotenv').config();
const express = require ('express');
const cors= require ('cors');
const mongoose=require('mongoose');
const cookieParser=require('cookie-parser')
const app=express();
app.use(express.json());
app.use(cookieParser());

app.use(cors({
  origin: "http://localhost:5173", // ✅ specific origin, not "*"
  credentials: true               // ✅ allow credentials
}));


app.use(express.urlencoded({extended:true}));
const port=process.env.PORT || 3000;
const{register , login}= require('./controllers/authcontroller');
const {home,readBlog,createBlog,editBlog,deleteBlog} = require("./controllers/blogcontroller");
const{verify, verifyUser}= require("./middleware/verifyOwnership");
const User = require('./model/user');
const Blog= require('./model/blogs');

const startServer= async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB connected");
        app.listen(port , ()=>{
        console.log(`Server is listening on ${port}`);
});

    }catch(err){
        console.log(err);
    }
};

startServer();


app.get('/' ,(req,res)=>{
    res.send("Server is up and running!!");
});

app.post('/register' , register);
app.post('/login', login);
app.get('/home' , home);
app.get('/read/:id', readBlog);
app.post('/create' , verifyUser , createBlog);
app.get('/readForEdit/:id' , verify(true),(req,res)=>{
    res.status(200).json(req.blog);
}
)
app.patch('/update/:id' , verify(true) ,editBlog);
app.delete('/delete/:id' , verify(true), deleteBlog);
app.get('/me' , verifyUser , (req,res)=>{
    res.status(200).json({user:req.user});
});
app.post('/logout', (req, res) => {
  res.clearCookie('token', { httpOnly: true, sameSite: 'lax' });
  return res.status(200).json({ message: 'Logged out successfully' });
});




