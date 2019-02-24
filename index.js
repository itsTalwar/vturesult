const fetchData = require('./sendreq/fetchData.js');
const fetchUSN = require('./fetchusn/retrievecsv.js')
const scrapeData = require('./scrapedata/scrape.js')
const addToDatabase = require('./database/addToDatabase')
const addToCsv = require('./toCsv/addToCsv')

const gettingData = (usn, captcha, cookie,token)=>{
    fetchData.fetchData(cookie,usn,captcha,token)
        .then((data)=>{
            var obj = scrapeData.processdata(data,usn);
            console.log(obj)
            if(obj === -1){
                console.log("something went wrong")
            }
            else{
                try{
                    console.log(obj)
                    // addToDatabase.addToDatabase(obj);
                    // addToCsv.addToCsv(obj);
                }
                catch(err) {
                    throw err;
                }
            }
            
        })
        .catch((err) => {
            throw(err);
            console.log("error encountered while fetching data ")
        })
}

const getAllResults = (captcha, cookie,token)=> {
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

const cookie = "urcaf3p3vjoaaisg8tclldkl01"; 
var captcha = 93225;
// getAllResults(captcha, cookie)


module.exports = {
    getAllResults
}