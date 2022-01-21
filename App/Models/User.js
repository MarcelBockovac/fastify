const mysqlPromise = require('../../Config/database')
const Model = require('../Http/Helpers/Model')


const getUser = {
    getHashedPassword: async function(username,password) {
        const connection = await mysqlPromise.DATABASE.getConnection();
        var results = [];
        try {
            results = await connection.execute(`SELECT id,password FROM Users WHERE username = ?`,
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
    },

    showAllUsers: async function (){
        const connection = await mysqlPromise.DATABASE.getConnection();
        var results = [];
        try {
            results = await connection.execute(`SELECT * FROM Users`);
            connection.release();
        }
        catch(err){
            console.log(err);
            connection.release();
            return err;
        }

        return results;
    },
    checkIfIsAdmin: async function(id) {
        const connection = await mysqlPromise.DATABASE.getConnection();
        var results = [];
        try {
            results = await connection.execute('SELECT is_admin FROM Users WHERE id = ?', [id]);
            connection.release();
        }
        catch(err){
            console.log(err);
            connection.release();
            return err;
        }
        return results;
    }
    
   
}
module.exports = getUser;