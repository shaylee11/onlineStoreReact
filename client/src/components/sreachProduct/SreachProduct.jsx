import axios from 'axios'
import React from 'react'
import { Button, Drawer, Typography } from '@mui/material'
const SreachProduct = ({setProducts}) => {
    const [products, setProducts] = useState([]); const [categoryQuery, setCategoryQuery] = useState(''); const [minPrice, setMinPrice] = useState(''); const [maxPrice, setMaxPrice] = useState('');
  
    const handleSreach=async (e)=>{
        e.preventDefault();

        try {
            const response=await axios.get('http://localhost:4000/items/SearchProducts'),{
                params:{
                    catrgory:categoryQuery,
                    
                }

            }


        } catch (error) {
            
        }
    }
  return (
    <div>
        <Button>
            Open
        </Button>
        <Drawer anchor='left'>
            <Typography variant='h6'>
                Sreach Products
            </Typography>

        </Drawer>
    </div>
  )
}

export default SreachProduct