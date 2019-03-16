const request = require('request');
const fs = require('fs');
const config = require('./config')
const fetchData = (cookie,usn,captcha,token,year)=> {
    var obj = config.config(cookie, captcha, usn, token)
    // console.log("year", year)
    // console.log("http obj",obj[year].headers)
    var headers  = obj[year].headers;
    var myJSONObject = obj[year].myJSONObject;
    var url = obj[year].url;
    return new Promise(function(resolve, reject) {
        request({
            // url: "http://results.vtu.ac.in/resultsvitavicbcs_19/resultpage.php",
            url: url,
            method: "POST",
            headers: headers,
            formData :myJSONObject
        }, function (error, response, body){
            if(error) throw(error)
            resolve(body);
            // fs.writeFile("html", body, function(err) {
            //     if(err) {
            //         return console.log(err);
            //     }
            //     console.log("The file was saved!");
            // }); 
        });
       })

}

module.exports = {
    fetchData: fetchData
}