import { NextFunction } from "express";

// const Employee = require('../models/employee');
import { Employee } from '../models/employee';
// const Department = require('../models/department');
import { Department } from '../models/department';

const ITEMS_PER_PAGE = 5;

export const getEmployees = (req: any, res: any, next: any) => {
  const page = +req.query.page || 1 as number;
  let totalEmployees: number;
  Employee.find().countDocuments().then((numEmployees: number) => {
    totalEmployees = numEmployees;
    return Employee.find()
    .sort({firstname: 1})
    .skip((page - 1) * ITEMS_PER_PAGE)
    .limit(ITEMS_PER_PAGE)
  }).then(employees => {
      console.log(employees);
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
    })
    .catch((err: Error) => console.log(err));
};

export const getDepartments = (req: any, res: any, next: any) => {
  const page = +req.query.page || 1 as number;
  let totalDepartments: number;
  Department.find().countDocuments().then((numDepartments: number) => {
    totalDepartments = numDepartments;
    return Department.find()
    .sort({deptname: 1})
    .skip((page - 1) * ITEMS_PER_PAGE)
    .limit(ITEMS_PER_PAGE)
  }).then((departments: any) => {
      console.log(departments);
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
    })
    .catch(err => console.log(err));
};

export const getAddEmployee = (req: any, res: any, next: any) => {
   Department.find()
    .then(departments => {
      res.render('admin/edit-employee', {
        depts: departments,
        pageTitle: 'Add Employee',
        path: '/admin/add-employee',
        editing: false
      });
    })
    .catch(err => console.log(err));
};

export const getAddDepartment = (req: any, res: any, next: any) => {
  res.render('admin/edit-department', {
    pageTitle: 'Add Department',
    path: '/admin/add-department',
    editing: false
  });
};

export const postAddEmployee = (req: any, res: any, next: any) => {
  const firstname = req.body.firstname as HTMLInputElement;
  const lastname = req.body.lastname as HTMLInputElement;
  const phonenumber = req.body.phonenumber as HTMLInputElement;
  const email = req.body.email as HTMLInputElement;
  const department = req.body.department as HTMLSelectElement;
  const employee = new Employee({
    firstname: firstname,
    lastname: lastname,
    phonenumber: phonenumber,
    email: email,
    department:department,
    userId: req.user
  });
  employee
    .save()
    .then((result: any) => {
      // console.log(result);
      console.log('Added Employee');
      res.redirect('/admin/employees');
    })
    .catch((err: Error) => {
      console.log(err);
    });
};

export const postAddDepartment = (req: any, res: any, next: any) => {
  const deptname = req.body.deptname as HTMLInputElement;
  const description = req.body.description as HTMLInputElement;  
  const department = new Department({
    deptname: deptname,
    description:description,
    userId: req.user
  });
  department
    .save()
    .then((result: any) => {
      // console.log(result);
      console.log('Added Department');
      res.redirect('/admin/departments');
    })
    .catch((err: Error) => {
      console.log(err);
    });
};

export const getEditEmployee = (req: any, res: any, next: any) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect('/');
  }
  const empId = req.params.employeeId;
  Employee.findById(empId)
    .then((employee: any) => {
      if (!employee) {
        return res.redirect('/');
      }
      Department.find()
      .then((departments: any) => {
        res.render('admin/edit-employee', {
          depts: departments,
          pageTitle: 'Edit Employee',
          path: '/admin/edit-employee',
          editing: editMode,
          employee: employee
        });
    })
  }).catch((err: Error) => console.log(err));
};

export const getEditDepartment = (req: any, res: any, next: any) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect('/');
  }
  const deptId = req.params.departmentId;
  Department.findById(deptId)
    .then((department: any) => {
      if (!department) {
        return res.redirect('/');
      }
      res.render('admin/edit-department', {
        pageTitle: 'Edit Department',
        path: '/admin/edit-department',
        editing: editMode,
        department: department
      });
    })
    .catch((err: Error) => console.log(err));
};

export const postEditEmployee = (req: any, res: any, next: any) => {
  const empId = req.body.employeeId;
  const updatedfirstname = req.body.firstname as HTMLInputElement;
  const updatedlastname = req.body.lastname as HTMLInputElement;
  const updatedphonenumber = req.body.phonenumber as HTMLInputElement;
  const updatedemail = req.body.email as HTMLInputElement;
  const updateddepartment = req.body.department as HTMLSelectElement;

  Employee.findById(empId)
    .then((employee: any) => {
      employee.firstname = updatedfirstname;
      employee.lastname = updatedlastname;
      employee.phonenumber = updatedphonenumber;
      employee.email = updatedemail;
      employee.department = updateddepartment;
      return employee.save();
    })
    .then((result: any) => {
      console.log('UPDATED Employee!');
      res.redirect('/admin/employees');
    })
    .catch((err: Error) => console.log(err));
};

export const postEditDepartment= (req: any, res: any, next: any) => {
  const deptId = req.body.departmentId;
  const updateddeptname = req.body.deptname as HTMLInputElement;
  const updateddescription = req.body.description as HTMLInputElement;

  Department.findById(deptId)
    .then((department: any) => {
      department.deptname = updateddeptname;
      department.description = updateddescription;
      return department.save();
    })
    .then((result: any) => {
      console.log('UPDATED Department!');
      res.redirect('/admin/departments');
    })
    .catch((err: Error) => console.log(err));
};

export const postDeleteEmployee= (req: any, res: any, next: any) => {
  const empId = req.body.employeeId;
  Employee.findByIdAndRemove(empId)
    .then(() => {
      console.log('DESTROYED Employee');
      res.redirect('/admin/employees');
    })
    .catch((err: Error) => console.log(err));
};

export const postDeleteDepartment = (req: any, res: any, next: any) => {
  const deptId = req.body.departmentId;
  Department.findByIdAndRemove(deptId)
    .then(() => {
      console.log('DESTROYED Department');
      res.redirect('/admin/departments');
    })
    .catch((err: Error) => console.log(err));
};