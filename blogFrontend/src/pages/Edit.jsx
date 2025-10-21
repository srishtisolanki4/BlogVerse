import React,{useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
axios.defaults.withCredentials=true;
import { useNavigate } from 'react-router-dom';
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Footer from '../components/Footer';

function Edit(){
    const navigate = useNavigate();
    const {id}= useParams();
    const[oldBlog , setOldBlog]= useState([]);

    const[blogTitle, setBlogTitle] = useState("");
    const[blogContent , setBlogContent] = useState("");
    

    useEffect(()=>{
       const fetchOldData= async ()=>{
            try{
                const response= await axios.get(`http://localhost:3000/readForEdit/${id}` , {withCredentials:true});
                const data = response.data;
                setOldBlog(data);
                setBlogTitle(data.title);
                setBlogContent(data.content);
            }catch(err){
                console.log(err);
                if(err.response?.status ===403 || err.response?.status ===401){
                  alert("you are not authorized to edit this blog!")
                  navigate('/');
                }
            }
        };
        fetchOldData();

    }, [id]);

    function handleTitle(event){
        setBlogTitle(event.target.value);
    }

    function handleContent(event){
        setBlogContent(event.target.value);
    }

    async function handleEdit(event){
        event.preventDefault();

        const newBlog={
            title:blogTitle,
            content:blogContent
        };

        try{
            console.log('yeah i got hit');
            const response = await axios.patch(`http://localhost:3000/update/${id}`, newBlog, {
  withCredentials: true
});
             navigate('/');console.log("data finally updated" + response);
           
        }catch(err){
            console.log(err);

        }
    }

    return(
        <>
        <Navbar/>
        <div className=" mt-10 max-w-3xl mx-auto p-6 bg-white rounded-md shadow-md">
  <h2 className="text-2xl font-semibold mb-6 text-zinc-800">Edit Your Blog</h2>
  <form onSubmit={handleEdit} className="flex flex-col gap-4">
    <input
      type="text"
      name="title"
      defaultValue={blogTitle}
      onChange={handleTitle}
      placeholder="Enter blog title"
      className="border border-zinc-300 rounded px-4 py-2 text-zinc-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      required
    />
    <textarea
      name="content"
      defaultValue={blogContent}
      onChange={handleContent}
      placeholder="Write your content here..."
      className="border border-zinc-300 rounded px-4 py-2 h-72 resize-y text-zinc-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      required
    />
    <button
      type="submit"
      className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded transition"
    >
      Save Changes
    </button>
  </form>
</div>

</>

    )

}

export default Edit