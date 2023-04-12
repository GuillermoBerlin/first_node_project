var express = require('express');
var router = express.Router();
const productsController = require("../controllers/productsController")

router.get('/', productsController.getAll);
router.get("/categories/:categoryId", productsController.getByCategory);
router.get("/:id", productsController.getById);
router.post("/",productsController.create);
//router.post("/",(req,res,next)=>{req.app.verifyToken(req,res,next)},productsController.create);
router.put("/:id",productsController.update)
router.delete("/:id", productsController.delete)
 
 
module.exports = router;
   