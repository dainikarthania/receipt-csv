let express = require('express'),
    router = express.Router();
let {signUp,signIn,myProfile,getJoke,logout} = require('../controller/UserController')
let {authorize} = require("../middleware")
let validator = require('../schema')

router.post("/signup",validator("signUp"),signUp)
router.post("/login",validator("signIn"),signIn)
router.get("/my-profile",authorize,myProfile)
router.delete("/logout",authorize,logout)


module.exports = router
