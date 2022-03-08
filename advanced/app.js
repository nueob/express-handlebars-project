var express = require('express'),
    exphbs  = require('express-handlebars'),
    helpers = require('./lib/helpers');

var app = express();
// var hbs2 = require('../../').create();
var hbs = exphbs.create({
    helpers      : helpers, // 전역 helper
    /*
        partial 이란 레이아웃을 채울 파일들을 의미
    */
    partialsDir: [ 
        'shared/templates/',
        'views/partials/'
    ]
    /*
        defaultLayout : 기본 값으로 main 으로 되어 있으며 설정된 값에 따라 main layout의 파일명을 설정할 수 있다
        extname : 확장자를 설정 할 수 있다. 기본은 handlebars 이다.
        layoutDir : layout 파일 위치를 지정합니다. 기본 값은 layouts이다.
    */
});

// engine
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

//router
app.get('/', function (req, res) {
    res.render('home', {
        title: 'home'
    });
});

app.get('/create', function (req, res) {
    res.render('create', {
        title: 'Create',
        isAllowPerson : false
    });
});

app.get('/read', function (req, res) {
    res.render('read', {
        title: 'Read',
        persons : [
            {name : "nils" , age : 20},
            {name : "teddy" , age : 10},
            {name : "nelson" , age : 20}
        ],
        helpers : {
            readHelper : function(title) {
                return title + "helper";
            }
        }
    });
});

app.get('/update', function (req, res) {
    res.render('update', {
        title: 'Update'
    });
});

app.get('/delete', function (req, res) {
    res.render('delete', {
        title: 'Delete'
    });
});

//registerPartial
// hbs.registerPartial('person', "{{person.name}} is {{person.age}} years old \n");

app.listen(3000, function () {
    console.log('express-handlebars example server listening on: 3000');
});

//registerHelper , registerPartial 은 app.js에서 작성
