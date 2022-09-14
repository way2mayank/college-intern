const express = require('express');
const Router = express.Router();
const collegeController= require("../controller/collegeController")
const internController=require("../controller/internController")


Router.post("/functionup/colleges",collegeController.college)
Router.post("/functionup/interns",internController.intern)

module.exports =Router;