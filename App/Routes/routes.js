let EmployeeController = require('../Http/Controllers/EmployeeController')
let UserController = require('../Http/Controllers/UserController')
// const getEmployeeOptions = {
//     schema: {
//         response: {
//             200: {
//                 type: 'array',
//                 Employees: 'Employee', 
//             }
//         }
//     },
//     handler: getEmployees
// }

// function getRoutes(fastify, options, done){
//     fastify.get('employees/', getEmployeeOptions)

//     done()
// }

// module.exports = getRoutes

async function routes (fastify, options){
    fastify.get('/employees', EmployeeController.getEmployees)

    fastify.get('/employees/:id', EmployeeController.getEmployee)

    fastify.get('/session/:username', UserController.checkSession)

    fastify.post('/login', UserController.tryLogin)

    fastify.put('/register', UserController.saveUser)

  
}

module.exports = routes;