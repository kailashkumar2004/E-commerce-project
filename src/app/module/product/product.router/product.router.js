let express = require("express");
const { authenticate} = require("../../middleware/middleware");
const { wrapAsync } = require("../../halpers/router.halpers");
let router = express.Router();
const { addproduct,getproduct,updatedataById,deletedataById } = require("../product.controller/product.controller")


router.post("/addproduct", authenticate,wrapAsync(addproduct));
router.get("/getproduct", wrapAsync(getproduct));
router.put("/updatedataById/:id", wrapAsync(updatedataById));
router.delete("/deletedataById/:id", wrapAsync(deletedataById));

module.exports = router;
