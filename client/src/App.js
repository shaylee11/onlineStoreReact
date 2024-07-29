import logo from './logo.svg';
import './App.css';
import Header from './components/header/Header';
import { useState,useEffect } from 'react';
import Product from './components/product/Product';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import SreachProduct from './components/sreachProduct/SreachProduct';
function App() {
  const [products,setProducts]=useState([])
  useEffect(()=>{

  const fetchProducts=async()=>{
    try {
      const product=await axios.get('http://localhost:4000/items/ListProducts');
      setProducts(product.data)
      
    } catch (error) {
      console.error(error)
      
    }
  }
  fetchProducts()
  },[])

  


  return (
    <div >
    <Header/>
    <SreachProduct setProducts={setProducts}/>
    {
      products.map(product=>{
        return(
          <Product product={product}/>
        )
       
      })
    }
   
    </div>
  );
}

export default App;
