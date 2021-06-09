"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const express = require('express');
const express_1 = __importDefault(require("express"));
const check_1 = require("express-validator/check");
// const adminController = require('../controllers/admin');
const adminController = __importStar(require("../controllers/admin"));
// const isAuth = require('../middleware/is-auth');
const is_auth_1 = __importDefault(require("../middleware/is-auth"));
const upload_1 = require("../middleware/upload");
const adminRoutes = express_1.default.Router();
// /admin/add => GET
adminRoutes.get('/add-employee', is_auth_1.default, adminController.getAddEmployee);
adminRoutes.get('/add-department', is_auth_1.default, adminController.getAddDepartment);
// /admin/Findall => GET
adminRoutes.get('/employees', is_auth_1.default, adminController.getEmployees);
adminRoutes.get('/departments', is_auth_1.default, adminController.getDepartments);
// /admin/Findall => POST
adminRoutes.post('/postEmployees', is_auth_1.default, adminController.postEmployees);
adminRoutes.post('/postDepartments', is_auth_1.default, adminController.postDepartments);
// /admin/add => POST
adminRoutes.post('/add-employee', is_auth_1.default, upload_1.upload.single('image'), check_1.check('phonenumber', 'Please enter a mobile number with + sign and numeric values min 10 characters.')
    .escape()
    .exists({ checkFalsy: true })
    .isLength({ min: 10 })
    .matches(/^\+[1-9]{1}[0-9]{3,14}$/), adminController.postAddEmployee);
adminRoutes.post('/add-department', is_auth_1.default, adminController.postAddDepartment);
// /admin/edit => GET
adminRoutes.get('/edit-employee/:employeeId', is_auth_1.default, adminController.getEditEmployee);
adminRoutes.get('/edit-department/:departmentId', is_auth_1.default, adminController.getEditDepartment);
// /admin/edit => POST
adminRoutes.post('/edit-employee', is_auth_1.default, upload_1.upload.single('image'), check_1.check('phonenumber', 'Please enter a mobile number with + sign and numeric values min 10 characters.')
    .escape()
    .exists({ checkFalsy: true })
    .isLength({ min: 10 })
    .matches(/^\+[1-9]{1}[0-9]{3,14}$/), adminController.postEditEmployee);
adminRoutes.post('/edit-department', is_auth_1.default, adminController.postEditDepartment);
// /admin/delete => POST
adminRoutes.post('/delete-employee', is_auth_1.default, adminController.postDeleteEmployee);
adminRoutes.post('/delete-department', is_auth_1.default, adminController.postDeleteDepartment);
exports.default = adminRoutes;
