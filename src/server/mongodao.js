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