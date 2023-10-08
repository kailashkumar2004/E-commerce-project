const { addproduct,getproduct,updatedataById,deletedataById } = require("../product.business/product.business");
exports.addproduct = async (req) => await addproduct(req.body,req.user);
exports.getproduct = async (req) => await getproduct();
exports.updatedataById = async (req) => await updatedataById(req.params.id, req.body);
exports.deletedataById=async(req)=>await deletedataById(req.params.id)