const cheerio  = require('cheerio');


const subpatt = /([1-9][1-9][M][A][T][1-9][1-9])|([1-9][1-9][C][S][1-9][1-9][1-9])|([1-9][1-9][C][S][1-9][1-9])|([1-9][1-9][C][S][L][1-9][1-9])/g;
const markspattconj = /[0-9][0-9][0-9][0-9][0-9][0-9]/g;
const markspatt = /[0-9][0-9]/g;
const usnpatt = /[1][A][Y][0-9][0-9][C][S][0-9][0-9][0-9]/;


const splitter = (marksconj, subjects) => {
    var marksub = {};
    var marks = [];
    var sub = {};
    var i = 0;

    for(var i = 0 ; i < marksconj.length ; i++){
        var temp = marksconj[i].match(markspatt);
        marksub = { 
            ia: temp[0],
            ex: temp[1],
            tot: temp[2]
        }
        marks.push(marksub);
    }

    return marks;
} 
const processdata = (html,usn) => {
    var $ = cheerio.load(html);
    var subjects = [];
    var marks = {};
    var marksconj = [];
    var main = $(".panel-body > .row");
    var temp = main.find('tbody').find('td').text();

    var mainTable = main.find('.divTable').find('.divTableRow').find('.divTableCell').text();
    var subjects = mainTable.match(subpatt); 
    marksconj = mainTable.match(markspattconj);
    marks = splitter(marksconj, subjects);
    return {marks: marks , usn: usn };
}

module.exports ={
    processdata: processdata
}
