const createColumns = (obj, csv) => {
    const fs = require('fs');
    const writeStream = fs.createWriteStream(`./public/${csv}`,{flags:'a'});
    console.log("creating columns");
    const usn = obj.usn;
    var subcodes = [];
    subCodes = obj.marks.map((temp) => {
        var aux = [];
        aux.push(temp.subCode);
        aux.push(temp.subName);
        aux.push('total');
        console.log("aux ", aux);
        return aux;
    })
    // console.log("subcodes ", subcodes)
    writeStream.write(`USN, ${subCodes}\n`)
    writeStream.end();
}

module.exports = {
    createColumns
}