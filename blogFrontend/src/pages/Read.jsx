import React,{useState,useEffect} from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import axios from 'axios';

function Read(){
    const {id}= useParams();
    

    const[requiredBlog , setRequiredBlog] = useState([]);

    useEffect(()=>{
        const fetchBlog= async ()=>{
            try{
                console.log("about to hit request:");
                const response= await axios.get(`http://127.0.0.1:3000/read/${id}`);
                setRequiredBlog(response.data);
            }catch(err){
                console.log(err);
            }
        }
        fetchBlog();
    } , [id]);

        const formattedDate= new Date(requiredBlog.createdAt).toLocaleDateString('en-US',{
        day:'numeric',
        month:'long',
        year:'numeric',
    });


    if (!requiredBlog) return <div>Loading...</div>;
    else
    return(
        <div>
            <Navbar/>

            <div className=' font-sans-serif w-full  mt-10'>
                <div className="font-serif text-4xl mb-3 ">{requiredBlog.title}</div>
                <div className="text-xl">Written by: <i>{requiredBlog.author?.name || "Unknown Author"}</i></div>
                <div className="text-xl mb-3">{formattedDate}</div>
                {requiredBlog.content && requiredBlog.content.split('\n\n').map((para,index)=>(
                    <p key={index} className="mb-3">{para}</p>
                ))}
            </div>
        </div>
    )

}

export default Read