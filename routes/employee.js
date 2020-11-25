var express = require('express');
const mongoose = require("mongoose");
var router = express.Router();
const employeesMongo = require("../model/employeeMongoose.model"); // mongo
const EmployeeMysql = require('../model/employee.model');   //mysql

/* GET users listing. */
router.get('/findall/:dtype', async function (req, res) {
  console.log("params:", req.params.dtype)
  try {
    if (parseInt(req.params.dtype)) {  //dtype: 1=mongo ,0- mysql
      let employee = await employeesMongo.findAll({});
      res.status(employee.status).send(employee);
    } else {
      EmployeeMysql.findAll(function (err, employee) {
        if (err)
          res.send(err);
        res.send(employee);
      });
    }
  } catch (err) {
    res.send(err.message)
  }
});
router.get('/find/:dtype/:id', async function (req, res) {
  try {
    if (parseInt(req.params.dtype)) {  //dtype: 1=mongo ,0- mysql
      let employee = await employeesMongo.findById({ _id: mongoose.Types.ObjectId(req.params.id) });
      res.status(employee.status).send(employee);
    } else {
      EmployeeMysql.findById(req.params.id, function (err, employee) {
        if (err)
          res.send(err);
        res.send(employee);
      });
    }
  } catch (err) {
    res.send(err.message)
  }
});


//insert
router.post('/insertMany', async function (req, res) {
  try {
    if (req.body.dtype) {  //dtype: 1=mongo ,0- mysql
      let employee = await employeesMongo.insertMany(req.body.data);
      res.status(employee.status).send(employee);
    } else {
      EmployeeMysql.insertMany(req.body.data, function (err, employee) {
        if (err)
          res.send(err);
        console.log("employee", employee)
        res.send(employee);
      });
    }
  } catch (err) {
    res.send(err.message)
  }
});
router.post('/inserOne', async function (req, res) {
  try {
    if (req.body.dtype) {  //dtype: 1=mongo ,0- mysql
      let employee = await employeesMongo.insert(req.body.data);
      res.status(employee.status).send(employee);
    } else {
      EmployeeMysql.insert(req.body.data, function (err, employee) {
        if (err)
          res.send(err);
        res.send(employee);
      });
    }
  } catch (err) {
    res.send(err.message)
  }
});


module.exports = router;
