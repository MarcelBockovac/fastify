const User = require('../../Models/User')
const Auth = require('../Helpers/Auth')
async function attemptLogin(username, password)
{
    const hashedPassword = await User.getHashedPassword(username, password);
    let stringPassword = hashedPassword[0];
    let match = Auth.getHashedPassword(password, stringPassword['password']) 

    if(match){
        return "Successfully logged in."
    }
    else{
        return "no u."
    }

    /*const userData = await User.getUser(username, password);
    var response = userData[0]
    if(Object.keys(response).length === 0){
        return "Invalid credentials."
    }
    else{
        Auth.createSession(username);
        return "Successfully logged in"
    }*/
}

async function attemptSave(username, password)
{
    const userData = await User.saveUser(username,Auth.hashPassword(password));
    var response = userData[0]
    if(response['code'] === "ER_DUP_ENTRY"){
        return "Username is alredy taken.";
    }
    else{
        Auth.createSession(username);
        return "Successfully created account.";
    }
    
}


module.exports = {
    attemptLogin,
    attemptSave
}