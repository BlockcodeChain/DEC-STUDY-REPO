import React, { useState } from 'react'
import { GiHamburgerMenu } from "react-icons/gi";
const Navbar = () => {
    const [ismenu,setismenu]=useState(false);
    const [isactive,setisactive]=useState("#home")
    const navlinks=[
        {path:"#home" , element:"Home"},
        {path:"#about" , element:"About"},
        {path:"#blog" , element:"Blog"},
        {path:"#service" , element:"Service"}


    ]
  return (
    <nav className='fixed z-50 right-0 top-0  left-0 bg-white/90 '>
      <div className="container  flex justify-between items-center border-b border-gray-100 w-full px-4 sm:px-6 lg:px-8 h-16 lg:h-20 backdrop-blur-sm shadow-md ">
      {/* logo */}
      <div className='flex items-center gap-1 cursor-pointer'>
        <div className='rounded-full bg-red-600 opacity-80 hover:opacity-100 transition-opacity w-5 h-5'></div>
        <div className='rounded-full bg-yellow-400 opacity-100 -ml-2 hover:opacity-75  transition-opacity w-5 h-5'></div>
      </div>
      {/* desktop link */}
      
        <div className='flex text-md font-bold gap-8'>
          {
          navlinks.map((links,index)=>(
        <a key={index} href={links.path} onClick={()=>setisactive(links.path)} className={` md:flex hidden  relative after:absolute   after:bottom-0 after:left-0 after:w-0  after:h-0.5 after:bg-blue-500 ${isactive===links.path ?"text-blue-600 after:transition-all after:duration-500 after:w-full":"text-gray-700 after:w-0"}`}>{links.element}</a>
       ))
      }
        </div>
       {/* button  */}
       <button className='text-center '>
        <a href="#login" className='bg-blue-500 hover:bg-blue-600 shadow-sm text-md font-bold px-3 py-1 rounded-md  shadow-blue-300 cursor-pointer text-white '>Log in</a>
       </button>

      </div>

      {/* mobile link */}
      {ismenu &&(
       <div className='flex text-md font-bold gap-8'>
          {
          navlinks.map((links,index)=>(
        <a key={index} href={links.path} onClick={()=>setis} className={` md:hidden block relative after:absolute   after:bottom-0 after:left-0 after:w-0  after:h-0.5 after:bg-blue-500 ${isactive===links.path ?"text-blue-600 after:transition-all after:duration-500 after:w-full":"text-gray-700 after:w-0"}`}>{links.element}</a>
       ))
      }
        </div>
      )} 
    </nav>
  )
}

export default Navbar












{/* <GiHamburgerMenu /> */}