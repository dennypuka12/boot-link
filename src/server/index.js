var express = require("express");
var dao = require("./mongodao.js");
var app = express();

app.use(express.json()); //Parse JSON body

app.get("/api/employees", (req, res) => {
  dao.findAllEmployees((err, employees) => {
    if (employees) {
      res.send(employees);
    } else {
      res.statusCode = 404;
      res.end();
    }
  });
});

app.get("/api/employees/:name", (req, res) => {
    console.log('inside employees')
    dao.findEmployee(req.params.name, (err, employee) => {
      if (employee) {
        res.send(employee);
      } else {
        res.statusCode = 404;
        res.end();
      }
    });
  });

app.get("/api/employees/salary/:salary", (req, res) => {
  const salary = Number(req.params.salary)
  dao.findEmployeesWithSalaryHigherThan(salary, (err, employees) => {
    if (employees) {
      res.send(employees);
    } else {
      res.statusCode = 404;
      res.end();
    }
  });
});

app.get("/api/employees/role/:role", (req, res) => {
  console.log('inside role')
  dao.findByRoles(req.params.role, (err, employee) => {
    if (employee) {
      res.send(employee);
    } else {
      res.statusCode = 404;
      res.end();
    }
  });
});
// In index.js

// ...

app.get('/api/login/:name', async (req, res) => {
  const name = req.params.name;
  console.log(name);
  dao.getEmployeeByName(name, (err, employee) => {
    if (!err && employee) {
      res.json({ name: employee.name, role: employee.role });
    } else {
      console.error(`api, ${err}`);
      res.status(500).json({ error: err });
    }
  });
});


// New route to get employees by location
app.get('/api/employees/location/:location', async function (req, res) {
  dao.findEmployeesByLocation(req.params.location, (err, employees) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(employees);
    }
  });
});


app.use(express.static('./public'));

// server start-up
const port = 4000;
console.log(
  "Open a browser to http://localhost:" + port + " to view the application"
);
app.listen(port);
