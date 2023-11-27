import { useState } from 'react'
import {Link , useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { signInFailure, signInStart , signInSucess } from '../redux/user/userSlice'

export const SignIn = () => {
  const [FormData,SetFormData] = useState({  })
   const {error, loading}  = useSelector((state)=>state.user)
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e)=>{
       SetFormData({
        ...FormData,
        [e.target.id]:e.target.value
       })
  }

  const handleSubmit = async (e)=>{
      e.preventDefault();
     try {
     dispatch(signInStart())
      const res = await fetch('http://localhost:3000/api/auth/signin',{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify(FormData)
      })
      const Data =  await res.json()
      if(Data.sucess===false){
        dispatch(signInFailure(Data.message))
        return ;  
      }
     dispatch(signInSucess(Data))
      navigate('/')
     } catch (error) {
        dispatch(signInFailure(error.message))
     }
  }
  console.log(FormData)
  return (
    <div className='max-w-lg p-3 mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7 '>Sign In</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input type="email" className='border p-3 rounded-lg' placeholder= 'email' id="email" onChange={handleChange}/>
        <input type="password" className='border p-3 rounded-lg' placeholder= 'password' id="password"onChange={handleChange} />
        <button disabled={loading} className='bg-slate-700 text-white p-3  rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>{loading?'Loading...':'SignIP'}</button>
      </form>
      <div className='flex gap-3 mt-5'>
        <p> Dont Have an account ?</p>
        <Link to={'/signup'}>
          <span className='text-blue-700'>Signup</span>
          </Link>
        </div>
        {error && <p className='text-red-500'>check the credentials</p>}
      </div>
  )
}
