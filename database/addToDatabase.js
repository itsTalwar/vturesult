const mysql = require('mysql');
const env = require('../env')

const addToDatabase = (obj) => {
    var con = mysql.createConnection(env.env);
    con.connect((err) => {
        if(err) throw err
        const usn = obj.usn;
        var ia, ex, tot, subCode;
        obj.marks.map((temp) => {
            subCode = temp.subCode;
            ia = temp.ia;
            ex = temp.ex;
            tot = temp.tot;
            var sql = `INSERT INTO marks VALUES ('${usn}','${subCode}','${ia}','${ex}','${tot}')`;
            con.query(sql, (err, result) => {
                if (err) throw err;
                else console.log("1 record inserted");
            });
        })
    })
}

// addToDatabase()

module.exports = {
    addToDatabase
}