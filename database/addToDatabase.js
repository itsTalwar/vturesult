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

            ex = temp.external;
            tot = temp.total;
            result = temp.result;
            var sql = `INSERT INTO 7sem VALUES ('${usn}','${subCode}','${ia}','${ex}','${tot}','${result}')`;


            con.query(sql, (err, result) => {
                if (err) throw err;
                else console.log("1 record inserted");
           });
           //console.log(usn,subCode,ia,ex,tot,result)
        })
    })
}

 
//addToDatabase(ob);

module.exports = {
    addToDatabase
}