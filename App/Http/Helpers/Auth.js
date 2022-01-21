const bcrypt = require('bcrypt')


function hashPassword(password){
    const rounds = 15;
    const salt = bcrypt.genSaltSync(rounds);
    const hash = bcrypt.hashSync(password, salt);
    return hash;
}

function getHashedPassword(password, hashedPassword){
    return bcrypt.compareSync(password, hashedPassword)
}


async function createSession(id){
   //token.setToken(id);
}

function fetchSession(username){
    if(sessionStorage.getItem('username') == username){
        return true;
    }
    else{
        return false;
    }
}

function middleware(isAuth = 0, isAdmin = 0){
    if(isAdmin) {
        isAuth = 1;
    }
    
}

module.exports = {
    hashPassword, 
    getHashedPassword,
    createSession,
    fetchSession,
    middleware
}