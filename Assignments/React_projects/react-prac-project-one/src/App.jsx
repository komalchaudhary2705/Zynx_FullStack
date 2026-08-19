import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import Products from './pages/Products/Products';
import DetailProduct from './pages/DetailProduct/DetailProduct';

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/products" element={<Products/>}/>
        <Route path="/product/:id" element={<DetailProduct/>}/>
      </Routes>
    </>
  )
}

export default App
