const { adduser,getuser,updateUserById,deleteUserById,register,login } = require("../user.business/user.business");
exports.adduser = async (req) => await adduser(req.body);
exports.getuser = async (req) => await getuser();
exports.updateUserById = async (req) => await updateUserById(req.params.id, req.body);
exports.deleteUserById= async (req) => await deleteUserById(req.params.id);
exports.register = async (req) => await register(req.body);
exports.login = async (req) => await login(req.body);

