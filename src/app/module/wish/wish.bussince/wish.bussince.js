const { product } = require("../../product/product.model/product.model");
const { wish } = require("../wish.modle/wish.modle");
const bcrypt = require("bcrypt");


const addWishlist = async (user, body) => {
    console.log("user=======================", user);
    console.log("body======================", body)
    body.userId = user._id;
    body.isWishList = true; 
    let productId = await product.find({ _id: body.productId });
    if (!productId) throw "this product not found"
    let findWishList = await wish.find({ userId: user._id, productId: body.productId })
    console.log("findWishList========================", findWishList);
    if (findWishList.length>=1) throw "you have already purchase this order.."
    const data = new wish(body);
    const result = await data.save();
    return {
        msg: "addorder success",
        result: result
    };

}
const getWishList = async () => {
    const response = await wish.find();
    console.log("response==================", response);
    if (!response) {
        throw "invalited data find"
    }
    return {
        msg: "getWishList successfully",
        count: response.length,
        result:response
    }
}

const putWishListById = async (id,body) => {
    const updatedata = await wish.findByIdAndUpdate(id,body,{new:true});
    console.log("updatedata=====================", updatedata);
    if (!updatedata) throw "User not found"
    return {
        msg: "updatedata successfully",
        result:updatedata
    }
}
const deleteWishListById = async (body, id) => {
    console.log("body====================", body);
    const deletedata = await wish.findByIdAndDelete(id);
    console.log("deletedata========================", deletedata);
    if (!deletedata) throw "deletedata not found"
    return {
        msg: "deletedata successfully",
        result:deletedata
    }
}

module.exports={addWishlist,getWishList,putWishListById,deleteWishListById}