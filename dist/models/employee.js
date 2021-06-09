"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Employee = void 0;
// const mongoose = require('mongoose');
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const employeeSchema = new Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    phonenumber: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    department: {
        // type: Schema.Types.ObjectId,
        type: String,
        ref: 'Department',
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    }
});
// module.exports = mongoose.model('Employee', employeeSchema);
exports.Employee = mongoose_1.default.model("Employee", employeeSchema);
