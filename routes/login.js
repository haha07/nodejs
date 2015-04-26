
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
		connection.query('SELECT email, name, password, level FROM member WHERE email=? AND password=? LIMIT 0,1', 
			[body.email,body.password], 
			function(error,results){
				if(results.length > 0){
					sess = req.session;
					sess.email = results[0].email;
					sess.name = results[0].name;
					sess.level = results[0].level;
					if(sess.level > 0) {
						res.render('index');
					}
					else {
						res.redirect('/admin/memberList');
					}
				} else {
					res.redirect('/');
					/*res.redirect('/');*/
				}

		});
	});
};


exports.join = function(req, res){
	res.render('member/join');
};

exports.logout = function(req, res){
	req.session.destroy();
	res.redirect('/');
};

exports.join = function(req, res){
	res.render('member/join');
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

exports.pjoin = function(req,res){
	var body = req.body;
	console.log(body);
	req.getConnection(function(error,connection){
		connection.query("insert into member(email,name,password,level,sex,birthday,memo) values (?,?,?,?,?,?,?)"
				,[body.email,body.name,body.password,'1',body.sex,body.birthday,body.memo]
		,function(){
				res.redirect('/');
		});
	});
};
