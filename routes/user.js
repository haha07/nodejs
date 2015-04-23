
/*
 * GET users listing.
 */

exports.main = function(req, res){
  res.send("respond with a resource");
};

exports.grid = function(req, res){
	/*res.header("Content-Type", "application/json; charset=utf-8");*/
	/*res.setEncoding('utf-8');*/
	req.getConnection(function(error,connection){
		connection.query('SELECT * FROM product',function(error,results){
			console.log(req.session.email);
			res.render("grid",{
				list:results
			});
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
		var filePath = __dirname + "\\files\\" + req.files.uploadFile.name;
		fs.writeFile(filePath, data, function(error){
			res.redirect("/");
		});
	});
};
