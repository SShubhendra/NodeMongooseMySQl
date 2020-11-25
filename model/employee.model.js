'use strict';
var dbConn = require('./database/mysql');
Employee = {};
Employee.insert = function (newEmp, result) {
    dbConn.query("INSERT INTO employees set ?", newEmp, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            console.log(res.insertId);
            result(null, { message: "employees inserted successfully", status: 200, data: res });
        }
    });
};
Employee.insertMany = function (newEmpArr, result) {
    let empArr = newEmpArr.map((emp) => { return Object.values(emp) });
    dbConn.query("INSERT INTO employees (name,age,location) values ?", [empArr], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            console.log(res.insertId);
            result(null, { message: "employees inserted successfully", status: 200, data: res });
        }
    });
};
Employee.findById = function (id, result) {
    dbConn.query("Select * from employees where id = ? ", id, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            result(null, { message: "employees retrived successfully", status: 200, data: res });
        }
    });
};
Employee.findAll = function (result) {
    dbConn.query("Select * from employees", function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        }
        else {
            console.log('employees : ', res);
            result(null, { message: "employees retrived successfully", status: 200, data: res });
        }
    });
};
Employee.update = function (id, employee, result) {
    dbConn.query("UPDATE employees SET name=?,age=?,location=? WHERE id = ?", [employee.name, employee.age, employee.location, id], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            result(null, res);
        }
    });
};
Employee.delete = function (id, result) {
    dbConn.query("DELETE FROM employees WHERE id = ?", [id], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        }
        else {
            result(null, res);
        }
    });
};
module.exports = Employee;