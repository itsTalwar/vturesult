const cheerio  = require('cheerio');
const request = require('request')

const captchaErrPatt = `alert('Invalid captcha code !!!')`

function captchaErr(html) {
    var $ = cheerio.load(html);
    var index = html.indexOf(captchaErrPatt)
    if(index == -1){
        return 0
    }
    return 1;
}

const processdata = (html,usn) => {
    if(captchaErr(html) == 1) {
        console.log("captcha err")
    }
    else{
        var $ = cheerio.load(html);
        var allmarks = [];
        var marks = [];
        $(".divTableCell").each((i, el)=> {
            const item = $(el).text();
            allmarks.push(item);
        })       
        allmarks.splice(0,6);
        allmarks.splice(allmarks.length - 5, allmarks.length);
        var tempObj = {};
        for(var i = 0; i < allmarks.length; i += 6){
            tempObj = {
                subCode: allmarks[i],
                subName: allmarks[i+1],
                ia: allmarks[i+2],
                ex: allmarks[i+3],
                tot: allmarks[i+4],
                res: allmarks[i+5]
            }
            marks.push(tempObj);
        }
        console.log("marks", marks);
        var finObj = {
            usn: usn,
            marks: marks
        }
        console.log(finObj);
        return finObj;
    }   
}



//******************************** */test env********************************//
// html = request('http://localhost/resultSample.html', function (error, response, body) {
//     usn = '1AY16CS121'
//     var res = processdata(body, usn);
// })

/*****************************************************************************/

module.exports ={
    processdata: processdata
}
