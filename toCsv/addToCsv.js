const cheerio  = require('cheerio');
const request = require('request');
const scrapeData = require('../scrapedata/scrape.js')
const addToCsv = (obj) => {
          console.log("entered");
         
        

        const fs = require('fs');
        const writeStream = fs.createWriteStream('./toCsv/marks.csv',{flags:'a'});
        const usn = obj.usn;
        var ia, ex, tot, subCode;
        obj.marks.map((temp) => {
            subCode = temp.subCode;
            ia = temp.ia;
            ex = temp.ex;
            tot = temp.tot;
           
           writeStream.write(`${usn}, ${temp.subCode}, ${temp.ia}, ${temp.ex}, ${temp.tot}\n`)
        })



       
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