// const path = require('path');
import path from 'path';

// const express = require('express');
import express from 'express';

const homeController = require('../controllers/home');
// const authController = require('../controllers/auth');
// const adminController = require('../controllers/admin');

// const isAuth = require('../middleware/is-auth');

const homeRoutes = express.Router();

homeRoutes.get('/', homeController.getIndex);

// homeRoutes.get('/login', authController.getLogin);

// homeRoutes.get('/signup', authController.getSignup);

// homeRoutes.post('/login', authController.postLogin);

// homeRoutes.post('/signup', authController.postSignup);

// homeRoutes.post('/logout', authController.postLogout);

// // /admin/add => GET
// homeRoutes.get('/admin/add-employee', isAuth, adminController.getAddEmployee);
// homeRoutes.get('/admin/add-department', isAuth, adminController.getAddDepartment);

// // /admin/Findall => GET
// homeRoutes.get('/admin/employees', isAuth, adminController.getEmployees);
// homeRoutes.get('/admin/departments', isAuth, adminController.getDepartments);

// // /admin/add => POST
// homeRoutes.post('/admin/add-employee', isAuth, adminController.postAddEmployee);
// homeRoutes.post('/admin/add-department', isAuth, adminController.postAddDepartment);

// // /admin/edit => GET
// homeRoutes.get('/admin/edit-employee/:employeeId', isAuth, adminController.getEditEmployee);
// homeRoutes.get('/admin/edit-department/:departmentId', isAuth, adminController.getEditDepartment);

// // /admin/edit => POST
// homeRoutes.post('/admin/edit-employee', isAuth, adminController.postEditEmployee);
// homeRoutes.post('/admin/edit-department', isAuth, adminController.postEditDepartment);

// // /admin/delete => POST
// homeRoutes.post('/admin/delete-employee', isAuth, adminController.postDeleteEmployee);
// homeRoutes.post('/admin/delete-department', isAuth, adminController.postDeleteDepartment);


export default homeRoutes;
