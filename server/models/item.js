const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProductSchema = new Schema ({
  name:{
    type:String,
    requried:true
  }, 
  price:{
    type:Number,
    requried:true
  },description:{
    type:String,
    requried:true
  },category:{
    type: String,
    requried:true
  },
  image:{
    type:String,
    require:true

  }
},{timestamps:true})

module.exports = mongoose.model("Product",ProductSchema)