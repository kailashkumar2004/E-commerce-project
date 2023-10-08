const mongoose = require("mongoose");
const { User } = require("../../user/user.model/user.modle");
const orderSchema = new mongoose.Schema({
    userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User' 
      },
    productId: {
        type:mongoose.Schema.Types.ObjectId,
        ref:"product"
    },
    orderDate: {
        type: Date
    },
    deleviryDate: {
        type: String
    },
    status: {
        type: String,
        enum:["Order-Confiram","Order-Delivered","Order-out-of-Delevery",'cancle']
    }
});
const order = mongoose.model("order", orderSchema);
module.exports={order}