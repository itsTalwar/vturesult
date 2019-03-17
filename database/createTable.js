const mysql = require('mysql');
const config = require('./config')

const createTable = (con, frontData) => {
    return new Promise ((resolve, reject) => {
        const databaseName = config.resolveDbName(frontData);
        const tableName = config.resolveTableName(frontData);
        con.database = databaseName;
        const sql = `CREATE TABLE ${tableName}( USN VARCHAR(20), subCode VARCHAR(20), ia INT, ex INT, tot INT, grade VARCHAR(5))`;
        con.query(sql, (err, result) => {
            if(err) reject(err);
            console.log("Table created");
            con.end((err) => {
                if(err) reject(err);
                resolve("database set up")                            
            });
        });
    })
    
}

module.exports = {
    createTable
}