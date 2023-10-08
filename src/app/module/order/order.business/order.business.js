const { product } = require("../../product/product.model/product.model");
const { order } = require("../order.model/order.model");
const bcrypt = require("bcrypt");

const addorder = async (user, body) => {
    console.log("user=======================", user);
    console.log("body======================", body)
    body.userId = user._id;
    body.status = 'Order-Confiram';
    let productId = await product.find({ _id: body.productId });
    if (!productId) throw "this product not found"
    let findOrder = await order.find({ userId: user._id, productId: body.productId })
    console.log("findOrder========================", findOrder);
    if (findOrder.length>=1) throw "you have already purchase this order.."
    const data = new order(body);
    const result = await data.save();
    return {
        msg: "addorder success",
        result: result
    };

}
const getOrder = async () => {
    try {
        const response = await order.find();
        console.log("response========================", response);
        if (!response) throw "response not find "
        return {
            msg: "getOrder success",
            count: response.length,
            result: response
        };
    } catch (error) {
        console.log("error========================", error);

    }
}
const getOrderById = async (body, id) => {
    try {
        const getdata = await order.findById(id);
        if (!getdata) throw "getdata not found";
        console.log("getdata===================", getdata);
        return {
            msg: "getdata success",
            result: getdata
        };
    } catch (error) {
        throw "error data find";
    }
}

const updateOrderById = async (body, id) => {
    try {
        const updated = await order.findByIdAndUpdate(id, { $set: body }, { new: true });
        if (!updated) throw "updated not find"
        return {
            msg: "updated successfully",
            result: updated
        }
    } catch (error) {
        console.log("error=================", error);
        throw "error data find"
    }
}
const cancleOrder = async (user, body, id) => {
    try {
        body.status = "cancle"
        let updated = await order.findByIdAndUpdate(id, { $set: body }, { new: true })
        if (!updated) throw "order not find "
        console.log("updated=========================", updated);
        return {
            msg: "order cancle successfully.....",
            result: updated
        };
    } catch (error) {
        console.error("error====================", error);
        throw "error data find";
    }
}

const deleteDataById = async (body, id) => {
    try {
        const deletedata = await order.findByIdAndDelete(id);
        console.log("deletedata========================", deletedata);
        if (!deletedata) throw "order data not found"
        return {
            msg: "deletedata successfully",
            result: deletedata
        }
    } catch (error) {
        throw "error data find"
    }
}
const myOrderHistory = async (user) => {
    let userId = user._id
    console.log("userId====================", userId);
    try {
        const gettingdata = await order.find({ userId: userId });
        console.log("gettingdata========================", gettingdata);
        if (!gettingdata) throw "orderdata not find"
        return {
            msg: "gettingdata successfully",
            result: gettingdata
        }
    } catch (error) {
        console.log("error=====================", error);
        throw "error data find"
    }
}
module.exports = { addorder, getOrder, getOrderById, updateOrderById, cancleOrder, deleteDataById, myOrderHistory };

