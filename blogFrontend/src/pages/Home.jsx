import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Footer from '../components/Footer'
import BlogCard from "../components/BlogCard";
import axios from 'axios';
import { useLocation } from "react-router-dom";

import React,{useState,useEffect} from 'react';
function Home(){
    const location=useLocation();
    const[blogs, setBlogs]= useState([]);

    useEffect(()=>{
        const fetchData = async () => {
        try{
           const response = await axios.get('http://127.0.0.1:3000/home');
           setBlogs(response.data);
            console.log("data received successfully")
        }catch(err){
            console.log("error displaying data" + err);
        }
    };
    fetchData();
},[location.state]);



    return (
        <div className="flex flex-col min-h-screen">
            <Navbar/>
            <Header/>
            <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {blogs.map((blog)=>(
                <BlogCard key={blog._id} blog={blog} />
            ))}
            </div>
            <Footer/>
        </div>
    );
}

export default Home