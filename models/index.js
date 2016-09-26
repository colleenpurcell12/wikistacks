var Sequelize = require('sequelize');
var db = new Sequelize('postgres://localhost:5432/wikistack',
	{logging: false});
//var db = new Sequelize('postgres://localhost:5432/dataBaseName');

 
// var modelName = db{
// 	column: {type: , unique: , allowNull: true}

// }
//CREATE TABLE users ( id SERIAL PRIMARY KEY, name TEXT DEFAULT NULL, pictureUrl TEXT );

//Model/Table "Page"
var Page = db.define('page', {
            title: {
                type: Sequelize.STRING, allowNull: false
            },
            urlTitle: {
                type: Sequelize.STRING, allowNull: false //, unique: true//, defaultValue: '/'
            },
            content: {
                type: Sequelize.TEXT, allowNull: false
            },
            status: { //if the page is open, if at url
                type: Sequelize.ENUM('open', 'closed')
        //Sequelize.ENUM('value 1', 'value 2')  
        // An ENUM with allowed values 'value 1' and 'value 2'
            }, 
            date: {
                type: Sequelize.DATE,
                defaultValue: Sequelize.NOW
             } 
             , 
            tags : {
                type: Sequelize.ARRAY(Sequelize.TEXT)
            }

    	}, 
        {
        hooks: {
            beforeValidate:  function(page){
                         //console.log("page:",page);
                         if(page.title){
                            //  return titleIn.replace(/\s/, "_") 
                            page.urlTitle = page.title.replace(/\s+/g, '_').replace(/\W/g, '');
                            //g is global to check whole string
                            // \W Matches any character that is not a word character from the basic Latin alphabet.
                         } else { 
                            page.urlTitle =  Math.random().toString(36).substring(2, 7);
                         }
        
                }
            }
        },
        {  
            //proerty descripters that run whenever the prop key is incvoked
		getterMethods:{
			route       : function()  { return '/wiki/' + this.urlTitle  }
		}
	   }
    );
//Model/Table "Users"

var User = db.define('user', {
    name: {
        type: Sequelize.STRING, allowNull: false
    },
    email: {
        type: Sequelize.STRING, allowNull: false
    }
});

Page.belongsTo(User, { as: 'author' });

/*user.sync({
	force: true
	logging: console.log
})*/
// .then(function(){
// 	user.CREATE({
// 		title: "User1 string",
// 		urlTitle: "url string",
// 		content: "contents text",
// 		status: "open"
// 	})
// })

module.exports = {
  Page: Page,
  User: User
};








