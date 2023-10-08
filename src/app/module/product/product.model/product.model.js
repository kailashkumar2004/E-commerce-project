const mongoose = require("mongoose");
const { User } = require("../../user/user.model/user.modle");
const productSchema = new mongoose.Schema({
  productName: {
    type: String
  },
  price: {
    type: Number
  },
  distcrappition: {
    type: String
  },
  quanitiy: {
    type: String
  },
  websiteLink: {
    type: String
  },
  exprixdate: {
    type: String
  },
  createdBy: {
    type:mongoose.Schema.Types.ObjectId,
    ref:"User"
  }
}, {
  timestamps: true,
  versionKey: false
}
);

productSchema.statics.findByToken = async function (token, res) {
  var user = this;
  var decoded;
  try {
    decoded = jwt.verify(token, secret);
  } catch (e) {
    throw e.message || "Unauthorised request";
  }
  return product.findOne({
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
const product = mongoose.model("product", productSchema);
module.exports = { product }