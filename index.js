const fetchData = require('./sendreq/fetchData.js');
const fetchUSN = require('./fetchusn/retrievecsv.js')
const scrapeData = require('./scrapedata/scrape.js')

const cookie = "t17lkdkm6s9louj3qgmj0dqm16";
var captcha = 77823;



const gettingData = (usn)=>{
    fetchData.fetchData(cookie,usn,captcha).then((data)=>{
        var obj =scrapeData.processdata(data,usn);
        console.log(obj)
    })
}

const getAllResults = ()=> {

fetchUSN.usnArray().then((usn)=>{
    for(var i = 0 ; i < usn.length ; i++){
        var temp = usn[i][0];
        gettingData(temp);
    }
})
}



   

getAllResults();