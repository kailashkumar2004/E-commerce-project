const mongoose = require("mongoose");
const{User}=require("../../user/user.model/user.modle")
const bcrypt = require("bcrypt");
const wishSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    productId: {
        type:mongoose.Schema.Types.ObjectId,
        ref:"product"
    },
    isWishList: {
        type: Boolean,
        require:true
    },
    wishListDate: {
        type:Date
    }

});
wishSchema.statics.findByToken = async function (token, res) {
    var user = this;
    var decoded;
    try {
      decoded = jwt.verify(token, secret);
    } catch (e) {
      throw e.message || "Unauthorised request";
    }
    return wish.findOne({
      _id: decoded._id,
    })
      .then((user) => {
        if (!user) {
          return Promise.reject({ message: msg.unauthorisedRequest });
        } else {
          return Promise.resolve(product);
        }
      })
      .catch((e) => {
        throw msg.unauthorisedRequest;
      });
  };
const wish = mongoose.model("wish", wishSchema);
module.exports = { wish };
