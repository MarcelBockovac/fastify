let EmployeeService = require('../Services/EmployeeService')

async function getEmployees (req,reply){
    var response = await EmployeeService.getEmployees();
    return reply.status(200).send(response);
}


async function getEmployee(req, reply){
    var response = await EmployeeService.getEmployee(req.params.id);
    return reply.status(200).send(response);
}

module.exports = {
    getEmployees,
    getEmployee
}