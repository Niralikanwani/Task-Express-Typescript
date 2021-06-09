"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Department = void 0;
// const mongoose = require('mongoose');
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
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
exports.Department = mongoose_1.default.model("Department", departmentSchema);
