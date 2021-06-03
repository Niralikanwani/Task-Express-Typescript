// const path = require('path');
import path from 'path'

// const express = require('express');
import express from 'express';

const adminController = require('../controllers/admin');
// import * as adminController from '../controllers/admin';
const isAuth = require('../middleware/is-auth');
// import * as isAuth from '../middleware/is-auth';

const adminRoutes = express.Router();

// /admin/add => GET
adminRoutes.get('/add-employee', isAuth, adminController.getAddEmployee);
adminRoutes.get('/add-department', isAuth, adminController.getAddDepartment);

// /admin/Findall => GET
adminRoutes.get('/employees', isAuth, adminController.getEmployees);
adminRoutes.get('/departments', isAuth, adminController.getDepartments);

// /admin/add => POST
adminRoutes.post('/add-employee', isAuth, adminController.postAddEmployee);
adminRoutes.post('/add-department', isAuth, adminController.postAddDepartment);

// /admin/edit => GET
adminRoutes.get('/edit-employee/:employeeId', isAuth, adminController.getEditEmployee);
adminRoutes.get('/edit-department/:departmentId', isAuth, adminController.getEditDepartment);

// /admin/edit => POST
adminRoutes.post('/edit-employee', isAuth, adminController.postEditEmployee);
adminRoutes.post('/edit-department', isAuth, adminController.postEditDepartment);

// /admin/delete => POST
adminRoutes.post('/delete-employee', isAuth, adminController.postDeleteEmployee);
adminRoutes.post('/delete-department', isAuth, adminController.postDeleteDepartment);

export default adminRoutes;
