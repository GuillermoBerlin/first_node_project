var express = require('express');
var router = express.Router();
const cartController = require("../controllers/cartController");

router.get('/:userId', cartController.getByUserId);
router.post('/products/', cartController.addProduct);
router.delete('/products/', cartController.removeProduct);

module.exports = router;