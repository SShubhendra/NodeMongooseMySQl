
const mongoose = require("mongoose");

var uri = "mongodb://localhost:27017/employee_data";

mongoose.connect(uri, { useUnifiedTopology: true, useNewUrlParser: true });

