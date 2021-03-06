require('dotenv').config();

const fastify = require('fastify')({logger:true})


fastify.register(require('fastify-swagger'), {
    exposeRoute: true,
    routePrefix: '/docs',
    swagger: {
        info: {title: 'fastify-api'}
    }
})
fastify.register(require('./App/Routes/routes'))

fastify.register(require('fastify-jwt'), {secret: 'SuperSecret'})

const start = async () => {
    try {
        await fastify.listen(process.env.SERVER_PORT)
    }
    catch(error){
        fastify.log.error(error)
        process.exit(1)
    }
    
}

start()