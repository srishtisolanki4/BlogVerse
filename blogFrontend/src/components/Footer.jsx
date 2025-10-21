 import React from 'react';
 function Footer(){
   const currentYear= new Date().getFullYear();
    return(

        <>
         
           <div className="bg-zinc-300 text-zinc-800 mt-auto py-4 px-6 flex flex-col md:flex-row justify-between items-center shadow-inner">
  <p className="text-sm">&copy; {currentYear} Built with ☕, React & Love.</p>
  
  <div className="flex flex-row space-x-4 mt-2 md:mt-0">
    <a href="https://www.instagram.com/sri._.ss4?igsh=YWZ1N3BleWUyeHAy" target="_blank" rel="noopener noreferrer">
      <img 
        src="https://img.freepik.com/vecteurs-premium/icone-application-instagram-logo-medias-sociaux-illustration-vectorielle_277909-403.jpg?w=2000" 
        alt="Instagram"
        className="h-8 w-8 rounded hover:scale-110 transition-transform duration-200"
      />
    </a>

    <a href="http://www.linkedin.com/in/srishti-solanki4" target="_blank" rel="noopener noreferrer">
      <img 
        src="https://th.bing.com/th/id/OIP.CH_Ljw5hpxU03HXEuOC1pAHaHa?w=183&h=183&c=7&r=0&o=5&dpr=1.3&pid=1.7" 
        alt="LinkedIn"
        className="h-8 w-8 rounded hover:scale-110 transition-transform duration-200"
      />
    </a>
  </div>
</div>

        </>
    )

}

export default Footer;