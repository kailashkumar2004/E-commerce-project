const express = require("express");
const {authenticate} = require("../../middleware/middleware");
const { wrapAsync } = require("../../halpers/router.halpers");
const router = express.Router();
const {addWishlist,getWishList,putWishListById ,deleteWishListById} = require("../wish.contoler/wish.contoler");

router.post("/addWishlist", authenticate, wrapAsync(addWishlist));
router.get("/getWishList", authenticate, wrapAsync(getWishList));
router.put("/putWishListById/:id", authenticate, wrapAsync(putWishListById));
router.delete("/deleteWishListById/:id", authenticate, wrapAsync(deleteWishListById));



module.exports=router