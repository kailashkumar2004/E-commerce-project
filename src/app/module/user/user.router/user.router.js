let express = require("express");
const { authenticate } = require("../../middleware/middleware");
const {wrapAsync}=require("../../halpers/router.halpers")
let router = express.Router();
// const bcrypt = require("bcrypt");
const { adduser ,getuser,updateUserById,deleteUserById,register,login} = require("../user.controller/user.controller")


router.post("/adduser", wrapAsync(adduser));
router.get("/getuser", wrapAsync(getuser));
router.put("/updateUserById/:id", wrapAsync(updateUserById));
router.delete("/deleteUserById/:id", wrapAsync(deleteUserById));
router.post("/register", wrapAsync(register));
router.post("/login", wrapAsync(login));

module.exports = router;