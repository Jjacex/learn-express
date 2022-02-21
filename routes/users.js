//this file teaches us how to structure our routes better
//express provides a Router method
//this method will help us to seperate our main server logic from our routes
//similar routes can be stored in the same file to help encapsulate different routes in their own area

const express = require("express") //bringing in express
const router = express.Router() //this brings in the router functionality mentioned above

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

module.exports = router