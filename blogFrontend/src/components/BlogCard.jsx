import PropTypes from 'prop-types';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';
axios.defaults.withCredentials = true;


function BlogCard({blog}){
    const navigate= useNavigate();
    const id=blog._id;
    const shortcontent = blog.content.substring(0,50)+"...";
    const formattedDate= new Date(blog.createdAt).toLocaleDateString('en-US',{
        day:'numeric',
        month:'long',
        year:'numeric',
    });
    


    function handleRead(){
        console.log("about to navigate to read page");
        navigate(`/read/${id}`);
    }

    function handleEdit(){
        console.log("about to navigate to edit page");
        navigate(`edit/${id}`);
    }

    async function handleDelete(){
        
        try{
            console.log("about to delete");
            const response = await axios.delete(`http://localhost:3000/delete/${id}` , {withCredentials:true});
            console.log("Deleted successfully");
            navigate('/' ,{state: {refresh:true}});
        }catch(err){
            console.log(err);
        }
    }


    return(
        <>
        <div className=" flex flex-row flex-wrap"> 
        <div className="shadow-lg text-lg bg-gray-300 w-120   px-3 py-3 rounded-lg flex flex-col mb-4">
            <div className=" text-2xl font-bold 0 p-2 mb-2">{blog.title}</div>
            <div className="details flex flex-row justify-between">
                <p className=" p-2 mb-2" >{blog.author?.name ||"Unknown Author"} </p>
                <p className=" p-2 mb-2" >{formattedDate}</p>
            </div>
            <div className=" p-2 mb-2 text-sm ">{shortcontent}</div>
            <div className="mt-auto flex flex-row justify-between items-end ">
                <button className="bg-gray-400 p-2 mb-2 px-3  rounded-lg hover:cursor-pointer hover:contrast-100 hover:text-white hover:border-1" onClick={handleRead} >Read more....</button> 
                <div className="flex ">
                 <button className="bg-gray-400 shadow-lg p-2 mb-2 px-3  rounded-lg hover:cursor-pointer hover:contrast-100 hover:text-white m-2 hover:border-1 " onClick={handleEdit} >Edit</button>
                <button className="bg-red-700 p-2 mb-2 px-3   rounded-lg hover:cursor-pointer hover:contrast-100 hover:text-white m-2 hover:border-1 "  onClick={handleDelete}>Delete</button>


                </div>
            </div>

        </div>
        

    </div>
        </>
    )

}

BlogCard.prototypes={
    title: PropTypes.string,
    author: PropTypes.string,
    date: PropTypes.string,
    content: PropTypes.string,
}


export default BlogCard

