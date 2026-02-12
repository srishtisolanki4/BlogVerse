import axios from "axios";
axios.defaults.withCredentials=true;
axios.defaults.baseURL= import.meta.env.VITE_API_URL;;

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { UserProvider } from "./context/UserContext.jsx";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserProvider>
    <App />
    </UserProvider>
  </StrictMode>,
)
