const mysqlPromise = require('../../Config/database')




const token = {
    setToken: async function(userID) {
        Date.prototype.addHours = function(h){
            this.setTime(this.getTime()+(h*60*60*1000));
            return this;
        }
        const date = new Date().addHours(1)
        // let expirationDate = date.toString()
        const connection = await mysqlPromise.DATABASE.getConnection();
        var results = [];
        try {
            results = await connection.execute(`INSERT INTO Tokens (userID, expirationDate) VALUES(?,?)`,
            [userID,date]);
            connection.release();
        }
        catch(err){
            console.error(err)
            connection.release();
            return false;
        }
        return results[0];
    },
    checkToken: async function(userID) {
        Date.prototype.getCurrent = function(){
            this.setTime(this.getTime());
            return this;
        }
            const connection = await mysqlPromise.DATABASE.getConnection();
            var results = [];
            try {
                results = await connection.execute(`SELECT expirationDate FROM Tokens WHERE userId = ?`,
                [userID]);
                connection.release();
            }
            catch(err){
                console.error(err)
                connection.release();
                return false;
            }
           
            let strippedResults = results[0][0];
            let currentTime = new Date().toLocaleString();
            let expirationTime = strippedResults['expirationDate'];
            //return Date.parse(currentTime) +' ' + Date.parse(strippedResults['expirationDate'])
            
            if(Date.parse(strippedResults['expirationDate']) > Date.parse(currentTime)){
                return false;
            }
            else if(expirationTime['expirationDate'] === ""){
                return true;
            }
            else if(Date.parse(strippedResults['expirationDate']) < Date.parse(currentTime)){
                return true;
            }
    }

}

module.exports = token