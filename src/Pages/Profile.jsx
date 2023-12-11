import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useRef } from 'react'
import { app } from '../firebase'
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import {
   updateUserStart,
   updateUserSuccess,
   updateUserfailure,
   deleteUserStart,
   deleteUserSuccess,
   deleteUserfailure,
   SignOutUserStart,      
   SignOutUserfailure,
   SignOutUserSuccess,
   } from '../redux/user/userSlice';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';


export const Profile = () => {
  const {currentUser} = useSelector((state)=>state.user)
  const fileref = useRef(null)
  const [file , setfile] = useState(undefined)
  const[fileperc,setfileperc] = useState(0)
  const [uploadError , setuploaderror] = useState(false)
  const [formData,setformData] = useState({})
  const [updateSuccess,setupdateSuccess] = useState(false)
  const dispatch = useDispatch();
  const {error, loading}  = useSelector((state)=>state.user)
  console.log(formData)


  useEffect(()=>{
    if(file){
      handleFileUpload(file)
    }
  },[file])
  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setfileperc(Math.round(progress));
      },
      (error) => {
        setuploaderror(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
        setformData({ ...formData, avatar: downloadURL })
        );
      }
    );
  };

  const handleOnChange = (e)=>{
    setformData({...formData, [e.target.id]:e.target.value}) 
  }

  const handleSubmit = async(e)=>{
    e.preventDefault();
    try {
      dispatch(updateUserStart())
      const res = await fetch (`/api/user/update/${currentUser._id}`,{
        method:'POST',
        headers:{
          'Content-Type':'application/json',
        },
        body:JSON.stringify(formData)
      });
      const data = await res.json();
      console.log(res)
      console.log(data)
      if (data.success === false) {
        dispatch(updateUserfailure(data.message));
        return;
      }
      dispatch(updateUserSuccess(data))
      setupdateSuccess(true)
    } catch (error) {
      console.log(error.message)
      dispatch(updateUserfailure(error.message))
     
    }
  }
const handleDeleteUser=async ()=>{
  try {
    dispatch(deleteUserStart())
    const res = await fetch(`/api/user/delete/${currentUser._id}`,{
      method:'DELETE'
    })
    const data = await res.json();
    if(data.success === false){
      dispatch(deleteUserfailure(data.message))
    }
    dispatch(deleteUserSuccess(data))
  } catch (error) {
      dispatch(deleteUserfailure())
  }
}

const handlelogout=async()=>{
  try {
    dispatch(SignOutUserStart())
    const res = await fetch('/api/auth/signout');
    const data = res.json();
    if(data.success===false){
      dispatch(SignOutUserfailure(error)) 
    }
    dispatch(SignOutUserSuccess(error))
  } catch (error) {
    dispatch(SignOutUserfailure(error))
  }
}
  return (
    <div className='mb-2 p-3 mx-auto max-w-lg'>
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
      <form onSubmit={handleSubmit} className='flex flex-col '>
        <input onChange={(e)=>setfile(e.target.files[0])} type='file' ref={fileref} hidden accept='image/*'/>
        <img  onClick={()=>{fileref.current.click()}} src={formData.avatar || currentUser.avatar} className='m-2 rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2'  alt='profile'/>
        <p className='text-sm self-center'>
          {uploadError?(
            <span className='text-red-500S'>Error image uploaded (image must be less than 2 mb )</span> 
          ): fileperc >0 && fileperc<100 ? (
            <span className='text-slate-700'>{`uploading ${fileperc}%`}</span>
          ):fileperc===100?(<span className='text-green-600'>
            image uploadded succesfully
          </span>):(
            ""
          )        
          }
        </p>
        <input onChange={handleOnChange}type='text ' defaultValue={currentUser.username} placeholder='username'  id='username' className='border p-3 rounded-lg' /><br/>
        <input onChange={handleOnChange} type='email' placeholder='email'  defaultValue={currentUser.email}  id='email' className='border p-3 rounded-lg' /><br/>
        <input type='password' onChange={handleOnChange} placeholder='password'  id='password' className='border p-3 rounded-lg' /><br/>
        <button disabled={loading} className='bg-slate-700 text-white rounded-lg p-3 uppercase disabled:opacity-80'>
         {
          loading?"loading":"update"
         }
        </button>
        <Link className='bg-green-700 text-white p-3 rounded-lg mt-3 uppercase text-center hover:opacity-95' to = {'/create-listing'}>
        create Listing
        </Link>
      </form>
      <div className='flex justify-between mt-5'>
          <span onClick={handleDeleteUser} className='text-red-700 cursor-pointer'>Delete account</span>
          <span onClick={handlelogout} className='text-red-700 cursor-pointer'>logout</span>
      </div>
      <p className='text-red-700'>{error ? error :""}</p>
      <p className='text-color-700'>{updateSuccess ? "succesfullu updated" :""}</p>
    </div>
  )
}
