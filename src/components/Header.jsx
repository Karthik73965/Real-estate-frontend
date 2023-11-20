import {FaSearch} from 'react-icons/fa'
import {Link } from 'react-router-dom'

export const Header = () => {
  return (
    <header className='bg-slate-200 shadow-lg'>
       <div className='flex justify-between p-3 items-center max-w-6xl max-auto'>
     <Link to={'/'}>
     <h1 className='font-bold text-lg sm:text-xl flex flex-wrap'>
            <span className='text-slate-700'>Rk3</span>
            <span className='text-slate-300'>Estates</span>
        </h1>
     </Link>
        <form className=' flex bg-slate-100 p-3 rounded-xl items-center '>
            <input type='text' placeholder='   search........' className='bg-transparent focus:outline-none w-24 sm:w-64  ' />
            <FaSearch/>
        </form>
        <ul className='flex gap-4 justify-around'>
           <Link to ={'/'}> <li className='text-slate-800 hover:underline hover:text-black'>Home</li></Link>
            <Link to ={'/about'}><li className='text-slate-800 hover:underline hover:text-black'>About</li></Link>
           <Link to = {'/signin'}> <li className='text-slate-800 hover:underline hover:text-black'>Sign In</li></Link>
        </ul>
       </div>
            
    </header>
  )
}
