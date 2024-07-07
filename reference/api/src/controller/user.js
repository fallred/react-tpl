const {
  validateRegisterInput
} = require('../utils/validator');
const HttpException = require('../exceptions/HttpException');
const StatusCodes = require('http-status-codes');
const {User} = require('../models/user');
const jwt = require('jsonwebtoken');
exports.validate = async (req, res, next) => {
  const authorization = req.headers['authorization'];
  if (authorization) {
    const token = authorization.split(' ')[1];
    if (token) {
      try {
        const payload = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const user = await User.findById(payload.id);
        if (user) {
          res.json({
            success: true,
            data: user.toJSON()
          });
        } else {
          next(new HttpException(StatusCodes.UNAUTHORIZED, `用户不合法!`));
        }
      } catch (error) {
        next(new HttpException(StatusCodes.UNAUTHORIZED, `token不合法!`));
      }
    } else {
      next(new HttpException(StatusCodes.UNAUTHORIZED, `token未提供!`));
    }
  } else {
    next(new HttpException(StatusCodes.UNAUTHORIZED, `authorization未提供!`));
  }
};
exports.register = async (req, res, next) => {
  try {
    let {
      username,
      password,
      confirmPassword,
      email,
      addresses
    } = req.body;
    console.log(username, password, confirmPassword, email);
    const {
      valid,
      errors
    } = validateRegisterInput(username, password, confirmPassword, email);
    if (!valid) {
       throw new HttpException(StatusCodes.UNPROCESSABLE_ENTITY, `参数验证失败!`, errors);
    }
    let user = new User({
      username,
      email,
      password,
      addresses
    });
    let oldUser = await User.findOne({
      username: user.username
    });
    console.log('oldUser',oldUser)
    if (oldUser && oldUser !==null && oldUser.username) {
      throw new HttpException(StatusCodes.UNPROCESSABLE_ENTITY, `用户名重复!`);
    }
    await user.save();
    let token = user.generateToken();
    res.json({
      success: true,
      data: {
        token
      }
    });
  } catch (error) {
    next(error);
  }
};
exports.login = async (req, res, next) => {
  try {
    let {
      username,
      password
    } = req.body;
    let user = await User.login(username, password);
    if (user) {
      let token = user.generateToken();
      res.json({
        success: true,
        data: {
          token
        }
      });
    } else {
      throw new HttpException(StatusCodes.UNAUTHORIZED, `登录失败`);
    }
  } catch (error) {
    next(error);
  }
};
exports.uploadAvatar = async (req, res, _next) => {
  let {
    userId
  } = req.body;
  let domain = process.env.DOMAIN || `${req.protocol}://${req.headers.host}`;
  let avatar = `${domain}/uploads/${req.file.filename}`;
  await User.updateOne({
    _id: userId
  }, {
    avatar
  });
  res.send({
    success: true,
    data: avatar
  });
};