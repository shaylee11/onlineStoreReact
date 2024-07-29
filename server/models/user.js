const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    requried: true,
  },
  email: {
    type: String,
    requried: true,
  },
  password: {
    type: String,
    requried: true,
  },
  isAdmin:{
    type: Boolean,
    requried: false,
    default:false
  }
},{timestamps:true});

module.exports = mongoose.model("User", UserSchema);
