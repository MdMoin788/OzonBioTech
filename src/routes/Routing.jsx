
import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Home } from '../pages//Home'
import { Navbar } from '../components/navbar/Navbar'
import { ProductDetail } from '../pages/ProductDetail'
import {Search} from '../pages/Search'
import { Login } from '../pages/Login'
import { Register } from '../pages/Register'
import { Profile } from '../pages/Profile'

export const Routing = () => {
  return (
    <div className='routing'>
      <Navbar />
      <Routes>
        <Route path='/' element={ <Home/> }/>
        <Route path='/products' element={ <Search/> }/>
        <Route path='/login' element={ <Login/> }/>
        <Route path='/profile' element={ <Profile/> }/>
        <Route path='/register' element={ <Register/> }/>
        <Route path='/contact-us' element={<Home />} />
        <Route path='/product/:id' element={<ProductDetail />} />
        <Route path='/search' element={ <Search/> } />
        <Route path='*' element={ <h1>No Page Found</h1> } />
      </Routes>
    </div>
  )
}
