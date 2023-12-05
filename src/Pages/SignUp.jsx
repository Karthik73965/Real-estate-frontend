import { useState } from 'react'
import {Link , useNavigate } from 'react-router-dom'
import OAUTH from '../components/OAUTH'

export const SignUp = () => {
  const [FormData,SetFormData] = useState({  })
  const [error , Seterror] = useState(null )
  const [loading , Setloading ] = useState(false)
  const navigate = useNavigate();


  const handleChange = (e)=>{
       SetFormData({
        ...FormData,
        [e.target.id]:e.target.value
       })
  }

  const handleSubmit = async (e)=>{
      e.preventDefault();
     try {
      Setloading(true)
      const res = await fetch('http://localhost:3000/api/auth/signup',{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify(FormData)
      })
      const Data =  await res.json()
      if(Data.sucess===false){
        Seterror(Data.message);
        Setloading(false);
        return ;  
      }
      Setloading(false)
      Seterror(null)
      navigate('/signin')
     } catch (error) {
       Setloading(false);
       Seterror(error.message)
     }
  }
  console.log(FormData)
  return (
    <div className='max-w-lg p-3 mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7 '>SignUP</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input type="text" className='border p-3 rounded-lg' placeholder= 'username' id="username"onChange={handleChange} />
        <input type="email" className='border p-3 rounded-lg' placeholder= 'email' id="email" onChange={handleChange}/>
        <input type="password" className='border p-3 rounded-lg' placeholder= 'password' id="password"onChange={handleChange} />
        <button disabled={loading} className='bg-slate-700 text-white p-3  rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>{loading?'Loading...':'SignUP'}</button>
       <OAUTH/>
      </form>
      <div className='flex gap-3 mt-5'>
        <p>Have an account ?</p>
        <Link to={'/signin'}>
          <span className='text-blue-700'>SignIn</span>
          </Link>
        </div>
        {error && <p className='text-red-500'>{error}</p>}
      </div>
  )
}
