import path from 'path';
import { validationResult } from 'express-validator/check';
// const Employee = require('../models/employee');
import { Employee } from '../models/employee';
// const Department = require('../models/department');
import { Department } from '../models/department';

const ITEMS_PER_PAGE = 5;

export const getEmployees = async (req: any, res: any, next: any) => {
  try {
    const page = +req.query.page || 1 as number;
    let totalEmployees: number;
    
    totalEmployees = await Employee.find().countDocuments();
    const employees = await Employee.find()
    .sort({firstname: 1})
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
      lastPage: Math.ceil(totalEmployees/ITEMS_PER_PAGE)
    });
    
  } catch (error) {
    console.log(error);
  }

};

export const getDepartments = async (req: any, res: any, next: any) => {
  try {
    const page = +req.query.page || 1 as number;
    let totalDepartments: number;

    totalDepartments = await Department.find().countDocuments();
    const departments = await Department.find()
    .sort({deptname: 1})
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
      lastPage: Math.ceil(totalDepartments/ITEMS_PER_PAGE)
    });

  } catch (error) {
    console.log(error);
  }
};

export const postEmployees = async (req: any, res: any, next: any) => {
  try {
    const page = +req.query.page || 1 as number;
    const sortby = req.body.department as any;
    const sorttype = req.body.radio as HTMLInputElement;
    let totalEmployees: number;
    
    totalEmployees = await Employee.find().countDocuments();
    const employees = await Employee.find()
    .sort({[sortby]: sorttype})
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
      lastPage: Math.ceil(totalEmployees/ITEMS_PER_PAGE)
    });
    
  } catch (error) {
    console.log(error);
  }

};

export const postDepartments = async (req: any, res: any, next: any) => {
  try {
    const page = +req.query.page || 1 as number;
    const sorttype = req.body.radio as HTMLInputElement;
    let totalDepartments: number;

    totalDepartments = await Department.find().countDocuments();
    const departments = await Department.find()
    .sort({deptname: sorttype})
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
      lastPage: Math.ceil(totalDepartments/ITEMS_PER_PAGE)
    });

  } catch (error) {
    console.log(error);
  }
};

export const getAddEmployee = async (req: any, res: any, next: any) => {
  try {
    const departments = await Department.find();

    let message = req.flash('error') as String;

    if (message.length > 0) {
      message = message[0];
    } else {
      message = null;
    }

    res.render('admin/edit-employee', {
      depts: departments,
      pageTitle: 'Add Employee',
      path: '/admin/add-employee',
      editing: false,
      errorMessage: message
    });

  } catch (error) {
    console.log(error);
  }
    
};

export const getAddDepartment = async (req: any, res: any, next: any) => {
  try {
    res.render('admin/edit-department', {
      pageTitle: 'Add Department',
      path: '/admin/add-department',
      editing: false
    });
  } catch (error) {
    console.log(error);
  }
};

export const postAddEmployee = async (req: any, res: any, next: any) => {
  const firstname = req.body.firstname as HTMLInputElement;
  const lastname = req.body.lastname as HTMLInputElement;
  const phonenumber = req.body.phonenumber as HTMLInputElement;
  const email = req.body.email as HTMLInputElement;
  const department = req.body.department as HTMLSelectElement;
  const image = req.file as any;
  if (!image) {
    const departments = await Department.find();
    return res.status(422).render('admin/edit-employee', {
      depts: departments,
      path: '/admin/add-employee',
      pageTitle: 'Add Employee',
      editing: false,
      errorMessage: 'Attached file is not an image.',
      validationErrors: []
    });
  }
  const errors = validationResult(req);
  
  try {
    if(!errors.isEmpty()){
      const departments = await Department.find();
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

    const employee = new Employee({
      firstname: firstname,
      lastname: lastname,
      phonenumber: phonenumber,
      email: email,
      department:department,
      imageUrl : imagePath,
      userId: req.user
    });

    const result = await employee.save();

    res.redirect('/admin/employees');

  } catch (error) {
    console.log(error);
  }

};

export const postAddDepartment = async (req: any, res: any, next: any) => {
  const deptname = req.body.deptname as HTMLInputElement;
  const description = req.body.description as HTMLInputElement;  

  try {
    const department = new Department({
      deptname: deptname,
      description:description,
      userId: req.user
    });

    const result = await department.save();

    res.redirect('/admin/departments');

  } catch (error) {
    console.log(error);
  }
};

export const getEditEmployee = async (req: any, res: any, next: any) => {
  const editMode = req.query.edit;

  if (!editMode) {
    return res.redirect('/');
  }

  const empId = req.params.employeeId;

  try {
    const employee = await Employee.findById(empId);

    if (!employee) {
      return res.redirect('/');
    }

    const departments = await Department.find();

    let message = req.flash('error') as String;

    if (message.length > 0) {
      message = message[0];
    } else {
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

  } catch (error) {
    console.log(error);
  }
  
};

export const getEditDepartment = async (req: any, res: any, next: any) => {
  const editMode = req.query.edit;

  if (!editMode) {
    return res.redirect('/');
  }

  const deptId = req.params.departmentId;

  try {
    const department = await Department.findById(deptId);

    if (!department) {
      return res.redirect('/');
    }

    res.render('admin/edit-department', {
      pageTitle: 'Edit Department',
      path: '/admin/edit-department',
      editing: editMode,
      department: department
    });

  } catch (error) {
    console.log(error);
  }
};

export const postEditEmployee = async (req: any, res: any, next: any) => {
  
  const updatedfirstname = req.body.firstname as HTMLInputElement;
  const updatedlastname = req.body.lastname as HTMLInputElement;
  const updatedphonenumber = req.body.phonenumber as HTMLInputElement;
  const updatedemail = req.body.email as HTMLInputElement;
  const updateddepartment = req.body.department as HTMLSelectElement;
  const errors = validationResult(req);
  const editMode = req.query.edit;
    
  try {
    if (!editMode) {
      return res.redirect('/');
    }
    const empId = req.body.employeeId;
    const employe = await Employee.findById(empId) as any;
  
    if (!employe) {
      return res.redirect('/');
    }

    if(!errors.isEmpty()){
      const departments = await Department.find();
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

    const employee = await Employee.findById(empId) as any;

      employee.firstname = updatedfirstname;
      employee.lastname = updatedlastname;
      employee.phonenumber = updatedphonenumber;
      employee.email = updatedemail;
      employee.department = updateddepartment;

      const updatedemployee = await employee.save();

      res.redirect('/admin/employees');
  } catch (error) {
    console.log(error);
  }
};

export const postEditDepartment= async (req: any, res: any, next: any) => {
  const deptId = req.body.departmentId;
  const updateddeptname = req.body.deptname as HTMLInputElement;
  const updateddescription = req.body.description as HTMLInputElement;

  try {
    const department = await Department.findById(deptId) as any;

    department.deptname = updateddeptname;
    department.description = updateddescription;
      
    const updateddepartment = await department.save();

    res.redirect('/admin/departments');
  } catch (error) {
    console.log(error);
  }
};

export const postDeleteEmployee= async (req: any, res: any, next: any) => {
  const empId = req.body.employeeId;

  try {
    const deleteemployee = await Employee.findByIdAndRemove(empId);

    res.redirect('/admin/employees');
  } catch (error) {
    console.log(error);
  }
};

export const postDeleteDepartment = async (req: any, res: any, next: any) => {
  const deptId = req.body.departmentId;

  try {
    const deletedepartment = await Department.findByIdAndRemove(deptId);

    res.redirect('/admin/departments');
  } catch (error) {
    console.log(error);
  }
};