let EmployeeController = require('../Http/Controllers/EmployeeController')
let UserController = require('../Http/Controllers/UserController')
let middleware = require('../Http/Helpers/Auth')


// Add mass assignment protection
// Create a factory and a database seeder
// Add CSRF for integration with fronted
// Check does n+1 problem exist when doing nested SQL queries
// Add guest directive in middleware
// Create automatic error validation and handler (E.G print errors instead of having to dig for them)
// Google how forms are handled with fastifyJS
// Google cache (Redis?)
// Find smth similiar to Clockwork
// Find something for DB migrations
// Active record pattern alredy exists?
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