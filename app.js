
//app.js
//non-routes app or tweetbank

var express = require('express');
//var router = express.Router(); //overriding the routes/index.js
var morgan = require('morgan');
var nunjucks = require('nunjucks');
var app = express();
var models = require('./models');
var routes = require('./routes');
var bodyParser = require('body-parser');

nunjucks.configure('views', { noCache: true }); // point nunjucks to the proper 
							//directory for templates
app.set('view engine', 'html'); // have res.render work with html 
								//files
app.engine('html', nunjucks.render); // when giving html files to 

app.use('/',routes); //has to call func

app.use(bodyParser.urlencoded({ extended: true })); // for HTML form submits
app.use(bodyParser.json()); // would be for AJAX requests


app.use(morgan('dev'))
app.use(express.static('./public'))

models.User.sync({
	 //force: true
	// logging: true.
	// console.log
})
.then(function (){
	return models.Page.sync({
		//force: true
	});
})
.then(function (){
	//var server = app.listen(1337, function)
	app.listen(3001, function(){
  	console.log('listening on port 3001');
});
})
.catch(console.error);