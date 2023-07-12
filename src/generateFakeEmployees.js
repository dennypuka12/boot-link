const { faker } = require('@faker-js/faker');
var fs = require('fs');

let employees = [];

for (let i=0; i < 100; i++) {
    let employee = {
        name:   faker.person.fullName(),
        phoneNumber:    faker.phone.number(),
        jobRole:    faker.person.jobTitle(),
        workLocation:   faker.location.city() + ', ' + faker.location.country(),
        salary: faker.finance.amount(75000, 200000, 2,  '$'),
    };

    employees.push(employee);
}

fs.writeFileSync("fakeEmployees.json", JSON.stringify(employees, null, 4),function(err, result) {

    if (err) console.log('error', err);
});