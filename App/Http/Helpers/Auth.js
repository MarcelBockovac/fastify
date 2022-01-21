const bcrypt = require('bcrypt')
const User = require('../../Models/User')
const Token = require('../../Models/Token')


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

 // ID is curent users id, type is auth or admin, admin can see both auth and admin, auth can only see auth 
async function middleware(id, type){
    // TODO: Auth returs false when user is indeed authenticated, needs to be fixed 
   let auth = await Token.checkToken(id)

   if(!auth){
        if(type == 'auth'){
            return true;
        }
        else if(type == 'admin'){
            let is_admin = await User.checkIfIsAdmin(id)
            
            // Try to fix this nested nested nested syntax -> Google why JS does this.
            if(is_admin[0][0]['is_admin'] != null){
                return true;
            }
            else {
                return false;
            }
        }
   }
}

module.exports = {
    hashPassword, 
    getHashedPassword,
    createSession,
    fetchSession,
    middleware
}