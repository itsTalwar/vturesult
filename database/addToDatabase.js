const mysql = require('mysql');
const env = require('../env')

const addToDatabase = (obj) => {
    var con = mysql.createConnection(env.env);
    con.connect((err) => {
        if(err) throw err
        const usn = obj.usn;
        var ia, ex, total, subCode;
        obj.marks.map((temp) => {
            subCode = temp.subCode;
            ia = temp.ia;
            ex = temp.ex;
            total = temp.tot;
            grade = temp.grade;
            var sql = `INSERT INTO 7sem VALUES ('${usn}','${subCode}','${ia}', '${ex}','${total}','${grade}')`;
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