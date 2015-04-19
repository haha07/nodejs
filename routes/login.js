
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
		connection.query('SELECT email, name, password, level FROM member LIMIT 0,1',function(error,results){
			console.log(results);
			for(var i in results){
				if(body.email == results[i].email && body.password == results[i].password ){
					sess = req.session;
					sess.email = results[i].email;
					sess.name = results[i].name;
					sess.level = results[i].level;
					if(sess.level > 0) {
						res.render('index');
					}
					else {
						res.redirect('/admin');
					}
				} else {
					res.redirect('/login');
				}
			}
		});
	});
};

exports.logout = function(req, res){
	req.session.destroy();
	res.redirect('/login');
};

exports.join = function(req, res){
	res.render('member/join');
};