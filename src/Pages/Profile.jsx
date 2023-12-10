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

export const Profile = () => {
  const {currentUser} = useSelector((state)=>state.user)
  console.log(currentUser)
  const fileref = useRef(null)
  const [file , setfile] = useState(undefined)
 
  const[fileperc,setfileperc] = useState(0)
  const [uploadError , setuploaderror] = useState(false)
  const [formData,setformData] = useState({})
  console.log(formData)
  console.log(uploadError)
  console.log(fileperc)

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
  return (
    <div className='p-3 mx-auto max-w-lg'>
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
      <form  className='flex flex-col '>
        <input onChange={(e)=>setfile(e.target.files[0])} type='file' ref={fileref} hidden accept='image/*'/>
        <img onClick={()=>{fileref.current.click()}} src={formData.avatar || currentUser.avatar} className='rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2'  alt='profile'/>
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
