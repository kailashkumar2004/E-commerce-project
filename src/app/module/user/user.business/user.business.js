const { User } = require("../user.model/user.modle");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const {secretKey}=require("../../../../../secretKey")
const adduser = async (body) => {
    try {
        const data = new User(body);
        const result = await data.save();
        return {
            msg: "User added successfully",
            result: result,
        };
    } catch (error) {
        throw error;
    }
};

const getuser = async () => {
    const response = await User.find();
    console.log("response=============================", response);
    if (!response) throw "response not found"
    return {
        msg: "user geted successfully",
        count:response.length,
        result: response
    }

}
const updateUserById = async (id, body) => {
    try {
        const updatedData = await User.findByIdAndUpdate(id, body, { new: true });
        console.log("updatedData =========================", updatedData);
        if (!updatedData) {
            throw "User not found";
        }
        return {
            msg: "User updated successfully",
            result: updatedData,
        };
    } catch (error) {
        throw "Error updating user data";
    }
};

const deleteUserById = async (id) => {
    try {
        const deletedData = await User.findByIdAndDelete(id);
        console.log("deletedData ==================================", deletedData);
        if (!deletedData) {
            throw "User not found";
        }
        return {
            msg: "User deleted successfully",
            result: deletedData,
        };
    } catch (error) {
        throw "Error deleting user data";
    }
};
function generateRefralCode() {
    const min = 10000000000;
    const max = 99999999999;
    const random4DigitOTP = Math.floor(Math.random() * (max - min + 1)) + min;
    return random4DigitOTP;
}
const random4DigitOTP = generateRefralCode();
const register = async (body) => {
    body.myRefralCode = random4DigitOTP;
    console.log("body==================================",body)
    if (!body.refralCode) {
        const data=new User(body)    
        let data1 = await data.save();
        return {
            msg: "register succesfully",
            result: data1
        }
    } else {
        const data1 = new User(body);
        console.log("data1=================+++++++++++++++++++++++++++++++++", data1);
        let refralBonus = 0;
        console.log("refralBonus=======================",refralBonus)
        const currentDate = new Date();
        const dayOfWeek = currentDate.getDay();
        console.log("dayOfWeek================================", dayOfWeek);
        if (dayOfWeek >= 1 && dayOfWeek <= 5) {
             // Weekdays (Monda  y to Friday)
            refralBonus = 50;
        }
        else if (dayOfWeek === 6) {
            // Saturday (Weekend)
            refralBonus = 100;
        }
        else {
            refralBonus = 200;
            // Sunday (Weekend) and National Holiday
        }
        const userData = new User(data1);
        console.log("userData*********************************", userData);
        let data2 = await userData.save();
        if (data2) {
            return {
                msg: "email allready register"
            }
        }
        let parent = await User.findOne({ myRefralCode:body.refralCode });
        console.log("parent==============_____________", parent);
        if (!parent)  throw "parent not exits"
        if (parent) {
            if (!parent.refralBonus) {
                parent.refralBonus = refralBonus;
                console.log("parent.refralBonus+++++++++++++++++*****************", parent.refralBonus);
            }
            await parent.save();
            console.log("parent==============", parent);
            let updateParent = await User.findOneAndUpdate(
                { myRefferalCode:body.refralCode },
                { $push: { childrenUser: userData._id } },
                { new: true }
            );
            if (parent.childrenUser.length === 0) {
                 // parent.childrenUser.push(userData._id)
                parent.refralBonus = refralBonus
            }
            else if (parent.childrenUser.length === 1) {
                // parent.childrenUser.push(userData._id)
                parent.refralBonus += refralBonus * 0.5
                console.log("parent.refralBonus====================", parent.refralBonus);
            }
            else {
                const bonusIncrease = refralBonus * 0.1;
                console.log("bonusIncrease=======================", bonusIncrease);
                parent.refralBonus += bonusIncrease;
                console.log("parent__________________", parent);
                console.log("parent.refralBonus_________________________", parent.refralBonus)
            }
            await parent.save()
            let data2 = await userData.save();
            return {
                msg: "successfully register",
                result: data2
            };
            
        }
        else  throw "parent user not found"
    }
}





const login = async (body) => {
    try {
        const userData = await User.findOne({ email: body.email });
        console.log("userData================================",userData)
        if (!userData) {
            throw "user not found ";
        }
        const isPasswordMatch = await bcrypt.compare(body.password, userData.password);
        console.log("isPasswordMatch==========================",isPasswordMatch)
        if (!isPasswordMatch) {
            throw "Invalid  password";
        }
        const token = jwt.sign({ id: userData._id.toString() }, secretKey);
        return {
            msg: "Login success",
            user: userData,
            token,
        };
    } catch (error) {
        console.error("Error: ", error.message);
        throw error.message;
    }
};
module.exports = { adduser, getuser, updateUserById, deleteUserById, register,login }