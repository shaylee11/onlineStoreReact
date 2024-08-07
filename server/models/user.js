const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin:{
    type: Boolean,
    required: false,
    default:false
  }
},{timestamps:true});

module.exports = mongoose.model("User", UserSchema);
