
//non-routes app or tweetbank

var express = require('express');
var router = express.Router();
var morgan = require('morgan');
var nunjucks = require('nunjucks');
var app = express();

nunjucks.configure('views', { noCache: true }); // point nunjucks to the proper 
							//directory for templates
app.set('view engine', 'html'); // have res.render work with html 
								//files
app.engine('html', nunjucks.render); // when giving html files to 


app.use(morgan('dev'))
app.use(express.static('./public'))




