const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();
const User = require("../model/user");
const Blog = require('../model/blogs');

const verify =(checkAuthor=false) => async (req, res, next) => {
  try {
    const token = req.cookies.token;
    console.log("Token from cookie:", token);
    if (!token) {
      return res.status(401).json({ message: "Token not found!" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded JWT:", decoded);
    const findUser = await User.findOne({ email: decoded.email });
     console.log("Found user:", findUser ? findUser.email : "No user found");

    if (!findUser) {
      return res.status(404).json({ message: "No user found" });
    }

    req.user = findUser; // attach user
    if(checkAuthor){
    const id = req.params.id;
    const blog = await Blog.findById(id).populate('author');
    console.log("Fetched blog:", blog ? blog.title : "No blog found");

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    if(!blog.author){
      console.log("Blog has no author!");
      return res.status(500).json({message: "blog author not found"});
    }

    console.log("Blog author:", blog.author.name);
    console.log("Current user ID:", req.user._id.toString());
    // Only author can edit/delete
    if (blog.author._id.toString() !== req.user._id.toString()) {
      console.log("Unauthorized attempt!!")
      return res.status(403).json({ message: "Unauthorized" });
    }
    req.user=findUser;
    req.blog=blog;
  }
    next();
  } catch (err) {
    console.error("Error in verify middleware:", err.message);
    return res.status(401).json({ message: err.message });
  }
};

const verifyUser = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const findUser = await User.findOne({ email: decoded.email });

    if (!findUser) {
      return res.status(404).json({ message: "User not found" });
    }

    req.user = findUser; // FIX: attach user
    next();
  } catch (err) {
    return res.status(401).json({ message: err.message });
  }
};

module.exports = { verify, verifyUser };
