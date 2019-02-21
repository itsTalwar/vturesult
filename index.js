const fetchData = require('./sendreq/fetchData.js');
const fetchUSN = require('./fetchusn/retrievecsv.js')
const scrapeData = require('./scrapedata/scrape.js')
const addToDatabase = require('./database/addToDatabase')
const addToCsv = require('./toCsv/addToCsv')

// const cookie = "q4im7j9ekre6gcjdg78hbeguu1"; 
// var captcha = 75431;



const gettingData = (usn, captcha, cookie)=>{
    fetchData.fetchData(cookie,usn,captcha)
        .then((data)=>{
            var obj = scrapeData.processdata(data,usn);
            if(obj === -1){
                console.log("something went wrong")
            }
            else{
                try{
                    addToDatabase.addToDatabase(obj);
                    addToCsv.addToCsv(obj);
                }
                catch(err) {
                    throw err;
                }
            }
            
        })
        .catch((err) => {
            console.log("error encountered while fetching data ")
        })
}

const getAllResults = (captcha, cookie)=> {
    fetchUSN.usnArray()
        .then((usn)=>{
            for(var i = 0 ; i < usn.length ; i++){
                var temp = usn[i][0];
                gettingData(temp, captcha, cookie);
            }
        })
        .catch((usn) => {
            console.log("err getting usns");
        })
}



   

getAllResults();