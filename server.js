var express = require("express");
var session = require('express-session');
var app = express();
var path = require("path");

app.use(session({
    secret: 'get it right get it tight',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 60000
    }
}))
app.use(express.static(path.join(__dirname, "./static")));
app.set('views', path.join(__dirname, "./views"));
app.set('view engine', 'ejs');

app.get('/', function (req, res) {
    if(req.session.count){
        req.session.count++;
    }
    else{
        req.session.count = 1;
    }
    res.render('counter', {count: req.session.count})
})
app.get('/p2', function(req, res){
    req.session.count += 1
    res.redirect('/');
})
app.get('/destroy', function(req, res){
    req.session.destroy();
    res.redirect('/');
})
app.listen(8000, function () {
    console.log("listening on port 8000");
});