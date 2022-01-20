let UserService = require('../Services/UserService')

async function tryLogin(req,reply){
    let {username} = req.body
    let {password} = req.body
    var response = await UserService.attemptLogin(username, password)
  
    // return reply.status(200).send(Object.keys(response).length);
    return reply.status(200).send(response)
}
async function saveUser(req, reply){
    let {username} = req.body
    let {password} = req.body
    
    var response = await UserService.attemptSave(username, password)

    return reply.status(200).send(response)
}

module.exports = {
    tryLogin,
    saveUser
}