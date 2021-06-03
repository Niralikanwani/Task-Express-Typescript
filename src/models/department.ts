// const mongoose = require('mongoose');
import mongoose from "mongoose";

const Schema = mongoose.Schema;

const departmentSchema = new Schema({
  deptname: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
});

// module.exports = mongoose.model('Department', departmentSchema);
export const Department = mongoose.model("Department", departmentSchema);