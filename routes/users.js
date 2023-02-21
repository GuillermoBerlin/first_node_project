var express = require('express');
var router = express.Router();

const usersController = require("../controllers/usersController")


router.post("/",usersController.create);


module.exports = router;
 