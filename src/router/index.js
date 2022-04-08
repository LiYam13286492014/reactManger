import React from 'react'
// import {BrowserRouter} from 'react-router-dom'
import { Routes,Route,Outlet } from 'react-router-dom';
import Box from '../Box';
import Login from '../views/login';


import { Navigate } from 'react-router-dom';

export default function IndexRouter() {

   
  return (
   
    <Routes>
      <Route path='/login' element={<Login/>} ></Route>
      {/* <Route path='/' element={<Box/>} ></Route> */}
      <Route path='/*' element={
         localStorage.getItem("tt")?
            <Box/>:<Navigate to='/login' />
            } >
      
      
    
    </Route>
    
    </Routes>

    // <Outlet/>
  )
}
