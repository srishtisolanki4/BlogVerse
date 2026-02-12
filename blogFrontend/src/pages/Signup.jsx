import React,{useContext, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2'
import { UserContext } from '../context/UserContext';


function Signup(){
    const navigate=useNavigate();
    const {setUser}=useContext(UserContext);
    const[name, setName]=useState("");
    const[email, setEmail]= useState("");
    const [password,setPassword]= useState("");
    const [confirmp,setConfirmP]= useState("");
    
    async function handleSubmit(event){
        event.preventDefault();
        try{
            if(password!=confirmp){
                Swal.fire("Incorrect password");
                return;
            }
            const response= await axios.post(`${import.meta.env.VITE_API_URL}/register` , {name,email,password},{withCredentials:true});
            setUser(response.data.user);
            console.log(response);
            Swal.fire(response.data.message);
            navigate('/');


        }catch(err){
            console.log(err.response?.data || err.message);
        }
    }
    return<>
        <div className='flex justify-center items-center w-full h-screen '>
        <div className="bg-white h-[60vh] w-[37vw]  ">
            <h2 className='text-center text-3xl p-2'>Signup</h2>
            <form> 
                <input  className='w-[35vw] p-4 bg-zinc-300 m-2 ' value={name} onChange={(event)=>setName(event.target.value)} placeholder='Name'/>
                <input className='w-[35vw] p-4 bg-zinc-300 m-2' value={email} onChange={(event)=>setEmail(event.target.value)} placeholder='Email'/>
                <input className='w-[35vw] p-4 bg-zinc-300 m-2' value={password} onChange={(event)=>setPassword(event.target.value)} placeholder='Password'/>
                <input className='w-[35vw] p-4 bg-zinc-300 m-2' value={confirmp} onChange={(event)=>setConfirmP(event.target.value)} placeholder='Confirm Password'/>
                <div className='flex flex-col items-center '>
                    <button type="submit" className='h-[45px] bg-blue-400 px-4 py-2 mt-2 rounded-md hover:cursor-pointer' onClick={handleSubmit}>Signup</button></div>
            </form>
            <h3 className='m-3 ml-4 text-center'>Already have an account? <button className='text-blue-800 underline hover:text-zinc-800 hover:cursor-pointer' onClick={()=>navigate('/login')}>Login</button></h3>
        </div>
    </div>
    </>
    

    

}

export default Signup;