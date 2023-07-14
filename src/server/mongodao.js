const mongodb = require("mongodb"); // mongo client library
const url = "mongodb://localhost:27017/hack";
let dbPool;

mongodb.MongoClient.connect(url, function (err, db) {
  if (!err) {
    dbPool = db.db("hack");
  } else {
    console.log("DB CONNECTION FAILED. Is database running?");
  }
});

module.exports.findAllEmployees = async function (callback) {
  var col = dbPool.collection("fakeEmployeesNew");
  col.find().toArray(async(err, fakeEmployeesNew) => {
    if (!err) {
      callback(null, fakeEmployeesNew);
    } else {
      callback("Failed to find fakeEmployeesNew", undefined);
    }
  });
};

// retrieve single employee
module.exports.findEmployee = async function (name, callback) {
    var col = dbPool.collection("fakeEmployeesNew");
    col.find({ 'name': { $regex: new RegExp(name, 'i')} }).toArray(async(err, employees) => {
      if (!err) {
        // console.log({employees})
        callback(null, employees);
      } else {
        callback("Failed to find employee", undefined);
      }
    });
  };

// retrievesalary
module.exports.findEmployeesWithSalaryHigherThan = async function (salary, callback) {
    var col = dbPool.collection("fakeEmployeesNew");
    col.find({ 'salary': { $gt: salary }}).toArray(async(err, employees) => {
      if (!err) {
        console.log({employees})
        callback(null, employees);
      } else {
        callback("Failed to find employee", undefined);
      }
    });
  };

module.exports.getEmployeeByName = async function (name, callback) {
    var col = dbPool.collection("fakeEmployeesNew");
    col.find({ 'name': { $regex: new RegExp(name, 'i')} }).toArray(async(err, employees) => {
      if (!err) {
        if (employees.length > 0) {  // check if employees array is not empty
          let employee = employees[0];
          if (employee.managerId) {
            let manager = await col.find({ 'id': employee.managerId }).toArray();
            if (!err && manager.length > 0) {
              employee.managerName = manager[0].name;
            }
          }
          console.log({employee});  // this line should be here
          callback(null, employee);
        } else {
          callback("Employee not found", null);  // callback with an error message if employees array is empty
        }
      } else {
        callback("Failed to find employee", undefined);
      }
    });
  };
  
// retrieve by location

module.exports.findEmployeesByLocation = async function (location, callback) {
  var col = dbPool.collection('fakeEmployeesNew');
  col.find({  workLocation: { $regex: new RegExp(location, 'i') } }).toArray(async(err, employees) => {
    if (!err) {
      console.log({employees});
      callback(null, employees);
    } else {
      callback("Failed to find employees by location", undefined);
    }    
  });
};

module.exports.findByRoles = async function (role, callback) {
  var col = dbPool.collection('fakeEmployeesNew');
  col.find({  jobRole: { $regex: new RegExp(role, 'i') } }).toArray(async(err, employees) => {
    if (!err) {
      console.log({employees});
      callback(null, employees);
    } else {
      callback("Failed to find employees by role", undefined);
    }    
  });
};
