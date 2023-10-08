let express = require("express");
const{ authenticate} = require("../../middleware/middleware");
const { wrapAsync } = require("../../halpers/router.halpers");
let router = express.Router();
const { addorder, getOrder,getOrderById ,updateOrderById,cancleOrder,deleteDataById,myOrderHistory} = require("../order.controller/order.controller");


router.post("/addorder", authenticate, wrapAsync(addorder));
router.get("/getOrder", authenticate, wrapAsync(getOrder));
router.get("/getOrderById/:id", authenticate, wrapAsync(getOrderById));
router.put("/updateOrderById/:id",authenticate,wrapAsync(updateOrderById))
router.put("/cancleOrder/:id", authenticate, wrapAsync(cancleOrder));
router.delete("/deleteDataById/:id", authenticate, wrapAsync(deleteDataById));
router.get("/myOrderHistory", authenticate, wrapAsync(myOrderHistory));




module.exports = router;