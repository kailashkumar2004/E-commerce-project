
exports.errorHandler = (error, status = 400) => {
  let errorMsg, msg, err;

  if (typeof error !== "object") {
    msg = error;
  } else {
    err = error.message;
    if (err.includes("email_1 dup")) {
      msg = "Duplicate email error message"; // Replace with your custom error message
    } else if (err.includes("phone_1 dup")) {
      msg = "Duplicate phone error message"; // Replace with your custom error message
    } else if (err.includes("valid email")) {
      msg = "Invalid email error message"; // Replace with your custom error message
    } else if (err.includes("`password` is required")) {
      msg = "Password required error message"; // Replace with your custom error message
    } else if (err.includes("not a valid email")) {
      msg = "Invalid email format error message"; // Replace with your custom error message
    } else if (err.includes("undefined") || err.includes("null")) {
      msg = "Undefined or null error message"; // Replace with your custom error message
    } else if (error.code === 11000) {
      msg = "Duplicate key error message"; // Replace with your custom error message
    }
  }

  errorMsg = {
    error: err || msg || "Server error", // Replace with your default error message
    body: msg || "Server error", // Replace with your default error message
    status: status
  };
  return errorMsg;
};
