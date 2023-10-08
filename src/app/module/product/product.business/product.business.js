const { product } = require("../product.model/product.model");
const bcrypt = require("bcrypt");

const addproduct = async (body, user) => {
    console.log("user----------->>",user)
    try {
        body.createdBy=user._id
        const data = new product(body);
        const result = await data.save();
        return {
            msg: "add product successfully",
            result: result
        };
    } catch (error) {
        console.error("Error adding product:", error);
        throw error; 
    }
};
const getproduct = async () => {
    try {
        const response = await product.find();
        console.log("response=====================", response);
        if (!response) {
            throw "response not found"
        }
        return {
            msg: "product geted successfully",
            count: response.length,
            result:response
        }
    } catch (error) {
        throw "error"
    }
}
const updatedataById = async (id, body) => {
    try {
        const updatedata = await product.findByIdAndUpdate(id, body, { new: true });
        console.log("updatedata============================", updatedata);
        if (!updatedata) {
            throw "product data not found"
        }
        return {
            msg: "updatedata successfully",
            result:updatedata
        }
    } catch (error) {
        throw "error data find"
    }
}

const deletedataById = async (id, body) => {
    try {
        const deletedata = await product.findByIdAndDelete(id);
        console.log("deletedata=============================", deletedata);
        if (!deletedata) {
            throw "product data not found"
        }
        return {
            msg: "deletedata success",
            result:deletedata
        }
    } catch (error) {
        throw "error data find"
    }
}

module.exports={addproduct,getproduct,updatedataById,deletedataById}