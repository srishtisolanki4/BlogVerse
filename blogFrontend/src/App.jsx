import { BrowserRouter as Router,Routes,Route } from "react-router-dom";

import Home from './pages/Home';
import About from './pages/About';
import Blog from './pages/Blog';
import Read from './pages/Read';
import Edit from './pages/Edit';
import Login from './pages/Login';
import Signup from "./pages/Signup";




function App(){
  return(
    <>

    
    <Router>
      
    
    <div className='p-3'>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/read/:id' element={<Read/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/blog' element={<Blog/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path='/edit/:id' element={<Edit/>}/>

       

      </Routes>
    </div>

    </Router>
    
    
    
    </>
    
    
    
  );

}

export default App;