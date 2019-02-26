const fetchData = require('./sendreq/fetchData.js');
const fetchUSN = require('./fetchusn/retrievecsv.js')
const scrapeData = require('./scrapedata/scrape.js')
const addToDatabase = require('./database/addToDatabase')
const addToCsv = require('./toCsv/addToCsv')
const createColumns = require('./toCsv/createColumns')

var colCreated = false;

var token = "T3JMdW5XNzBmbU1mTXZXdDRDeVQweGxCT3RhTSt1NGk4WjUwaHM4VDhzRHpIdWE0cEY4WU9qMU42VENiSFZ3SVV1d05WeG9Jck1YMDQ1cGlmblhWK0E9PTo6RpU3bYO9iWzsN+SOPvMWpA==";

const captchaErrPatt = `alert('Invalid captcha code !!!')`

function captchaErr(html) {
    var index = html.indexOf(captchaErrPatt)
    if(index == -1){
        return 0
    }
    return 1;
}

const gettingData = (usn, captcha, cookie, csv)=>{    
    fetchData.fetchData(cookie,usn,captcha,token)
        .then((data)=>{
            if(captchaErr(data) == 1) {
                console.log("captcha err")
            }            
            else {
                console.log("befofre scraping starts");
                var obj = scrapeData.processdata(data,usn);
                // console.log("obj in index ", obj)
                if(colCreated == false){
                    createColumns.createColumns(obj, csv);
                    colCreated = true;
                }
                try {
                    // addToDatabase.addToDatabase(obj);
                    addToCsv.addToCsv(obj, csv);
                }
                catch(err) {
                    throw err;
                }            
            }               
        })
        .catch((err) => {
            // throw(err);
            console.log(err)
        })
}

const getAllResults = (captcha, cookie, csv)=> {
    return new Promise((resolve, reject) => {
        fetchUSN.usnArray(csv)
        .then((usn)=>{
            for(var i = 0 ; i < usn.length ; i++){
                var temp = usn[i][0];
                gettingData(temp, captcha, cookie, csv);
            }
            resolve('got results')
        })
        .catch((err) => {
            console.log("err getting usns");
            reject(err)
        })
    })
        
}

// const cookie = "ou76eorctub9v9m42tp7pd9di3"; 
// var captcha = 97265;
// getAllResults(captcha, cookie, token)


module.exports = {
    getAllResults
}