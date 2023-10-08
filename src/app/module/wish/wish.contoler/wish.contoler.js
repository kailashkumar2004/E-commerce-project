const { addWishlist,getWishList,putWishListById,deleteWishListById} = require("../wish.bussince/wish.bussince");
exports.addWishlist = async (req) => await addWishlist(req.user, req.body);
exports.getWishList = async (req) => await getWishList();
exports.putWishListById = async (req) => await putWishListById(req.params.id, req.body);
exports.deleteWishListById = async (req) => await deleteWishListById(req.body, req.params.id);
