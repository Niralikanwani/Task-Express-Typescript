// const express = require('express');
import express from 'express';
import { check } from 'express-validator/check';


// const adminController = require('../controllers/admin');
import * as adminController from '../controllers/admin';
// const isAuth = require('../middleware/is-auth');
import isAuth from '../middleware/is-auth';
import {upload} from '../middleware/upload';

const adminRoutes = express.Router();

// /admin/add => GET
adminRoutes.get('/add-employee', isAuth, adminController.getAddEmployee);
adminRoutes.get('/add-department', isAuth, adminController.getAddDepartment);

// /admin/Findall => GET
adminRoutes.get('/employees', isAuth, adminController.getEmployees);
adminRoutes.get('/departments', isAuth, adminController.getDepartments);

// /admin/Findall => POST
adminRoutes.post('/postEmployees', isAuth, adminController.postEmployees);
adminRoutes.post('/postDepartments', isAuth, adminController.postDepartments);

// /admin/add => POST
adminRoutes.post('/add-employee', 
    isAuth,
    upload.single('image'), 
    check('phonenumber', 'Please enter a mobile number with + sign and numeric values min 10 characters.')
    .escape()
    .exists({checkFalsy: true})
    .isLength({min: 10})
    .matches(/^\+[1-9]{1}[0-9]{3,14}$/) ,
    adminController.postAddEmployee);
adminRoutes.post('/add-department', isAuth, adminController.postAddDepartment);

// /admin/edit => GET
adminRoutes.get('/edit-employee/:employeeId', isAuth, adminController.getEditEmployee);
adminRoutes.get('/edit-department/:departmentId', isAuth, adminController.getEditDepartment);
 
// /admin/edit => POST
adminRoutes.post('/edit-employee', 
isAuth,
upload.single('image'),
check('phonenumber', 'Please enter a mobile number with + sign and numeric values min 10 characters.')
.escape()
.exists({checkFalsy: true})
.isLength({min: 10})
.matches(/^\+[1-9]{1}[0-9]{3,14}$/), adminController.postEditEmployee);
adminRoutes.post('/edit-department', isAuth, adminController.postEditDepartment);

// /admin/delete => POST
adminRoutes.post('/delete-employee', isAuth, adminController.postDeleteEmployee);
adminRoutes.post('/delete-department', isAuth, adminController.postDeleteDepartment);

export default adminRoutes;
