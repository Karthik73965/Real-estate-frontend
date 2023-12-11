

export const CreateListing = () => {
  return (
    <main className="p-3  max-w-4xl mx-auto ">
        <h1 className="uppercase  text-3xl font-semibold text-center my-7 ">Create Listing</h1>
        <form className="flex flex-col gap-4 sm:flex-row">
          <div className="flex flex-col gap-4 flex-1 ">
            <input type="text" placeholder="Name"  className="boder p-3 rounded-lg  " id="name" maxLength='62' minLength='10' required />
            <textarea type="text" placeholder="description"  className="boder p-3 rounded-lg  " id="description" required />
            <input type="text" placeholder="Address"  className="boder p-3 rounded-lg  " id="address" maxLength='62' minLength='10' required />
            <div className="flex flex-wrap gap-6">
            <div className="flex gap-2">
                <input type="checkbox" id="sale" className="w-5"/>
                <span>sale</span>
            </div>
            <div className="flex gap-2">
                <input type="checkbox" id="rent" className="w-5"/>
                <span>Rent</span>
            </div>
            <div className="flex gap-2">
                <input type="checkbox" id="parking" className="w-5"/>
                <span>Parking spot</span>
            </div>
            <div className="flex gap-2">
                <input type="checkbox" id="furnished" className="w-5"/>
                <span>Furnished</span>
            </div>
            <div className="flex gap-2">
                <input type="checkbox" id="offer" className="w-5"/>
                <span>Offer</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-6">
                <div className="flex items-center gap-2 ">
                    <input type="number"  id="bedrooms" min="1" max="10" required className="p-3 border border-gray-300  rounded-lg " />
                    <p>Beds</p>
                </div>
                <div className="flex items-center gap-2 ">
                    <input type="number"  id="bathrooms" min="1" max="10" required className="p-3 border border-gray-300  rounded-lg " />
                    <p>Baths</p>
                </div>
                <div className="flex items-center gap-2 ">
                    <input type="number"  id="regularprice" min="1" max="10" required className="p-3 border border-gray-300  rounded-lg " />
                    <div className="flex flex-col items-center">
                     <p>Regular price</p>
                     <span>($/month)</span>
                     </div>
                </div>
                <div className="flex items-center gap-2 ">
                    <input type="number"  id="discountedprice" min="1" max="10" required className="p-3 border border-gray-300  rounded-lg " />
                    <div className="flex flex-col items-center">
                     <p>Discounted price</p>
                     <span>($/month)</span>
                     </div>
                </div>
          </div>
          </div>
          <div className="flex flex-col flex-1  gap-4">
            <p className="font- font-semibold">Images:
                <span className="font-normal text-gray-700 ml-2">The  first image will be the cover (max - 6) </span>
            </p>
            <div className="flex gap-4">
                <input type="file" accept="images/*" multiple id="images" className="p-3 border border-green-700"/>
                <button className="p-3 text-green-700 border  border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80">Upload </button>
                 </div>
            <butoon className=" text-center p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled opacity-80">create listing </butoon>
          </div>
        </form>
    </main>
  )
}
