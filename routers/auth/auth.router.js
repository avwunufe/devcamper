const router = require("express").Router()
const {
    httpsRegisterUser,
    httpsLoginUser
} = require("./auth.controller")

router.route("/register").post(httpsRegisterUser)
router.route("/login").post(httpsLoginUser)

module.exports = router