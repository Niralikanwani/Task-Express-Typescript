"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postDeleteDepartment = exports.postDeleteEmployee = exports.postEditDepartment = exports.postEditEmployee = exports.getEditDepartment = exports.getEditEmployee = exports.postAddDepartment = exports.postAddEmployee = exports.getAddDepartment = exports.getAddEmployee = exports.postDepartments = exports.postEmployees = exports.getDepartments = exports.getEmployees = void 0;
const check_1 = require("express-validator/check");
// const Employee = require('../models/employee');
const employee_1 = require("../models/employee");
// const Department = require('../models/department');
const department_1 = require("../models/department");
const ITEMS_PER_PAGE = 5;
const getEmployees = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const page = +req.query.page || 1;
        let totalEmployees;
        totalEmployees = yield employee_1.Employee.find().countDocuments();
        const employees = yield employee_1.Employee.find()
            .sort({ firstname: 1 })
            .skip((page - 1) * ITEMS_PER_PAGE)
            .limit(ITEMS_PER_PAGE);
        res.render('admin/employees', {
            emps: employees,
            pageTitle: 'Employees',
            path: '/admin/employees',
            currentPage: page,
            hasNextPage: ITEMS_PER_PAGE * page < totalEmployees,
            hasPreviousPage: page > 1,
            nextPage: page + 1,
            previousPage: page - 1,
            lastPage: Math.ceil(totalEmployees / ITEMS_PER_PAGE)
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.getEmployees = getEmployees;
const getDepartments = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const page = +req.query.page || 1;
        let totalDepartments;
        totalDepartments = yield department_1.Department.find().countDocuments();
        const departments = yield department_1.Department.find()
            .sort({ deptname: 1 })
            .skip((page - 1) * ITEMS_PER_PAGE)
            .limit(ITEMS_PER_PAGE);
        res.render('admin/departments', {
            depts: departments,
            // count: 0,
            pageTitle: 'Departments',
            path: '/admin/departments',
            currentPage: page,
            hasNextPage: ITEMS_PER_PAGE * page < totalDepartments,
            hasPreviousPage: page > 1,
            nextPage: page + 1,
            previousPage: page - 1,
            lastPage: Math.ceil(totalDepartments / ITEMS_PER_PAGE)
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.getDepartments = getDepartments;
const postEmployees = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const page = +req.query.page || 1;
        const sortby = req.body.department;
        const sorttype = req.body.radio;
        let totalEmployees;
        totalEmployees = yield employee_1.Employee.find().countDocuments();
        const employees = yield employee_1.Employee.find()
            .sort({ [sortby]: sorttype })
            .skip((page - 1) * ITEMS_PER_PAGE)
            .limit(ITEMS_PER_PAGE);
        res.render('admin/employees', {
            emps: employees,
            pageTitle: 'Employees',
            path: '/admin/employees',
            currentPage: page,
            hasNextPage: ITEMS_PER_PAGE * page < totalEmployees,
            hasPreviousPage: page > 1,
            nextPage: page + 1,
            previousPage: page - 1,
            lastPage: Math.ceil(totalEmployees / ITEMS_PER_PAGE)
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.postEmployees = postEmployees;
const postDepartments = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const page = +req.query.page || 1;
        const sorttype = req.body.radio;
        let totalDepartments;
        totalDepartments = yield department_1.Department.find().countDocuments();
        const departments = yield department_1.Department.find()
            .sort({ deptname: sorttype })
            .skip((page - 1) * ITEMS_PER_PAGE)
            .limit(ITEMS_PER_PAGE);
        res.render('admin/departments', {
            depts: departments,
            // count: 0,
            pageTitle: 'Departments',
            path: '/admin/departments',
            currentPage: page,
            hasNextPage: ITEMS_PER_PAGE * page < totalDepartments,
            hasPreviousPage: page > 1,
            nextPage: page + 1,
            previousPage: page - 1,
            lastPage: Math.ceil(totalDepartments / ITEMS_PER_PAGE)
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.postDepartments = postDepartments;
const getAddEmployee = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const departments = yield department_1.Department.find();
        let message = req.flash('error');
        if (message.length > 0) {
            message = message[0];
        }
        else {
            message = null;
        }
        res.render('admin/edit-employee', {
            depts: departments,
            pageTitle: 'Add Employee',
            path: '/admin/add-employee',
            editing: false,
            errorMessage: message
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.getAddEmployee = getAddEmployee;
const getAddDepartment = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.render('admin/edit-department', {
            pageTitle: 'Add Department',
            path: '/admin/add-department',
            editing: false
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.getAddDepartment = getAddDepartment;
const postAddEmployee = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const phonenumber = req.body.phonenumber;
    const email = req.body.email;
    const department = req.body.department;
    const image = req.file;
    if (!image) {
        const departments = yield department_1.Department.find();
        return res.status(422).render('admin/edit-employee', {
            depts: departments,
            path: '/admin/add-employee',
            pageTitle: 'Add Employee',
            editing: false,
            errorMessage: 'Attached file is not an image.',
            validationErrors: []
        });
    }
    const errors = check_1.validationResult(req);
    try {
        if (!errors.isEmpty()) {
            const departments = yield department_1.Department.find();
            console.log(errors.array());
            return res.status(422).render('admin/edit-employee', {
                depts: departments,
                path: '/admin/add-employee',
                pageTitle: 'Add Employee',
                editing: false,
                errorMessage: errors.array()[0].msg,
            });
        }
        const imagePath = image.path;
        const employee = new employee_1.Employee({
            firstname: firstname,
            lastname: lastname,
            phonenumber: phonenumber,
            email: email,
            department: department,
            imageUrl: imagePath,
            userId: req.user
        });
        const result = yield employee.save();
        res.redirect('/admin/employees');
    }
    catch (error) {
        console.log(error);
    }
});
exports.postAddEmployee = postAddEmployee;
const postAddDepartment = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const deptname = req.body.deptname;
    const description = req.body.description;
    try {
        const department = new department_1.Department({
            deptname: deptname,
            description: description,
            userId: req.user
        });
        const result = yield department.save();
        res.redirect('/admin/departments');
    }
    catch (error) {
        console.log(error);
    }
});
exports.postAddDepartment = postAddDepartment;
const getEditEmployee = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const editMode = req.query.edit;
    if (!editMode) {
        return res.redirect('/');
    }
    const empId = req.params.employeeId;
    try {
        const employee = yield employee_1.Employee.findById(empId);
        if (!employee) {
            return res.redirect('/');
        }
        const departments = yield department_1.Department.find();
        let message = req.flash('error');
        if (message.length > 0) {
            message = message[0];
        }
        else {
            message = null;
        }
        res.render('admin/edit-employee', {
            depts: departments,
            pageTitle: 'Edit Employee',
            path: '/admin/edit-employee',
            editing: editMode,
            employee: employee,
            errorMessage: message
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.getEditEmployee = getEditEmployee;
const getEditDepartment = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const editMode = req.query.edit;
    if (!editMode) {
        return res.redirect('/');
    }
    const deptId = req.params.departmentId;
    try {
        const department = yield department_1.Department.findById(deptId);
        if (!department) {
            return res.redirect('/');
        }
        res.render('admin/edit-department', {
            pageTitle: 'Edit Department',
            path: '/admin/edit-department',
            editing: editMode,
            department: department
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.getEditDepartment = getEditDepartment;
const postEditEmployee = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedfirstname = req.body.firstname;
    const updatedlastname = req.body.lastname;
    const updatedphonenumber = req.body.phonenumber;
    const updatedemail = req.body.email;
    const updateddepartment = req.body.department;
    const errors = check_1.validationResult(req);
    const editMode = req.query.edit;
    try {
        if (!editMode) {
            return res.redirect('/');
        }
        const empId = req.body.employeeId;
        const employe = yield employee_1.Employee.findById(empId);
        if (!employe) {
            return res.redirect('/');
        }
        if (!errors.isEmpty()) {
            const departments = yield department_1.Department.find();
            console.log(errors.array());
            return res.status(422).render('admin/edit-employee', {
                depts: departments,
                pageTitle: 'Edit Employee',
                path: '/admin/edit-employee',
                editing: editMode,
                employee: employe,
                errorMessage: errors.array()[0].msg,
            });
        }
        const employee = yield employee_1.Employee.findById(empId);
        employee.firstname = updatedfirstname;
        employee.lastname = updatedlastname;
        employee.phonenumber = updatedphonenumber;
        employee.email = updatedemail;
        employee.department = updateddepartment;
        const updatedemployee = yield employee.save();
        res.redirect('/admin/employees');
    }
    catch (error) {
        console.log(error);
    }
});
exports.postEditEmployee = postEditEmployee;
const postEditDepartment = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const deptId = req.body.departmentId;
    const updateddeptname = req.body.deptname;
    const updateddescription = req.body.description;
    try {
        const department = yield department_1.Department.findById(deptId);
        department.deptname = updateddeptname;
        department.description = updateddescription;
        const updateddepartment = yield department.save();
        res.redirect('/admin/departments');
    }
    catch (error) {
        console.log(error);
    }
});
exports.postEditDepartment = postEditDepartment;
const postDeleteEmployee = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const empId = req.body.employeeId;
    try {
        const deleteemployee = yield employee_1.Employee.findByIdAndRemove(empId);
        res.redirect('/admin/employees');
    }
    catch (error) {
        console.log(error);
    }
});
exports.postDeleteEmployee = postDeleteEmployee;
const postDeleteDepartment = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const deptId = req.body.departmentId;
    try {
        const deletedepartment = yield department_1.Department.findByIdAndRemove(deptId);
        res.redirect('/admin/departments');
    }
    catch (error) {
        console.log(error);
    }
});
exports.postDeleteDepartment = postDeleteDepartment;
