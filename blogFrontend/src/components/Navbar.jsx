import {Link}  from 'react-router-dom'
import BlogIcon from '../assets/blog.png'
import { UserContext } from '../context/UserContext';
import { useContext } from 'react';
function Navbar(){
    const{user,logout}=useContext(UserContext);
    return(
        <div className='p-2 bg-zinc-500 '>

            <div ><img  className='h-12'src={BlogIcon}></img></div>
            <div className='flex flex-row justify-end'>
                 <div className='text-xl  m-2 -mt-12 p-2 px-3 hover:underline'> <Link to='/'>Home</Link> </div>  
                <div className=' text-xl m-2  -mt-12  p-2 px-3 hover:underline'> <Link to='/about'>About</Link> </div>
                <div className=' text-xl m-2 -mt-12  p-2 px-3 hover:underline'> <Link to='/blog'>Blog</Link> </div>

                <div className=' text-xl m-2 -mt-12 p-2 px-2 '>
                    {user? (
                        <>
                        <span className='mr-4 text-sm'>Logged in as {user.name.split(" ")[0]}</span>
                        <button
                            onClick={logout}
                            className='bg-red-400 px-3 py-1 rounded hover:bg-red-700'>
                                Logout

                        </button>
                        </>
                    ):(<Link to='/login'>Login</Link>) } </div>


            </div>
            
             
             

        </div>
        

    );

}

export default Navbar