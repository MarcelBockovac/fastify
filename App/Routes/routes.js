let EmployeeController = require('../Http/Controllers/EmployeeController')
let UserController = require('../Http/Controllers/UserController')


async function routes (fastify, options){
    fastify.get('/employees', EmployeeController.getEmployees)

    fastify.get('/employees/:id', EmployeeController.getEmployee)

    //fastify.get('/session/:username', UserController.checkSession)

    fastify.post('/login', UserController.tryLogin)

    fastify.put('/register', UserController.saveUser)

    

}

module.exports = routes;