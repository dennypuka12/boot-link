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
  dao.findEmployeesWithSalaryHigherThan(+req.params.salary, (err, salary) => {
    if (salary) {
      res.send(salary);
    } else {
      res.statusCode = 404;
      res.end();
    }
  });
});

// app.get("/api/films", (req, res) => {
//   dao.findAllFilms((err, films) => {
//     if (films) {
//       res.send(films);
//     } else {
//       res.statusCode = 404;
//       res.end();
//     }
//   });
// });

// app.get("/api/employees/:id", (req, res) => {
//   dao.findCharacter(req.params.id, (err, character) => {
//     if (character) {
//       res.send(character);
//     } else {
//       res.statusCode = 404;
//       res.end();
//     }
//   });
// });

// app.get("/api/films/:id", (req, res) => {
//   dao.findFilm(req.params.id, (err, film) => {
//     if (film) {
//       res.send(film);
//     } else {
//       res.statusCode = 404;
//       res.end();
//     }
//   });
// });

// app.get("/api/salary/:id", (req, res) => {
//   dao.findPlanet(req.params.id, (err, planet) => {
//     if (planet) {
//       res.send(planet);
//     } else {
//       res.statusCode = 404;
//       res.end();
//     }
//   });
// });

// app.get("/api/films/:id/employees", (req, res) => {
//   dao.findemployeesByFilm(req.params.id, (err, employees) => {
//     if (employees) {
//       res.send(employees);
//     } else {
//       res.statusCode = 404;
//       res.end();
//     }
//   });
// });

// app.get("/api/films/:id/salary", (req, res) => {
//   dao.findsalaryByFilm(req.params.id, (err, salary) => {
//     if (salary) {
//       res.send(salary);
//     } else {
//       res.statusCode = 404;
//       res.end();
//     }
//   });
// });

// app.get("/api/employees/:id/films", (req, res) => {
//   dao.findFilmsByCharacter(req.params.id, (err, films) => {
//     if (films) {
//       res.send(films);
//     } else {
//       res.statusCode = 404;
//       res.end();
//     }
//   });
// });

// app.get("/api/salary/:id/films", (req, res) => {
//   dao.findFilmsByPlanet(req.params.id, (err, films) => {
//     if (films) {
//       res.send(films);
//     } else {
//       res.statusCode = 404;
//       res.end();
//     }
//   });
// });

// app.get("/api/salary/:id/employees", (req, res) => {
//   dao.findemployeesByPlanet(req.params.id, (err, employees) => {
//     if (employees) {
//       res.send(employees);
//     } else {
//       res.statusCode = 404;
//       res.end();
//     }
//   });
// });

app.use(express.static('./public'));

// server start-up
const port = 4000;
console.log(
  "Open a browser to http://localhost:" + port + " to view the application"
);
app.listen(port);
