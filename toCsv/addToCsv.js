const addToCsv = (obj) => {
    // console.log("obj = ",obj )
    const fs = require('fs');
    const writeStream = fs.createWriteStream('./public/marks.csv',{flags:'a'});
    var usn = obj.usn;
    var grades = [];
    grades = obj.marks.map((temp) => {
        return temp.grade;
    })
    writeStream.write(`${usn}, ${grades}\n`)
    console.log("csv entry made")
}

module.exports = {
    addToCsv
}

//***************************************************************************************************
  // html = request('http://localhost/resultSample.html', function (error, response, body) {
  // usn = '1AY16CS118'
  //  var res = scrapeData.processdata(body, usn);
  //  console.log(res);
  //  // const writeStream = fs.createWriteStream('post3.csv');
  //  // writeStream.write(`usn,subcode,internal,external,total,subcode,internal,external,total,subcode,internal,external,total,subcode,internal,external,total,subcode,internal,external,total,subcode,internal,external,total,subcode,internal,external,total,subcode,internal,external,total\n`);
  //   createcsv(res)
  // })