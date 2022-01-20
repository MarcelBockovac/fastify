const Employee = require('../../Models/Employee')

async function getEmployees()
{
    const employeeData = await Employee.getEmployees();
    var response = {data:employeeData[0]}

    return response;
}

async function getEmployee(id){
    const employeeData = await Employee.getEmployee(id);
    var response = {data:employeeData[0]}

    return response;
}

module.exports = {
    getEmployees,
    getEmployee}