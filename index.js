const fetchData = require('./sendreq/fetchData.js');
const fetchUSN = require('./fetchusn/retrievecsv.js')
const scrapeData = require('./scrapedata/scrape.js')
const addToDatabase = require('./database/addToDatabase')
const addToCsv = require('./toCsv/addToCsv')
<<<<<<< HEAD
const config = require('./database/config.js')

const cookie = "q4im7j9ekre6gcjdg78hbeguu1"; 
var captcha = 75431;
var tablename = config.config().dept.cse.batch.b15.sem7.table;
=======
const createColumns = require('./toCsv/createColumns')

var colCreated = false;

// var token = "UXppRy9tM0tPZFc2dnhSbG4rQWlSb1lDOXZKWnlldEpOSVd6UitURzcyTEd3QUpObmRoRjdaQWlSZnZUbDdoQkc0NkhReUNZNmN6Tk1rREQ2WHNGTEE9PTo63Tc+Fyg/USxz2hDhQLsSMQ==";
>>>>>>> 8abd01541ecc20681fbbefe9239ec68ad2a6dc1a

const captchaErrPatt = `alert('Invalid captcha code !!!')`
const redirectErrPatt = `alert('Redirecting to VTU Results Site !!!')`

function reqErr(html) {
    // console.log(html)
    var index1 = html.indexOf(captchaErrPatt)
    var index2 = html.indexOf(redirectErrPatt)
    if(index1 !== -1){
        console.log("use updated captcha");
        return 0
    }
    else if (index2 !== -1){
        console.log("use updated token")
        return 0;
    }
    return 1;
}

const gettingData = (usn, captcha, cookie, csv, token)=>{    
    fetchData.fetchData(cookie,usn,captcha,token)
        .then((data)=>{
<<<<<<< HEAD
            var obj = scrapeData.processdata(data,usn);
            if(obj === -1){
                console.log("something went wrong")
            }
            else{
                try{
                    addToDatabase.addToDatabase(obj,tablename);
                    addToCsv.addToCsv(obj);
=======
            if(reqErr(data) === 0) {
                console.log("these are troubling times, request err")
            }            
            else {
                console.log("befofre scraping starts");
                var obj = scrapeData.processdata(data,usn);
                // console.log("obj in index ", obj)
                if(colCreated === false){
                    createColumns.createColumns(obj, csv);
                    colCreated = true;
                }
                try {
                    // addToDatabase.addToDatabase(obj);
                    addToCsv.addToCsv(obj, csv);
>>>>>>> 8abd01541ecc20681fbbefe9239ec68ad2a6dc1a
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

const getAllResults = (captcha, cookie, csv, token)=> {
    return new Promise((resolve, reject) => {
        fetchUSN.usnArray(csv)
        .then((usn)=>{
            for(var i = 0 ; i < usn.length ; i++){
                var temp = usn[i][0];
                gettingData(temp, captcha, cookie, csv, token);
            }
            console.log("got results")
            resolve(true)
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


<<<<<<< HEAD

   

getAllResults();
=======
module.exports = {
    getAllResults
}
>>>>>>> 8abd01541ecc20681fbbefe9239ec68ad2a6dc1a
