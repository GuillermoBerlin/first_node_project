var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next) {
  res.send('respond with a resource. Get required');
});
router.post('/', function(req, res, next) {
  res.send('respond with a resource. Post required');
});

module.exports = router;
  