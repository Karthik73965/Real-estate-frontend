import {Link } from 'react-router-dom'

export const SignUp = () => {
  return (
    <div className='max-w-lg p-3 mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7 '>SignUP</h1>
      <form className='flex flex-col gap-4'>
        <input type="text" className='border p-3 rounded-lg' placeholder= 'username' id="username" />
        <input type="text" className='border p-3 rounded-lg' placeholder= 'username' id="email" />
        <input type="text" className='border p-3 rounded-lg' placeholder= 'username' id="password" />
        <button className='bg-slate-700 text-white p-3  rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>SignUP</button>
      </form>
      <div className='flex gap-3 mt-5'>
        <p>Have an account ?</p>
        <Link to={'/signin'}>
          <span className='text-blue-700'>SignIn</span>
          </Link>
        </div>


      </div>
  )
}
