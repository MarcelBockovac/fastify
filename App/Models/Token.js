const mysqlPromise = require('../../Config/database')

// Convert to class

// Function for setting and getting tokens in/from database, sets token and on every auth try checks time of old token

// If an hour hasnt passed, token doesnt get renewed.

const token = {

    // Setting token
    setToken: async function(userID) {

        // Increment time by 1 hour
        Date.prototype.addHours = function(h){
            this.setTime(this.getTime()+(h*60*60*1000));
            return this;
        }
        const date = new Date().addHours(1)
        const connection = await mysqlPromise.DATABASE.getConnection();
        var results = [];
        try {
            // Insert new token
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

    // Checking token
    checkToken: async function(userID) {
            const connection = await mysqlPromise.DATABASE.getConnection();
            var results = [];
            try {
                // Select expirationDate of users token by users id, if it doesnt exist, will be created.
                results = await connection.execute(`SELECT expirationDate FROM Tokens WHERE userId = ?`,
                [userID]);
                connection.release();
            }
            catch(err){
                console.error(err)
                connection.release();
                return false;
            }

            // Boolean that cheks if a result for that user exists.
            let boolIsDefined = false
            if(results[0][0] !== undefined ){
               boolIsDefined = true;
            }
            else{
                return true;
            }
            // If it does, fetch results stripped into a single assoc array, fetch value from key and convert currentTime to locale string.
            if(boolIsDefined){
                let strippedResults = results[0][0];
                let expirationTime = strippedResults['expirationDate'];
                let currentTime = new Date().toLocaleString();
                    // If Expiration time is after current time, user still holds a token.
                if(Date.parse(strippedResults['expirationDate']) > Date.parse(currentTime)){
                    return false;
                }
                    // If Expiration time had passed by atleast an hour, it gets refreshed
                else if(Date.parse(strippedResults['expirationDate']) < Date.parse(currentTime)){
                    await connection.execute ('DELETE FROM Tokens WHERE userId =?', [userID])
                    return true;
                }
            }
    }

}

module.exports = token