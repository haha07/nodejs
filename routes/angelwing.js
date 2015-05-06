/*
 * GET users listing.
 */

exports.grid = function(req,res){
	res.render("grid");
};

exports.pgrid = function(req,res){
	var rows = req.query.rows;
	var page = req.query.page;
	var start = (page-1)*rows;
	var end = page*rows;
	if(start == 0){
		 start = 0;
	}else{
		start = start;
	}
	console.log(start);
	console.log(end);
	req.getConnection(function(error,connection){
		connection.query('select t.*, (select count(*) from product) as total from product t limit ?,?' , 
				[start , end] , function(error , data){
			res.send(data);
			/*res.send(total);*/
		});
	});
};

exports.list = function(req, res){
	if(req.session.email != "" && req.session.email != undefined) {
		req.getConnection(function(error,connection){
			connection.query('SELECT idx, title, content, writer, hit, DATE_FORMAT(regdate, "%Y-%m-%d") AS regdate FROM angel',function(error,results){
				res.render("angelwing/angel",{
					data:results
				});
			});
		});
	}
	else {
		res.redirect('/');
		/*indexjs.fn_login();*/
	}
};

exports.content = function(req,res){
	var idx = req.query.idx;
	var hit = Number(req.query.hit)+1;
	console.log(hit);
	req.getConnection(function(error,connection){
		connection.query('update angel set hit =? where idx =?',[hit,idx],function(){
			console.log('UPDATE SUCCESS');
		});
	});
	
	req.getConnection(function(error,connection){
		connection.query('SELECT * FROM angel where idx = ?', [idx] , function(error,result){
			res.render("angelwing/angledetail", {
				data:result[0]
			});
		});
	});
};


exports.del = function(req, res){
	var idx = req.query.idx;
	req.getConnection(function(error,connection){
		connection.query('delete from angel where idx = ?',[idx],function(){
			res.redirect('/Angelwing/Angel');
		});
	});
};

exports.gedit = function(req,res){
    var idx = req.query.idx;
	req.getConnection(function(error,connection){
		connection.query('select * from angel where idx=?',[idx],function(error,result){
		res.render("angelwing/angelEdit",{
				data:result[0]
			});
		});
   });
};

exports.pedit = function(req,res){
	var body = req.body;
	console.log(body);
	req.getConnection(function(error,connection){
		connection.query('update angel set title=?,content=? where idx=?',[
		         body.title,body.content,body.idx],function(){
		            res.redirect('/angelwing/angledetail?idx='+body.idx);
		  });
	});
};

exports.ginsert = function(req,res){
	res.render("insert");
};
exports.pinsert = function(req,res){
	var body = req.body;
	req.getConnection(function(error,connection){
		connection.query('insert into product (name,modelnumber,series) values (?,?,?)',[
		           body.name,body.modelnumber,body.series],function(){
			res.redirect('/list');
		});
	});
};

var fs = require('fs');
exports.upload = function(req,res){
	fs.readFile(req.files.uploadFile.path, function(error, data){
		var filePath =process.cwd() + '/public/img/slides/' + req.files.uploadFile.name;
		fs.writeFile(filePath, data, function(error){
			res.redirect("/");
		});
	});
};
