const express = require('express') //pulling in the express module
const app = express() //applying the module to the const app for functionality

//the below code allows us to acces static pages easily
//all static files should be kept in the public folder
//this is a standard naming convention
//now when we go to localhost:3000/test.html we can see our page rendered
//the parameter "public" that we passed in below tells express to look in this folder for static files
app.use(express.static("public"))

//ejs is used to allow us to render html documents through express
//there are other options, but this is a popular one
//the below syntax must be set in order to render html
//also, your .html extentions will need to be changed to .ejs instead
app.set('view engine', 'ejs')

//the below line of middleware allows us to access our req.body parameters
//without this, you will recieve an error when trying to get form data coming from the user
app.use(express.urlencoded({ extended: true }))

//the below line of middleware allows us to fetch information from the server to the user
//it is needed in order to grab data from the server and display that info on your page
app.use(express.json())


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

//the below line brings in our routes from users.js
//you have to be specific about the files path location
const userRouter = require('./routes/users')

//the logic in the below line is important for establishing our routes
//here is what is happeneing
//the first parameter is telling express "where" to mount this router
//that means when we request localhost:3000/users express will look in user.js
//in users.js, the "homepage" is localhost:3000/users
//take a look in users.js and you will see that the "homepage" route is "/"
app.use("/users", userRouter)



app.listen(3000) //this line launches our server on a specific port
