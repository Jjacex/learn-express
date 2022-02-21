//this file teaches us how to structure our routes better
//express provides a Router method
//this method will help us to seperate our main server logic from our routes
//similar routes can be stored in the same file to help encapsulate different routes in their own area

const express = require("express") //bringing in express
const router = express.Router() //this brings in the router functionality mentioned above
router.use(logger)

//check out the app.use function in server.js
//we have mounted the users path to this file
//now when we call localhost:3000/users, the below function is fired
router.get('/', (req, res) => {
    res.send("user list")
})

//the below function will be called when localhost:3000/users/new is requested
//the app.use function has mounted the users path to this file
router.get('/new', (req,res) => {
    res.send("user new form")
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

function logger(req, res, next){
    console.log(req.originalUrl)
    next()
}

module.exports = router