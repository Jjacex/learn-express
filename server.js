const express = require('express') //pulling in the express module
const app = express() //applying the module to the const app for functionality

//ejs is used to allow us to render html documents through express
//there are other options, but this is a popular one
//the below syntax must be set in order to render html
//also, your .html extentions will need to be changed to .ejs instead
app.set('view engine', 'ejs')

//this is a simple get request
//this function will fire when our user loads the following route
//the function can be setup as a callback here
//you can also create a function elsewhere to be called
//usually a controller file is equipped with all the functions you create
app.get('/', (req, res) => {
    console.log("request made to '/'") //this is called in the console when the route is requested
    //the below line has 2 arguments
    //the first parameter will load our index page from our views folder
    //the views folder is where express will search for our views
    //the second parameter is optional, but it allows us to pass through a variable
    //see the index.ejs folder for more information
    res.render('index', {text234: "World"})
})

app.listen(3000) //this line launches our server on a specific port
