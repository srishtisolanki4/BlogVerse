import React,{useState,useEffect, useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import { UserContext } from '../context/UserContext';

function Login(){
    const navigate=useNavigate();
    const {setUser}=useContext(UserContext);
    const[email, setEmail]=useState("");
    const[password,setPassword]=useState("");
    function handleEmail(event){
        setEmail(event.target.value);
    }

    function handlePassword(event){
        setPassword(event.target.value);
    }
    async function handleSubmit(event){
        event.preventDefault();
        try{
            const response= await axios.post("http://localhost:3000/login" , {email,password}, {withCredentials:true}) ;
            setUser(response.data.user);
            setEmail(" ");
            setPassword(" ");
            console.log(response);
            if(response.data.message=="Logged in successfully"){
                localStorage.setItem('isLoggedIn', 'true');
            }
            Swal.fire(response.data.message);
            navigate('/')
        }catch(err){
            console.log(err);
        }
    }


    return <>
    <div className='flex justify-center items-center w-full h-screen '>
        <div className="bg-white h-[50vh] w-[40vw] ">
            <form>
                <h2 className='text-center text-3xl p-2'>Login</h2>
                <input className='w-[35vw] p-4 bg-zinc-300 m-2' value={email} onChange={handleEmail} placeholder="email" ></input>
                <input className='w-[35vw] p-4 bg-zinc-300 m-2' value={password} onChange={handlePassword} placeholder="password"></input>
                <div className='flex flex-col items-center '>
                    <button type="submit" className='h-[45px] bg-blue-400 px-4 py-2 mt-2 rounded-md hover:cursor-pointer' onClick={handleSubmit}>Login</button>
                    </div>
                <h2 className='m-3 ml-4'>Don't have an account? <button className='text-blue-800 underline hover:text-zinc-800 hover:cursor-pointer' type="button" onClick={()=>navigate('/signup')} >Signup</button></h2>
            </form>
        </div>
    </div>
    </>
}

export default Login;