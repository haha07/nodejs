
/*
 * GET users listing.
 */

exports.main = function(req, res){
  res.send("respond with a resource");
};

/*exports.grid = function(req, res){
	res.header("Content-Type", "application/json; charset=utf-8");
	res.setEncoding('utf-8');
	req.getConnection(function(error,connection){
		connection.query('select count(*) as total from product; select * from product',
				function(error,rows){
			console.log(rows[1]);
			var rowss = { row:rows[1]};
			console.log(rowss);
			res.render("grid",{
				row:rowss
			});
		});
	});
};*/

exports.grid = function(req,res){
	res.render("grid");
};

/*exports.pgrid = function(req,res){
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
		connection.query('select * from product limit ?,?' , 
				[start , end] , function(error , data){
			res.send(data);
			res.send(total);
		});
	});
};*/

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
		console.log(req.session);
		req.getConnection(function(error,connection){
			connection.query('SELECT * FROM product',function(error,results){
				res.render("list",{
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

exports.delet = function(req, res){
	var id = req.params.id;
	req.getConnection(function(error,connection){
		connection.query('delete from product where ID = ?',[id],function(){
			res.redirect('/list');
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

exports.gedit = function(req,res){
    var id = req.params.id;
	req.getConnection(function(error,connection){
		connection.query('select * from product where id=?',[id],function(error,result){
		res.render("edit",{
				data:result[0]
			});
		});
   });
};

exports.pedit = function(req,res){
	var id = req.params.id;
	var body = req.body;
	req.getConnection(function(error,connection){
		connection.query('update product set name=?,modelnumber=?,series=? where id=?',[
		         body.name,body.modelnumber,body.series,id],function(){
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
