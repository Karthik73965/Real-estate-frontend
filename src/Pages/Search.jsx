import React from 'react'

export default function Search() {
  return (
    <div className='flex flex-col md:flex-row '>
        <div className='p-7 border-b-2 md:border-r-2 md:min-h-screen'>
            <form className='flex flex-col gap-8' >
                <div className='flex items-center gap-2 '>
                    <label className='whitespace-nowrap'>Search Term</label>
                    <input type='text' placeholder='search Term' className='border rounded-lg p-3 w-full'/>
                </div>
                <div className='flex flex-wrap items-center gap-2'>
                    <label>Type :</label>
                    <div className='flex gap-2 '>
                        <input  className='w-5' type='checkbox' id='all'/>
                        <span>Rent  & Sale</span>
                    </div>
                    <div className='flex gap-2 '>
                        <input  className='w-5' type='checkbox' id='rent'/>
                        <span>Rent  </span>
                    </div>
                    <div className='flex gap-2 '>
                        <input  className='w-5' type='checkbox' id='sale'/>
                        <span> Sale</span>
                    </div>
                    <div className='flex gap-2 '>
                        <input  className='w-5' type='checkbox' id='offer'/>
                        <span>Offer</span>
                    </div>
                </div>
                <div className='flex flex-wrap items-center gap-2'>
                    <label>Aminities :</label>
                    <div className='flex gap-2 '>
                        <input  className='w-5' type='checkbox' id='parking'/>
                        <span>Parking</span>
                    </div>
                    <div className='flex gap-2 '>
                        <input  className='w-5' type='checkbox' id='furnished'/>
                        <span>Furnished</span>
                    </div>
                </div>
                <div className='flex items-center gap-2'>
                    <label>Sort :</label>
                    <select className='border rounded-lg p-3'>
                        <option>Price High to low </option>
                        <option>Price low to High </option>
                        <option>Latest </option>
                        <option>Oldest</option>
                    </select>
                </div>
                <button className='bg-slate-700 rounded-lg p-3 text-white hover:opacity-80'>Search</button>
            </form>
        </div>
        <div>
            <h1 className='p-3 font-bold text-3xl mt-5'>Listings :</h1>
        </div>
    </div>
  )
}
