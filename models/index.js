var Sequelize = require('sequelize');
var db = new Sequelize('postgres://localhost:5432/wikistack');
//var db = new Sequelize('postgres://localhost:5432/dataBaseName');


// var modelName = db{
// 	column: {type: , unique: , allowNull: true}

// }
//CREATE TABLE users ( id SERIAL PRIMARY KEY, name TEXT DEFAULT NULL, pictureUrl TEXT );

//Model/Table "Page"
var Page = db.define('page', {
    title: {
        type: Sequelize.STRING
    },
    urlTitle: {
        type: Sequelize.STRING
    },
    content: {
        type: Sequelize.TEXT
    },
    status: { //if the page is open, if at url
        type: Sequelize.ENUM('open', 'closed')
//Sequelize.ENUM('value 1', 'value 2')  
// An ENUM with allowed values 'value 1' and 'value 2'

    }
});
//Model/Table "Users"

var User = db.define('user', {
    name: {
        type: Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING
    }
});

user.sync({
	force: true
	logging: console.log
})
.then(function(){
	user.CREATE({
		title: "User1 string",
		urlTitle: "url string",
		content: "contents text"
		status: "open"
	})
})




module.exports = {
  Page: Page,
  User: User
};