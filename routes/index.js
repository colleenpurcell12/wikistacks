//routes 

var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use( bodyParser.urlencoded({extended: true}) );	
router.use( bodyParser.json() );

var localWikiStacks = require('wikistacks.js')



router.get('/', function(req,res){
	 res.render( 'index', { } );
})

module.export = router;