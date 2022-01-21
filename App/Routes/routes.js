let EmployeeController = require('../Http/Controllers/EmployeeController')
let UserController = require('../Http/Controllers/UserController')
let middleware = require('../Http/Helpers/Auth')

async function routes (fastify, options){
    fastify.get('/employees', EmployeeController.getEmployees)

    fastify.get('/employees/:id', EmployeeController.getEmployee)

    fastify.get('/adminInfo', UserController.showAllUsers) //<-- Figure out how to use custom middleware here
                                                           // FOR NOW - Middleware will be implemented
                                                           // In the service layer.
                                                           // First login to use this method
    fastify.post('/login', UserController.tryLogin)

    fastify.put('/register', UserController.saveUser)

    

}

module.exports = routes;