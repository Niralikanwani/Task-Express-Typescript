// const mongoose = require('mongoose');
import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
  fullname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});


// module.exports = mongoose.model('User', userSchema);
export const User = mongoose.model("User", userSchema);
