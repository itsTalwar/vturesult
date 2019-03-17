const fetchData = require('./sendreq/fetchData.js');
const fetchUSN = require('./fetchusn/retrievecsv.js')
const scrapeData = require('./scrapedata/scrape.js')
const addToDatabase = require('./database/addToDatabase')
const addToCsv = require('./toCsv/addToCsv')
const createColumns = require('./toCsv/createColumns')

var colCreated = false;

// var token = "UXppRy9tM0tPZFc2dnhSbG4rQWlSb1lDOXZKWnlldEpOSVd6UitURzcyTEd3QUpObmRoRjdaQWlSZnZUbDdoQkc0NkhReUNZNmN6Tk1rREQ2WHNGTEE9PTo63Tc+Fyg/USxz2hDhQLsSMQ==";

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

const gettingData = (usn, frontData)=>{ 
    // console.log("yearin index", year)   
    fetchData.fetchData(usn, frontData)
        .then((data)=>{
            if(reqErr(data) === 0) {
                console.log("these are troubling times, request err")
            }            
            else {
                console.log("befofre scraping starts");
                var obj = scrapeData.processdata(data,usn);
                // console.log("obj in index ", obj)
                if(colCreated === false){
                    createColumns.createColumns(obj, frontData.csv);
                    colCreated = true;
                }
                try {
                    // addToDatabase.addToDatabase(obj);
                    addToCsv.addToCsv(obj, frontData.csv);
                }
                catch(err) {
                    throw err;
                }            
            }               
        })
        .catch((err) => {
            console.log(err)
        })
}

const getAllResults = (frontData)=> {
    return new Promise((resolve, reject) => {
        fetchUSN.usnArray(frontData.csv)
        .then((usn)=>{
            for(var i = 0 ; i < usn.length ; i++){
                var temp = usn[i][0];
                gettingData(temp, frontData);
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

module.exports = {
    getAllResults
}