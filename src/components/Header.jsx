import {FaSearch} from 'react-icons/fa'
import {Link, useNavigate } from 'react-router-dom';
import {  useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

export const Header = () => {
   const {currentUser }= useSelector((state)=>state.user)
   const [searchTerm,setsearchTerm]=useState('')
   const navigate = useNavigate()
   
   const handlesubmit=(e)=>{
         e.preventDefault();
         const urlParams=new URLSearchParams(window.location.search)
         urlParams.set('searchTerm',searchTerm);
         const searchQuery = urlParams.toString();
         navigate(`/search?${searchQuery}`)
   }
   useEffect(() => {
      const urlParams = new URLSearchParams(location.search);
      const searchTermFromUrl = urlParams.get('searchTerm');
      if (searchTermFromUrl) {
        setsearchTerm(searchTermFromUrl);
      }
    }, [location.search]);
  return (
    <header className='bg-slate-200 shadow-lg'>
       <div className='flex justify-between p-3 items-center max-w-6xl max-auto'>
     <Link to={'/'}>
     <h1 className='font-bold text-lg sm:text-xl flex flex-wrap'>
            <span className='text-slate-700'>Rk3</span>
            <span className='text-slate-300'>Estates</span>
        </h1>
     </Link>
        <form onSubmit={handlesubmit} className=' flex bg-slate-100 p-3 rounded-xl items-center '>
            <input type='text' placeholder='   search........' className='bg-transparent focus:outline-none w-24 sm:w-64  ' onChange={(e)=>setsearchTerm(e.target.value)}/>
           <button> <FaSearch/></button>
        </form>
        <ul className='flex gap-4 justify-around'>
           <Link to ={'/'}> <li className='text-slate-800 hover:underline hover:text-black'>Home</li></Link>
            <Link to ={'/about'}><li className='text-slate-800 hover:underline hover:text-black'>About</li></Link>
           <Link to = {'/profile'}>
           {currentUser ? (
              <img
                className='rounded-full h-7 w-7 object-cover'
                src={currentUser.avatar}
                alt='profile'
              />
            ) : (
              <li className=' text-slate-700 hover:underline'> Sign in</li>)}
           </Link>
        </ul>
       </div>
            
    </header>
  )
}
