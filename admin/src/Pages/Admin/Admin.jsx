import React from 'react'
import './Admin.css'
import Sidebar from '../../Components/Sidebar/Sidebar'
import { Routes, Route } from 'react-router-dom'
import AddProduct from '../../Components/AddProduct/AddProduct'
import ListProduct from '../../Components/ListProduct/ListProduct'

const Admin = () => {
  return (
    <div className='admin'>
        <Sidebar />
        {/* This Routes element from react-router-dom are the different routes a user can take through the website.
        Each Route tag is a different path, with the path name defined and the element (Component we created) that
        is the destination of the path add */}
        <Routes>
            <Route path='/addproduct' element={<AddProduct />}/>
            <Route path='/listproduct' element={<ListProduct />}/>
        </Routes>
    </div>
  )
}

export default Admin