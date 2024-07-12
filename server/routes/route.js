const express= require("express")
const router= express.Router();
const controller= require('../controller/user')
router.route("/login").post(controller.login)
router.route('/register').post(controller.register)
router.route("/users").get(controller.getuserdata)
module.exports= router