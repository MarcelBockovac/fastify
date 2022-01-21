const User = require('../../Models/User')
const Token = require('../../Models/Token')
const Auth = require('../Helpers/Auth')

//// TODO: Make currentUsersId private but accessible everywhere throug getters.


let currentId = 0;
function setCurrentId(id){
    currentId = id;
}

function getCurrentId(){
    return currentId;
}


async function attemptLogin(username, password)
{
    const hashedPassword = await User.getHashedPassword(username, password);
    let stringPassword = hashedPassword[0];
    let match = Auth.getHashedPassword(password, stringPassword['password']) 
    let token = await Token.checkToken(stringPassword['id'])
    
    if(match){      
        setCurrentId(stringPassword['id'])  
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

async function showAllUsers(){
    // a not so good approach, still isnt what I want it to be.
    let middleware = await Auth.middleware(getCurrentId(), 'admin');

    if(middleware){
        const userData = await User.showAllUsers()
        var response = userData[0]
        return response
    }
    else{
        return "You are not permited to see this page."
    }


    // let notAuth = await Token.checkToken(getCurrentId())
    
    // if(!notAuth){
        // let is_admin = await User.checkIfIsAdmin(getCurrentId())
        
        // if(is_admin[0][0]['is_admin'] != null){
            // const userData = await User.showAllUsers()
            // var response = userData[0]
            // return response
        // }
        // else{
            // return 'You are not permited to see this page.'
        // }
    // }
}


module.exports = {
    attemptLogin,
    attemptSave,
    checkSession,
    showAllUsers
}