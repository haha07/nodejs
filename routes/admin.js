exports.admin = function(req, res){
	if(req.session.level < 1) {
		req.getConnection(function(error,connection){
			connection.query('SELECT * FROM member',function(error,results){
				res.render("admin",{
					data:results,
					ses:req.session
				});
			});
		});
	}
	else {
		res.redirect('/login');
	}
};