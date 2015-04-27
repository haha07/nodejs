
/*
 * GET home page.
 */

exports.index = function(req, res){
	req.getConnection(function(error,connection){
		connection.query('SELECT * FROM images',function(error,results){
			res.render("index",{
				data:results
			});
		});
	});
};
