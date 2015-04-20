
/*
 * GET home page.
 */

exports.login = function(req, res){
  res.render('member/login');
};

var sess = {};
exports.plogin = function(req, res){
	var body = req.body;
	req.getConnection(function(error,connection){
		connection.query('SELECT * FROM member',function(error,results){
			/*row = results.length;*/
			/*console.log(row);*/
			/*console.log(results[0].email);*/
			for(var i in results){
				if(body.email == results[i].email){
					sess = req.session;
					sess.email = body.email;
					console.log(sess);
					res.render('index');
				}else{
					res.redirect('/login');
				}
			}
		});
	});
};

exports.join = function(req, res){
	res.render('member/join');
};