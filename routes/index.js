//routes 

var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var models = require('../models');

var Promise = require('bluebird');

var Page = models.Page; 
var User = models.User; 
var tagArray = [];

router.use( bodyParser.urlencoded({extended: true}) );	
router.use( bodyParser.json() ); //creates req.body

router.get('/wiki/search', function(req,res){
	res.render('tagSearch')
})


router.get('/wiki/results', function(req,res){
	var tags = req.body.tags.split(" ");
	Page.findAll({
    	//$overlap matches a set of possibilities
	    where : {
	        tags: {
	            $overlap: tags //['someTag', 'someOtherTag']
	        }
	    }    
	})
	.then(function(pages){
		res.render('index', {pages: pages})

	});

	

});
router.get('/wiki', function(req,res,next){
	 Page.findAll({})
	 .then(function(allPages){
	 	//console.log("pages",page.route);
	 	res.render( 'index', {pages: allPages }) 
	}).catch(next);
}),

router.get('/users', function(req,res){

	 User.findAll()
	 .then(function(allUsers){
	 	res.render( 'users', {users: allUsers }) 
	})
}),

router.get('/users/:userId', function(req,res, next){

	//  Page.findAll({
	//  	where: {
	// 	    authorId: req.params.id
	//   }
	//  })
	//  .then(function(allPages){
	//  	res.render( 'index', {pages: allPages }) 
	// })
	var userPromise = User.findById(req.params.userId);
 	 var pagesPromise = Page.findAll({
	    where: {
	      authorId: req.params.userId
	    }
	  });
	  Promise.all([
	    userPromise, 
	    pagesPromise
	  ])
	  .then(function(values) {
	  		    //console.log("values",values)

	    var user = values[0];
	    var pages = values[1];
	   // console.log("user",user,"and pages",pages)
	    res.render('singleUser', { user: user, pages: pages });
	  })
	  .catch(next);
}),



router.post('/wiki', function(req,res, next){
	 var titleIn = req.body.title;

	User.findOrCreate({
	  where: {
	    name: req.body.name,
	    email: req.body.email
	  }
	})
	.then(function (values) {
		//console.log("***REQ.body.tags",req.body.tags.split(" "))
		//tagArray = req.body.tags.split(" ");
		console.log("***tagArray",tagArray);
		  var user = values[0];
		  var page = Page.build({
		    title: req.body.title,
		    content: req.body.content,
		    tags: tagArray
	  		});

	  return page.save().then(function (page) {
	    return page.setAuthor(user);
	  });

	})
	.then(function (page) {
		//console.log("page.route",page.route;
		//console.log(page)
	  //res.redirect(page.route);

	  res.redirect('/wiki/'+ page.urlTitle);
	})
	.catch(next);
})

router.get('/add', function(req,res){
	//req.body object produced by the body-parser 
	 res.render( 'addpage' ); //../views/, { } ); //showForm: true
	 //curl "http://localhost:3001" -X POST
})
router.get('/wiki/:urlName', function(req,res){
	//console.log(req.params.urlName);

/*
	Page.findOne({
	    where: {
	        urlTitle: req.params.urlTitle
	    },
	    include: [
	        {model: User, as: 'author'}
	    ]
	})
	.then(function (page) {
	    // page instance will have a .author property
	    // as a filled in user object ({ name, email })
	    if (page === null) {
	        res.status(404).send();
	    } else {
	        res.render('wikipage', {
	            page: page
	        });
	    }
	})
	.catch(next);
	*/
	var findPage = Page.findOne({ //
		where: {
			urlTitle : req.params.urlName ///body.urlTitle
		}
		//,include:[model: User, as: "author"] //ALTERNATIVE INNER JOIN METHOD
	})
	var findUser = Page.findOne({
		where: {
			urlTitle : req.params.urlName ///body.urlTitle
		}
	})
	.then(function(page){
		//console.log("***PAGES.authorId:",page.authorId);
		//console.log("***PAGES.tags:",page)
		//console.lo
		return User.findById(page.authorId);
	})

	Promise.all([
		findPage,
		findUser])
	.then( function(values){
		//console.log("***PAGES:",values[0],"******USERS:",values[1]);
		res.render('wikipage', {page: values[0], user: values[1]}) //content: page.content, title: page.title, urlTitle : page.urlTitle}) //.html, json(pageInstance);
	});
	

})




module.exports =  router;


//module.export = router;