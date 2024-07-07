const validator = require("validator");
exports.validateRegisterInput = (username, password, confirmPassword, email) => {
  let errors = {};
  if (username == undefined || validator.isEmpty(username)) {
    errors.username = "用户名不能为空";
  }
  if (password == undefined || validator.isEmpty(password)) {
    errors.password = "密码不能为空";
  }
  if (confirmPassword == undefined || validator.isEmpty(confirmPassword)) {
    errors.password = "确认密码不能为空";
  }
  if (!validator.equals(password, confirmPassword)) {
    errors.confirmPassword = "确认密码和密码不相等";
  }
  if (email == undefined || validator.isEmpty(password)) {
    errors.email = "邮箱不能为空";
  }
  if (!validator.isEmail(email)) {
    errors.email = "邮箱格式必须合法";
  }
  return {
    errors,
    valid: Object.keys(errors).length == 0
  };
};