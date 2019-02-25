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
    cb(null, Date.now() + '.csv')
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

app.post('/extract', upload.any('usn.csv'), (req, res) => {
    console.log('req', req.body)
    // console.log('file', req.files[0].filename)
    var captcha = req.body.captcha;
    var cookie = req.body.cookie;
    var csv = req.files[0].filename;
    console.log("csv in server", csv)
    index.getAllResults(captcha, cookie, csv);
    // res.send('done')
})