const cheerio  = require('cheerio');
const request = require('request')

const fs = require('fs');

const captchaErrPatt = `alert('Invalid captcha code !!!')`

function captchaErr(html) {
    var $ = cheerio.load(html);
    var index = html.indexOf(captchaErrPatt)
    if(index == -1){
        return 0
    }
    return 1;
}

function scrape(allmarks) {
    var marks = [];
    for(var i = 0; i < allmarks.length; i += 4){
        if(allmarks[i] === 'Level'){
            return marks
        }
        if(allmarks[i] !== 'Subject Code'){
            tempObj = {
                subCode: allmarks[i],
                subName: allmarks[i+1],
                ia: allmarks[i+2],
                grade: allmarks[i+3],
            }
            marks.push(tempObj);
        }
    }                 
}

const processdata = (html,usn) => {
    if(captchaErr(html) == 1) {
        console.log("captcha err")
        return -1;
    }
    else{
        // console.log('html', html)
        // console.log("processing dom")
        fs.writeFile("html", html, function(err) {
            if(err) {
                return console.log(err);
            }
            console.log("The file was saved!");
        }); 
        var $ = cheerio.load(html);
        var allmarks = [];
        var marks = [];
        $(".divTableCell").each((i, el)=> {
            const item = $(el).text();
            console.log(item);
            allmarks.push(item);
        }) 
        console.log('allmarks', allmarks)
        var ends = false;
        var tempObj = {};
        marks = scrape(allmarks);
        var finObj = {
            usn: usn,
            marks: marks
        }
        console.log(finObj);
        return finObj;
    }   
}



//******************************** */test env********************************//
// html = request('http://localhost/VTU%20Result.html', function (error, response, body) {
//     usn = '1AY15CS055'
//     var res = processdata(body, usn);
// })

/*****************************************************************************/

module.exports ={
    processdata: processdata
}
