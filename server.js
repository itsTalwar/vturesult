const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const index = require('./index');
const path = require('path');
var multer = require('multer');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'fetchusn/')
  },
  filename: function (req, file, cb) {
    console.log(file)
    cb(null, file.originalname)
  }
})

var upload = multer({ storage: storage });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/index', express.static(path.join(__dirname, 'public')))

app.listen(8000, ()=> {
    console.log('app listening at port 8000');
});

var globalCSV;

app.post('/extract', upload.any('usn.csv'), (req, res) => {
    // console.log("randomName", randomName)
    // console.log('req', req.body)
    // console.log('file', req.files[0].filename)
    var captcha = req.body.captcha;
    var cookie = req.body.cookie;
    var token = req.body.token;
    var csv = req.files[0].filename;
    globalCSV = `marks_${csv}`;
    // console.log("global csv ", globalCSV)
    // console.log("csv in server", csv)
    index.getAllResults(captcha, cookie, csv, token)
      .then((data) => {
        res.sendFile(path.join(__dirname+'/public/extractSuccessResponse.html'))
        console.log('done')
      })
      .catch((err)=> {
        res.sendFile(path.join(__dirname+'/public/extractFailResponse.html'))
        console.log(err)
      })    
})

app.get('/download', (req, res) => {
  console.log("triggered yo");
  var file = `${__dirname}\\public\\${globalCSV}`;
  console.log("file is", file)
  globalCSV = null;
  res.download(file, (err) => {
    if(err) throw err;
    console.log("file sent")
  });  
  
})