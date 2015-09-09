var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


/* Get Hello World Page .*/

router.get('/helloworld',function(req,res){
		res.render('helloworld',{title:'Hello World'});
});

/* Get UserList page .*/

router.get('/userlist', function(req, res) {
    var db = req.db;
    var collection = db.get('usercollection');
    collection.find({},{},function(e,docs){
        res.render('userlist', {
            "userlist" : docs
        });
    });
});

router.get('/newuser',function(req,res){
		res.render('newuser',{title:'Add New User'});
});

// to Add a new User



/* POST to Add User Service */


router.post('/adduser', function(req,res){
		console.log('In Post adding user');
		// Set out internal database variable
		var db = req.db;
		
		//Getout Form variables.
		var userName = req.body.username;
		var userEmail = req.body.useremail;
		
		//set our collection in MongoDB
		var collection = db.get('usercollection');
	
	//Submit to the database

	collection.insert({
			"username": userName,
			"email": userEmail
	}, function(err,doc) {
		if(err) {
			// if it failed, return error
			res.send("There is a problem adding the user");
		}
		else {
			// And forward to succes Page
			res.redirect("userlist");
		}
	});
	
});




module.exports = router;
