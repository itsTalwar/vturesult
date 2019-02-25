const createColumns = (obj) => {
    const fs = require('fs');
    const writeStream = fs.createWriteStream('./public/marks.csv',{flags:'a'});
    const usn = obj.usn;
    var subcodes = [];
    subCodes = obj.marks.map((temp) => {
        return temp.subCode;
    })
    // console.log("subcodes ", subcodes)
    writeStream.write(`usn, ${subCodes}\n`)
}

module.exports = {
    createColumns
}