const express = require('express')
const cors = require('cors')
const app = express()
const mongoose = require('mongoose')
const itemsRoutes=require('./routes/items')
const usersRoutes=require("./routes/users")
const cartRoutes=require("./routes/cart")
const port=4000


app.use(cors())
app.use(express.json())

app.use('/items',itemsRoutes)
app.use('/users',usersRoutes)
app.use('/cart',cartRoutes)

app.listen(port,()=>console.log(`Server running on port ${port}`))


mongoose.connect('mongodb://localhost:27017/onlinestore').then(()=>console.log('MongoDb connected')).catch(err=>console.log(err))
