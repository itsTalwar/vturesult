const request = require('request');
const fetchData = (cookie,usn,captcha)=> {
    var headers  = {
        "Host": "results.vtu.ac.in",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:62.0) Gecko/20100101 Firefox/62.0",
        "Accept": "text/html",
        "Accept-Language":" en-US",
        "Referer": "http://results.vtu.ac.in/DecJanExamResults2018/vitaviresultcbcs/resultpage.php",
        "Content-Type":" application/x-www-form-urlencoded",
        "Cookie": `PHPSESSID=${cookie}`,
        "Connection": "keep-alive"
    };
    
    var myJSONObject = {"captchacode":captcha,"lns":usn};
    return new Promise(function(resolve, reject) {
        request({
            url: "http://results.vtu.ac.in/DecJanExamResults2018/vitaviresultcbcs/resultpage.php",
            method: "POST",
            headers: headers,
            formData :myJSONObject
        }, function (error, response, body){
            resolve(body);
        });
       })

}

module.exports = {
    fetchData: fetchData
}