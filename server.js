const express = require('express');
const hbs = require('hbs');
const app = express();
const fs = require('fs');

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
app.use(function(req,res,next){
    var now = new Date().toString();
    var log = now +' '+ req.method + ' ' +req.url + '\n';
    fs.appendFile('Server.log',log,function (err) {
        if(err){
            console.log('Unable to append to Server log');
        }
    });
    next();
});
// app.use(function(req,res,next){
//     res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentyear', function () {
    return new Date().getFullYear();
});

hbs.registerHelper('UpperText',function(text){
    return text.toUpperCase();
});

app.get('/', function (req, res) {
    res.render('home.hbs', {
        title: 'Welcome to My Website',
    });
});

app.get('/about', function (req, res) {
    res.render('about.hbs', {
        title: 'About Us Page',
    });
});

app.get('/bad', function (req, res) {
    res.send({
        errorMessage: 'Uable to Fulfil this request'
    });
});

app.listen(3000, function () {
    console.log('Server is up on port 3000');
});