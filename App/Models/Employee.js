const mysqlPromise = require('../../Config/database')

const getEmployees = {
    getEmployees: async function() {
        const connection = await mysqlPromise.DATABASE.getConnection();
        var results = [];
        
        try {
            results = await connection.execute(`SELECT * FROM Employees`);
            connection.release();
        }
        catch(err){
            results = {error: 'Failed querying database'}
            console.error(err)
            connection.release();
            return false;
        }
        return results;
    },
    getEmployee: async function(id) {
        const connection = await mysqlPromise.DATABASE.getConnection();
        var result = [];

        try {
            result = await connection.execute(`SELECT * FROM Employees WHERE id = ?`, [id]);
            connection.release();
        }
        catch(err){
            console.error(err);
            connection.release();
            return false;
        }
        return result;
    }

   
}
module.exports = getEmployees;