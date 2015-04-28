exports.memberList = function(req, res){
	if(req.session.level < 1) {
		req.getConnection(function(error,connection){
			connection.query('SELECT * FROM member',function(error,results){
				res.render("admin/memberList",{
					data:results
				});
			});
		});
	}
	else {
		res.redirect('/login');
	}
};


exports.modMainImg = function(req, res){
	if(req.session.level < 1) {
		req.getConnection(function(error,connection){
			connection.query('SELECT * FROM images',function(error,results){
				res.render("admin/modMainImg",{
					data:results
				});
			});
		});
	}
	else {
		res.redirect('/login');
	}
};


/*exports.uploadMainImg = function(req,res){
	var fs = require('fs');
	fs.readFile(req.files.uploadFile.path, function(error, data){
		var filePath =process.cwd() + '/public/img/slides/' + req.files.uploadFile.name;
		fs.writeFile(filePath, data, function(error){
			var body = req.body;
			req.getConnection(function(error,connection){
				connection.query('INSERT INTO images (file_name,title,paragraph) VALUES (?,?,?)',
					[req.files.uploadFile.name,body.title,body.paragraph],function(){
					res.redirect('admin/modMainImg');
				});
			});
			res.redirect("/admin/modMainImg");
		});
	});
};*/

exports.uploadMainImg = function(req,res){
	var fs = require('fs');
	fs.readFile(req.files.uploadFile.path, function(error, data){
		var filePath =process.cwd() + '/public/img/slides/' + req.files.uploadFile.name;
		fs.writeFile(filePath, data, function(error){
			
		});
	});
	var body = req.body;
	req.getConnection(function(error,connection){
		connection.query('INSERT INTO images (file_name,title,paragraph) VALUES (?,?,?)',
				[req.files.uploadFile.name,body.title,body.paragraph],function(){
					res.redirect("/admin/modMainImg");
		});
		
	});
};

exports.deleteMainImg = function(req,res){
	req.getConnection(function(error,connection){
		connection.query('DELETE FROM images WHERE idx = ?',[req.params.idx],function(){
			res.redirect('/admin/modMainImg');
		});
	});
};