
/*
 * GET users listing.
 */

exports.main = function(req, res){
  res.send("respond with a resource");
};

exports.grid = function(req, res){
	req.getConnection(function(error,connection){
		connection.query('SELECT * FROM productss',function(error,results){
			console.log(results);
			res.render("grid",{
				list:results
			});
		});
	});
};


exports.list = function(req, res){
	req.getConnection(function(error,connection){
		connection.query('SELECT * FROM productss',function(error,results){
			console.log(results);
			res.render("list",{
				data:results
			});
		});
	});
};

/*exports.delet = function(req, res){
	req.getConnection(function(error,connection){
		connection.query('DELET FROM productss WHERE ID = ?',[req.param('id')],function(){
			res.redirect('/main');
		});
	});
};*/

exports.ginsert = function(req,res){
	res.render("insert");
};

/*exports.pinsert = function(req,res){
	var body = req.body;
	console.log(body);
};*/

exports.edit = function(req ,res){
	res.render("edit");
};
