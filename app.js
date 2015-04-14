
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  , fs = require('fs')
  , ejs = require('ejs')
  , db = require('mongojs').connect('test',['kim'])
  ,connection  = require('express-myconnection')
  , mysql = require('mysql');

/*app에서 바로 사용할떄*/
var client = mysql.createConnection({
	host : '52.68.68.17',
	port : '3306',
	user : 'root',
	password : '1234',
	database : 'test'
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

app.use(express.static(path.join(__dirname, 'public')));
app.use('/script', express.static(__dirname +'/jqgrid'));

/*render에서 사용할때*/
app.use(
		connection(mysql,{
			host : '52.68.68.17',
			port : '3306',
			user : 'root',
			password : '1234',
			database : 'test'
		},'request')
);
// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);

/*app.get('/', function (req,res){
	//파일을 읽습니다.
	fs.readFile('list.html','utf8', function(error,data){
		client.query('SELECT * FROM productss',function(error,results){
			res.send(ejs.render(data,{
				data:results
			}));
		});
	});
});*/


/*app.get('/grid', function(req,res){
	client.query('SELECT * FROM productss',function(error,results){
		console.log(results);
	});
});*/

app.get('/grid', user.grid);

app.get('/users', user.main);

app.get('/list', user.list);

app.get('/edit/:id', function(req,res){
	client.query('select * from productss where id=?',[req.param('id')],function(error,result){
		res.render("edit",{
				data:result[0]
			});
	});
});
app.post('/edit/:id', function(req,res){
	var body = req.body;
	client.query('update productss set name=?,modelnumber=?,series=? where id=?',[
	       body.name,body.modelnumber,body.series,req.param('id')],function(){
		res.redirect('/list');
	});
});

/*user부분에서 처리하고 싶으나 id값을 어떻게 보내야 될지 모르겠음*/
/*app.get('/delete/:id', user.delet);*/
app.get('/delete/:id' , function(req, res){
	client.query('delete from productss where id = ?',[req.param('id')],function(){
		res.redirect('/list');
	});
});

app.get('/insert', user.ginsert);
/*app.post('insert', user.pinsert);*/
app.post('/insert', function(req,res){
	var body = req.body;
	client.query('insert into productss (name,modelnumber,series) values (?,?,?)',[
	           body.name,body.modelnumber,body.series],function(){
		res.redirect('/list');
	});
});



app.use(app.router);

http.createServer(app).listen(app.get('port'), function(){
	
  console.log('Express server listening on port ' + app.get('port'));
});
