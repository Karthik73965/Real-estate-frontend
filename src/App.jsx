import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import  Home  from './Pages/Home'
import { About } from './Pages/About'
import { Profile } from './Pages/Profile'
import { SignIn } from './Pages/SignIn'
import { SignUp    } from './Pages/SignUp'
import { Header } from './components/Header'
import { PrivateRoute } from './components/PrivateRoute'
import { CreateListing } from './Pages/CreateListing'
import { Updatelisting } from './Pages/updatelisting'
import Listing from './Pages/Listing'
import Search from './Pages/Search'

export const App = () => {
  return (
    <BrowserRouter>
      <Header/>   
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/about' element={<About/>}/>
          <Route path='/search' element={<Search/>}/>
          <Route element={<PrivateRoute/>}>
          <Route path='/profile' element={<Profile/>}/>          
          <Route path='/create-listing' element={<CreateListing/>}/>  
          <Route path='/update-listing/:listingID' element={<Updatelisting/>}/>
          </Route>
          <Route path='/Signin' element={<SignIn/>}/>
          <Route path='/SignUp' element={<SignUp/>}/>
          <Route path='/listing/:listingId' element={<Listing/>}/>
        </Routes>
   
    </BrowserRouter>
  )
}
