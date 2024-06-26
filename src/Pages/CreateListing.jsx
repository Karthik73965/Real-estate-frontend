import { useState } from "react"
import {
    getDownloadURL,
    getStorage,
    ref,
    uploadBytesResumable,
  } from 'firebase/storage';
import {app} from '../firebase.js'
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


export const CreateListing = () => {
    const {currentUser} = useSelector((state)=>state.user)
    const [files,setfiles] = useState([])
    const [imageUploadError, setImageUploadError] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState(false);
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false);
    const [formData , setFormData] = useState({ 
        imageUrls:[],
        name:"",
        description:"this was a good property",
        address:"",
        type:"rent",
        bedrooms:1,
        bathrooms:1,
        regularprice:10000,
        discountprice:0,
        offer:false,
        parking:false,
        furnished:false,
        })
    console.log(formData)

    const handleImageSubmit = (e) => {
        if (files.length > 0 && files.length + formData.imageUrls.length < 7) {
          setUploading(true);
          setImageUploadError(false);
          const promises = [];
    
          for (let i = 0; i < files.length; i++) {
            promises.push(storeImage(files[i]));
          }
          Promise.all(promises)
            .then((urls) => {
              setFormData({
                ...formData,
                imageUrls: formData.imageUrls.concat(urls),
              });
              setImageUploadError(false);
              setUploading(false);
            })
            .catch((err) => {
              setImageUploadError('Image upload failed (2 mb max per image)');
              setUploading(false);
            });
        } else {
          setImageUploadError('You can only upload 6 images per listing');
          setUploading(false);
        }
      };

    const storeImage = async (file) => {
        return new Promise((resolve, reject) => {
          const storage = getStorage(app);
          const fileName = new Date().getTime() + file.name;
          const storageRef = ref(storage, fileName);
          const uploadTask = uploadBytesResumable(storageRef, file);
          uploadTask.on(
            'state_changed',
            (snapshot) => {
              const progress =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              console.log(`Upload is ${progress}% done`);
            },
            (error) => {
              reject(error);
            },
            () => {
              getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                resolve(downloadURL);
              });
            }
          );
        });
      };

      const handleRemoveImage= (index)=>{
        setFormData({
            ...formData,imageUrls: formData.imageUrls.filter((_,i)=>i !== index )
        })
      }
      const handleChange = (e)=>{
          if(e.target.id==='sale'|| e.target.id==='rent')  {
                setFormData({
                ...formData,
                type:e.target.id
            })}
            if(e.target.id === 'parking' || e.target.id === 'furnished' || e.target.id === 'offer'){
              setFormData({
                ...formData,
               [e.target.id] :e.target.checked
              })
            }
            if(e.target.type ==='number' || e.target.type==='text'|| e.target.type==='textarea'){
              setFormData({
                ...formData,
                [e.target.id]:e.target.value
              })
            }
      }

      const handlesubmit =async(e)=>{
        e.preventDefault();
        try {
          if (formData.imageUrls.length < 1)
          return setError('You must upload at least one image');
        if (+formData.regularprice < +formData.discountPrice)
          return setError('Discount price must be lower than regular price');
          setError(false)
          setLoading(true)
          const res = await fetch('/api/listing/create',{
            method:'POST',
            headers:{
              'Content-Type':'application/json'
            },
            body: JSON.stringify({
              ...formData,
              userRef:currentUser._id
            })

          }
          )
          const data = await   res.json()
          navigate(`/listing/${data._id}`)
        } catch (error) {
          console.log(error)
        }
      }
  return (
    <main className="p-3  max-w-4xl mx-auto ">
        <h1 className="uppercase  text-3xl font-semibold text-center my-7 ">Create Listing</h1>
        <form onSubmit={handlesubmit} className="flex flex-col gap-4 sm:flex-row">
          <div className="flex flex-col gap-4 flex-1 ">
            <input onChange={handleChange} value={formData.name} type="text" placeholder="Name"  className="boder p-3 rounded-lg  " id="name" maxLength='62' minLength='10' required />
            <textarea  onChange={handleChange} value={formData.description} type="text" placeholder="description"  className="boder p-3 rounded-lg  " id="description" required />
            <input  onChange={handleChange} value={formData.address}  type="text" placeholder="Address"  className="boder p-3 rounded-lg  " id="address" maxLength='62' minLength='10' required />
            <div className="flex flex-wrap gap-6">
            <div className="flex gap-2">
                <input onChange={handleChange} checked={formData.type === 'sale'}  type="checkbox" id="sale" className="w-5"/>
                <span>sale</span>
            </div>
            <div className="flex gap-2">
                <input onChange={handleChange} checked={formData.type === 'rent'} type="checkbox" id="rent" className="w-5"/>
                <span>Rent</span>
            </div>
            <div className="flex gap-2">
                <input onChange={handleChange} value={formData.parking} type="checkbox" id="parking" className="w-5"/>
                <span>Parking spot</span>
            </div>
            <div className="flex gap-2">
                <input onChange={handleChange} value={formData.furnished} type="checkbox" id="furnished" className="w-5"/>
                <span>Furnished</span>
            </div>
            <div className="flex gap-2">
                <input onChange={handleChange} value={formData.offer} type="checkbox" id="offer" className="w-5"/>
                <span>Offer</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-6">
                <div className="flex items-center gap-2 ">
                    <input onChange={handleChange} value={formData.bedrooms} type="number"  id="bedrooms" min="1" max="10" required className="p-3 border border-gray-300  rounded-lg " />
                    <p>Beds</p>
                </div>
                <div className="flex items-center gap-2 ">
                    <input onChange={handleChange} value={formData.bathrooms} type="number"  id="bathrooms" min="1" max="10" required className="p-3 border border-gray-300  rounded-lg " />
                    <p>Baths</p>
                </div>
                <div className="flex items-center gap-2 ">
                    <input onChange={handleChange} value={formData.regularprice} type="number"  id="regularprice" min="1" max="10000000000" required className="p-3 border border-gray-300  rounded-lg " />
                    <div className="flex flex-col items-center">
                     <p>Regular price</p>
                     <span>($/month)</span>
                     </div>
                </div>
               {formData.offer &&( <div className="flex items-center gap-2 ">
                    <input onChange={handleChange} value={formData.discountprice} type="number"  id="discountprice" min="1" max="100000" required className="p-3 border border-gray-300  rounded-lg " />
                    <div className="flex flex-col items-center">
                     <p>Discounted price</p>
                     <span>($/month)</span>
                     </div>
                </div>)}
          </div>
          </div>
          <div className="flex flex-col flex-1  gap-4">
            <p className="font- font-semibold">Images:
                <span className="font-normal text-gray-700 ml-2">The  first image will be the cover (max - 6) </span>
            </p>
            <div className="flex gap-4">
                <input onChange={(e)=>setfiles(e.target.files)} type="file" accept="images/*" multiple id="images" className="p-3 border border-green-700"/>
                <button disabled={uploading} type="button" onClick={handleImageSubmit} className="p-3 text-green-700 border  border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80">
                   <p> {uploading ?"uploading":"upload"}</p>
                </button>
                 </div>
                 <p className="text-sm text-red-700">{imageUploadError && imageUploadError}</p>
                 {formData.imageUrls.length > 0 &&
            formData.imageUrls.map((url, index) => (
              <div
                key={url}
                className='flex justify-between p-3 border items-center'
              >
                <img
                  src={url}
                  alt='listing image'
                  className='w-20 h-20 object-contain rounded-lg'
                />
                <button
                  type='button'
                  onClick={() => handleRemoveImage(index)}
                  className='p-3 text-red-700 rounded-lg uppercase hover:opacity-75'
                >
                  Delete
                </button>
              </div>
            ))}
            <button className=" text-center p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled opacity-80">create listing </button>
            <p className="text-red-700" >{error ?`${error}`:""}</p>
          </div>
        </form>
    </main>
  )
}
