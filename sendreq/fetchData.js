const request = require('request');
const fetchData = (cookie,usn,captcha)=> {
    var headers  = {
        "Host": "results.vtu.ac.in",
        "Origin": "http://results.vtu.ac.in",
        // "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:62.0) Gecko/20100101 Firefox/62.0",
        "User-Agent": `Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.109 Mobile Safari/537.36`,
        // "Accept": "text/html",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8",
        "Accept-Language":" en-US",
        // "Referer": "http://results.vtu.ac.in/DecJanExamResults2018/vitaviresultcbcs/resultpage.php",
        "Referer" : "http://results.vtu.ac.in/resultsvitavicbcs_19/index.php",
        "Content-Type": "application/x-www-form-urlencoded",
        "Cookie": `PHPSESSID=${cookie}`,
        "Connection": "keep-alive",
        "Content-Length": "265",
        "Accept-Encoding": "gzip, deflate"
    };
    
    var myJSONObject = {
        "captchacode":captcha,
        "lns":usn,
        "token": "eW0yQ2Qrc2hTemJXOFMzdHI0TFlmOHdmOGttK1lHSis3SU1pRGNIcGhVblNIaUdPQUY2M1RCWGlFbTRhN3lKZGJ3QjY1WWl5dFJsZS85dG1VOVVpYmc9PTo6j0M044uAYuJnG6XjdLzsnQ==",
        "current_url": "http://results.vtu.ac.in/resultsvitavicbcs_19/index.php"
    };
    return new Promise(function(resolve, reject) {
        request({
            // url: "http://results.vtu.ac.in/DecJanExamResults2018/vitaviresultcbcs/resultpage.php",
            url: "http://results.vtu.ac.in/resultsvitavicbcs_19/resultpage.php",
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