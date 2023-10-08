const { addorder ,getOrder,getOrderById,updateOrderById,cancleOrder,deleteDataById,myOrderHistory} = require("../order.business/order.business");
exports.addorder = async (req) => await addorder(req.user, req.body);//
exports.getOrder = async (req) => await getOrder();
exports.getOrderById = async (req) => await getOrderById(req.body, req.params.id);
exports.updateOrderById = async (req) => await updateOrderById(req.body, req.params.id);
exports.cancleOrder = async (req) => await cancleOrder(req.user, req.body, req.params.id);
exports.deleteDataById = async (req) => await deleteDataById(req.body, req.params.id);
exports.myOrderHistory = async (req) => await myOrderHistory(req.user);