import React from 'react'
import { useSelector } from 'react-redux'

export const Profile = () => {
  const {currentUser} = useSelector((state)=>state.user)
  console.log(currentUser)
  return (
    <div className='p-3 mx-auto max-w-lg'>
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
      <form  className='flex flex-col '>
        <img src={currentUser.avatar} className='rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2'  alt='profile'/>
        <input type='text ' placeholder='username'  id='username' className='border p-3 rounded-lg' /><br/>
        <input type='email' placeholder='email'  id='email' className='border p-3 rounded-lg' /><br/>
        <input type='password' placeholder='password'  id='password' className='border p-3 rounded-lg' /><br/>
        <button type='button' className='bg-slate-700 text-white rounded-lg p-3 uppercase disabled:opacity-80'>update</button>
      </form>
      <div className='flex justify-between mt-5'>
          <span className='text-red-700 cursor-pointer'>Delete account</span>
          <span className='text-red-700 cursor-pointer'>logout</span>
      </div>
    </div>
  )
}
