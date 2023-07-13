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
  var col = dbPool.collection("fakeEmployees");
  col.find().toArray(async(err, fakeEmployees) => {
    if (!err) {
      callback(null, fakeEmployees);
    } else {
      callback("Failed to find fakeEmployees", undefined);
    }
  });
};

// retrieve single employee
module.exports.findEmployee = async function (name, callback) {
    var col = dbPool.collection("fakeEmployees");
    col.find({ 'name': { $regex: new RegExp(name, 'i')} }).toArray(async(err, employees) => {
      if (!err) {
        console.log({employees})
        callback(null, employees[0]);
      } else {
        callback("Failed to find employee", undefined);
      }
    });
  };
  
module.exports.findEmpoyeesByLocation = async function (location, callback) {
    var col = dbPool.collection('fakeEmployees');
    col.find({  workLocation: { $regex: new RegExp(location, 'i') } }).toArray(async(err, employees) => {
    if (!err) {
            console.log({employees})
            callback(null, employees[0]);
          } else {
            callback("Failed to find employee", undefined);
          }    
    });
  };

  // retrieve single employee
module.exports.findEmployeeByPhone = async function (phoneNumber, callback) {

    let cleanedPhoneNumber = phoneNumber.replace(/\D/g, '');
    var col = dbPool.collection("fakeEmployees");
    col.find({ 'phoneNumber': { $regex: new RegExp(cleanedPhoneNumber, 'i')} }).toArray(async(err, employees) => {
      if (!err) {
        console.log({employees})
        callback(null, employees[0]);
      } else {
        callback("Failed to find employee", undefined);
      }
    });
  };

    // retrieve salary info
module.exports.findEmployeeBySalary = async function (salary, callback) {
    let fixedSalary = '$' + salary;
    var col = dbPool.collection("fakeEmployees");
    col.find({ 'salary': { $gt: fixedSalary } }).toArray(async(err, employees) => {
      if (!err) {
        console.log({employees})
        callback(null, employees[0]);
      } else {
        callback("Failed to find employee", undefined);
      }
    });
  };