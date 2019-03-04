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

 
//var ob = { name: 'MOHITH L M',
  usn: '1ay15cs051',
  marks:
   [ { subCode: '15CS71',
       subName: 'WEB TECHNOLOGY AND ITS APPLICATIONS',
       ia: '14',
       external: '53',
       total: '67',
       result: 'P' },
     { subCode: '15CS72',
       subName: 'ADVANCED COMPUTER ARCHITECTURES',
       ia: '17',
       external: '53',
       total: '70',
       result: 'P' },
     { subCode: '15CS743',
       subName: 'INFORMATION AND NETWORK SECURITY',
       ia: '15',
       external: '44',
       total: '59',
       result: 'P' },
     { subCode: '15CS73',
       subName: 'MACHINE LEARNING',
       ia: '15',
       external: '45',
       total: '60',
       result: 'P' },
     { subCode: '15CS754',
       subName: 'STORAGE AREA NETWORKS',
       ia: '13',
       external: '70',
       total: '83',
       result: 'P' },
     { subCode: '15CSL76',
       subName: 'MACHINE LEARNING  LABORATORY',
       ia: '18',
       external: '72',
       total: '90',
       result: 'P' },
     { subCode: '15CSL77',
       subName: 'WEB TECHNOLOGY LABORATORY  WITH MINI PROJECT',
       ia: '18',
       external: '75',
       total: '93',
       result: 'P' },
     { subCode: '15CSP78',
       subName: 'PROJECT PHASE 1 + SEMINAR',
       ia: '82',
       external: '0',
       total: '82',
       result: 'P' } ] }

//addToDatabase(ob);

module.exports = {
    addToDatabase
}