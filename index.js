const fetchData = require('./sendreq/fetchData.js');
const fetchUSN = require('./fetchusn/retrievecsv.js')
const scrapeData = require('./scrapedata/scrape.js')
const addToDatabase = require('./database/addToDatabase')
const addToCsv = require('./toCsv/addToCsv')
const createColumns = require('./toCsv/createColumns')

var colCreated = false;

const gettingData = (usn, captcha, cookie,token)=>{    
    fetchData.fetchData(cookie,usn,captcha,token)
        .then((data)=>{
            var obj = scrapeData.processdata(data,usn);
            if(obj === -1){
                console.log("something went wrong")
            }
            else{
                if(colCreated == true){
                    try {
                        addToDatabase.addToDatabase(obj);
                        addToCsv.addToCsv(obj);
                    }
                    catch(err) {
                        throw err;
                    }
                }
                else {
                    createColumns.createColumns(obj);
                    colCreated = true;
                }
                
            }
            
        })
        .catch((err) => {
            throw(err);
            console.log("error encountered while fetching data ")
        })
}

const getAllResults = (captcha, cookie, token)=> {
    fetchUSN.usnArray()
        .then((usn)=>{
            for(var i = 0 ; i < usn.length ; i++){
                var temp = usn[i][0];
                gettingData(temp, captcha, cookie,token);
            }
        })
        .catch((usn) => {
            console.log("err getting usns");
        })
}

const cookie = "ou76eorctub9v9m42tp7pd9di3"; 
var captcha = 44646;
var token = "ZnFsc29VYURHVE1YK1F1ZEE4ZlRTZjhJN0ZBMzBmNDlGTEdHV2lvOHZSU2tEekZQc2Q3WUtzbldtMG96akZKWEpxb3g2czg0cUFiQlN3S05LbDNRa3c9PTo6AzBjvUeMnoLa+CMU8XGQNg=="
getAllResults(captcha, cookie, token)


module.exports = {
    getAllResults
}