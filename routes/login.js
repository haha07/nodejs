
/*
 * GET home page.
 */

exports.login = function(req, res){
  res.render('member/login');
};

exports.plogin = function(req, res){
	var body = req.body;
	req.getConnection(function(error,connection){
		connection.query('SELECT * FROM member',function(error,results){
			console.log(results);
			console.log(results.length);
			debugger;
		});
	});
};

exports.join = function(req, res){
	res.render('member/join');
};