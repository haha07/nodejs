
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , login = require('./routes/login')
  , admin = require('./routes/admin')
  , http = require('http')
  , path = require('path')
  , fs = require('fs')
  , ejs = require('ejs')
  , url = require('url')
  , session = require('express-session')
  , db = require('mongojs').connect('test',['kim'])
  , connection  = require('express-myconnection')
  , mysql = require('mysql');

/*app에서 바로 사용할떄*/
var client = mysql.createConnection({
	host : '52.68.68.17',
	port : '3306',
	user : 'root',
	password : '1234',
	database : 'test2'
});

/*db.kim.find(function(error, data){
	console.log(data);
});*/
  
var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());

app.use(express.cookieParser());
app.use(express.session({secret: 'secret key'}));
/*app.use(session({secret: 'secret key'}));*/
app.use(function(req, res, next){
    res.locals.session = req.session;
    var pathname = url.parse(req.url).pathname;
    var arr = pathname.split("/");
    res.locals.session.path = arr[1];
    res.locals.session.path1 = arr[2];
    next();
 });

app.use(express.static(path.join(__dirname, 'public')));
app.use('/script', express.static(__dirname +'/jqgrid'));
app.use('/public', express.static(__dirname +'/public'));
app.use('/slides', express.static(__dirname + '/public/img/slides'));


/*render에서 사용할때*/
app.use(
		connection(mysql,{
			host : '52.68.68.17',
			port : '3306',
			user : 'root',
			password : '1234',
			database : 'test2',
			multipleStatements: true
		},'request')
);

//app.use(function(req, res, next) {
//	if (req.session.email) {
//		res.locals.email = req.session.email;
//	} else {
//		res.locals.email = null;
//	}
//});

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/grid', user.grid);
app.post('/pgrid', user.pgrid);

app.get('/users', user.main);

app.get('/list', user.list);

app.get('/edit/:id', user.gedit);
app.post('/edit/:id', user.pedit);

app.get('/delete/:id' ,user.delet);

app.get('/insert', user.ginsert);
app.post('/insert', user.pinsert);

app.get('/login', login.login);
app.post('/login', login.plogin);

app.get('/join', login.join);
app.post('/join', login.pjoin);

app.get('/logout', login.logout);
app.get('/logoutMain', login.logout);

app.get('/admin/memberList', admin.memberList);
app.get('/admin/modMainImg', admin.modMainImg);
app.post('/admin/uploadMainImg',admin.uploadMainImg);
app.get('/admin/deleteMainImg/:idx',admin.deleteMainImg);

app.get('/Angel/Angel', user.grid);
app.get('/Angel/Wing', user.grid);
app.get('/Angel/Event', user.grid);

app.get('/Business/Nation' ,user.list);
app.get('/Business/Economy' ,user.list);
app.get('/Business/TalK' ,user.list);

app.get('/Education/Problem', user.grid);
app.get('/Education/Common', user.grid);
app.get('/Education/Healing', user.grid);

app.post('/upload',user.upload);

app.post('/nameTest',login.nameTest);

app.use(app.router);

http.createServer(app).listen(app.get('port'), function(){

  console.log('Express server listening on port ' + app.get('port'));
});
