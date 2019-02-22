const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const index = require('./index');
const path = require('path');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/index', express.static(path.join(__dirname, 'public')))

app.listen(8000, ()=> {
    console.log('app listening at port 8000');
});

app.post('/extract', (req, res) => {
    console.log('req', req.body)
    var captcha = req.body.captcha;
    var cookie = req.body.cookie;
    index.getAllResults(captcha, cookie);
    res.send('done')
})