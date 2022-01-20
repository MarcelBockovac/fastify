const mysqlPromise = require('../../Config/database')

const getUser = {
    getHashedPassword: async function(username,password) {
        const connection = await mysqlPromise.DATABASE.getConnection();
        var results = [];
        try {
            results = await connection.execute(`SELECT password FROM Users WHERE username = ?`,
            [username]);
            connection.release();
        }
        catch(err){
            console.error(err)
            connection.release();
            return false;
        }
        return results[0];
    },

    getUser: async function(username, password) {
        const connection = await mysqlPromise.DATABASE.getConnection();
        var results = [];
        try {
            results = await connection.execute(`SELECT * FROM Users WHERE username = ? AND password = ? `,
            [username, password]);
            connection.release();

        }
        catch(err){
            console.error(err)
            connection.release();
            return false;
        }
        return results;
    },

    saveUser: async function (username, password){
        const connection = await mysqlPromise.DATABASE.getConnection();
        var results = [];
        try {
            results = await connection.execute(`INSERT INTO Users (username, employee_id, password) VALUES(?,?,?)`,
            [username, 1 ,password]);
            connection.release();

        }
        catch(err){
            console.log(err)
            connection.release();
            return [...results, err];
        }
        return results;
    }
    
   
}
module.exports = getUser;