const employees = require("./employeeSchema"); // mongo
Employee = {};
Employee.insert = async function (newEmp) {
    try {
        let employee = await employees.create(newEmp)
        return { message: "employee inserted successfully", status: 200, data: employee }
    }
    catch (err) {
        return { message: "error in employee save :" + err.message, status: 500, data: null }
    }
};
Employee.insertMany = async function (newEmpArr) {
    try {
        let employee = await employees.insertMany(newEmpArr)
        return { message: "employees inserted successfully", status: 200, data: employee }
    }
    catch (err) {
        return { message: "error in employees save :" + err.message, status: 500, data: null }
    }
};
Employee.findById = async function (cond) {
    try {
        let employee = await employees.findOne(cond)
        return { message: "employee retrived successfully", status: 200, data: employee }
    }
    catch (err) {
        return { message: "error in getting employee :" + err.message, status: 500, data: null }
    }
};
Employee.findAll = async function (cond) {
    try {
        let employee = await employees.find(cond)
        return { message: "employees retrived successfully", status: 200, data: employee }
    }
    catch (err) {
        return { message: "error in getting employees :" + err.message, status: 500, data: null }
    }
};

module.exports = Employee;