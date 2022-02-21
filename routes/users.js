//this file teaches us how to structure our routes better
//express provides a Router method
//this method will help us to seperate our main server logic from our routes
//similar routes can be stored in the same file to help encapsulate different routes in their own area

const express = require("express") //bringing in express
const router = express.Router() //this brings in the router functionality mentioned above

//the code below is middleware and it will be executed anytime and of the below routes are called
//the function "logger" is defined at the bottom of this page
router.use(logger)

//check out the app.use function in server.js
//we have mounted the users path to this file
//now when we call localhost:3000/users, the below function is fired
router.get('/', (req, res) => {
    //the below line of code allows us to access parameters passed into our url
    //foir exmaple, going to localhost:3000/users?name=tom will cause tom to be logged to the console
    console.log(req.query.name)
    res.send("user list")
})

//the below function will be called when localhost:3000/users/new is requested
//the app.use function has mounted the users path to this file
router.get('/new', (req, res) => {
    res.render("users/new", { firstName: "Test" })
})

//this is a post request and will be accessed through our html form
router.post('/', (req, res) => {
    //the below console.log will let us to access the body of our request
    //but express does not allow us to access this by default
    //we have to use middleware to help us to access the body of our requests
    console.log(req.body.firstName)
    const isValid = true
    if (isValid) {
        users.push({ firstName: req.body.firstName }) //pushing our new user into our array of users
        //this will redirect our user to a new url after their post request is complete
        res.redirect(`/users/${users.length - 1}`)
    } else {
        console.log("error")
        res.render('users/new', {firstName: req.body.firstName })
    }
})

//the colon syntax below helps us to create dynamic routes
//you can access the id by using the req.params.<your dynamic url> syntax
//IMPORTANT NOTE: you have to set these at the bottom of your code
//if you do not, this might overide and routes you have above it
//long story short, put all dynamic routes below static routs
// router.get('/:id', (req, res) => {
//     res.send(`getting user with id of ${req.params.id}`)
// })

//basic put request
// router.put("/:id", (req, res) => {
//     res.send(`updating user with id of ${req.params.id}`)
// })

//basic delete request
// router.delete("/:id", (req, res) => {
//     res.send(`deleting user with an id of ${req.params.id}`)
// })


//the below syntax is helpful when we have routes which all use the same variable
//if you look above, you can see we have commented out the original routes
//these were all using the id parameter, so instead, we included them all into one run
//this uses the router.route method
router.route("/:id")
    .get((req, res) => {
        console.log(req.user)
        res.send(`getting user with id of ${req.params.id}`)
    })
    .put((req, res) => {
        res.send(`updating user with id of ${req.params.id}`)
    })
    .delete((req, res) => {
        res.send(`deleting user with id of ${req.params.id}`)
    })


//the below code allows us to access the values of users at a given id
//for example, when you call localhost:3000/users/1 we will see sally outputted to our terminal
//this is because sally is the second person in our array users
//this block of code runs before anything else in this file
//if we do not run the next function, this code will keep the page loading indefinitly
//the first arguement in router.param is the value we want to grab
//the second argument is a callback function
//in the function we set req.user (we made up the user part of this variable name) to our user[id]
//now we can access this information in other areas of our code
//in the get request for a single user above, we are using this information to log sally our to the terminal  
const users = [{name: "kyle"}, {name: "sally"}]
router.param("id", (req, res, next, id) => {
    req.user = users[id]
    next()
})

//this function is being called by the middleware at the top of this file
//it grabs the url requests and posts it to the console
//if the next function is excluded, the page will run indefinitly
function logger(req, res, next){
    console.log(req.originalUrl)
    next()
}

//this is how we make exports in node
module.exports = router