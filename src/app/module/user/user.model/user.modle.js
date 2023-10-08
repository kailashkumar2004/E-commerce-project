const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

const{secretKey}=require("../../../../../secretKey")
const userSchema = new mongoose.Schema({
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String
    },
    gender: {
        type: String
    },
    dob: {
        type: String
    },
    dog: {
        type: String
    },
  refralBonus: {
    type: Number
  },
  myRefralCode: {
     type:String 
  },
  refralCode:String,
  parentRefralcode: {
    type: mongoose.Schema.Types.ObjectId,
    ref:"user"
   } ,
    childrenUser: {
        type: [mongoose.Schema.Types.ObjectId],
        ref:"User",
    }

});


// userSchema.statics.findByToken = function (token, res) {
//   console.log("token------------------>>",token)
//     var user = this;
//     var decoded;
//     try {
//       decoded = jwt.verify(token, secretKey);
//       console.log("decoded-------------",decoded)
//     } catch (e) {
//       throw e.message || "Unauthorised request";
//     }
//     return User.findOne({
//       _id: decoded._id,
//     })
//       .then((user) => {
//         if (!user) {
//           return Promise.reject({ message: msg.unauthorisedRequest });
//         } else {
//           return Promise.resolve(user);
//         }
//       })
//       .catch((e) => {
//         throw msg.unauthorisedRequest;
//       });
// };
userSchema.statics.findByToken = function (token) {
  try {
      const decoded = jwt.verify(token, secretKey);
      return User.findOne({ _id: decoded._id });
  } catch (e) {
      throw e.message || "Unauthorized request";
  }
};

userSchema.pre("save", async function (next) {
  const saltrounds = 5;
  if (this.password) {
    this.password = await bcrypt.hash(this.password, saltrounds);

    // this.password = CryptoJS.AES.encrypt(this.password, process.env.secret_key).toString();
    next();
  } else {
    next();
  }
});
const User = mongoose.model("User", userSchema);
module.exports={User}