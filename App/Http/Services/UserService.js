const User = require('../../Models/User')
const Token = require('../../Models/Token')
const Auth = require('../Helpers/Auth')



async function attemptLogin(username, password)
{
    const hashedPassword = await User.getHashedPassword(username, password);
    let stringPassword = hashedPassword[0];
    let match = Auth.getHashedPassword(password, stringPassword['password']) 
    let token = await Token.checkToken(stringPassword['id']);
    
    console.log(token);
    if(match){        
        if(token){
            Token.setToken(stringPassword['id']);
        }
        return "Successfully logged in."
    }
    else{
        return "Invalid credentials"
    }
}

async function attemptSave(username, password)
{
    const userData = await User.saveUser(username,Auth.hashPassword(password));
    var response = userData[0]
    if(response['code'] === "ER_DUP_ENTRY"){
        return "Username is alredy taken.";
    }
    else{
        return "Successfully created account.";
    }
    
}

async function checkSession(username){
    if(Auth.fetchSession(username)){
        return "Session is set."
    }
    else{
        return "Session is not set."
    }
}


module.exports = {
    attemptLogin,
    attemptSave,
    checkSession
}