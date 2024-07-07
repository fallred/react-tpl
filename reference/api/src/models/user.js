const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, '用户名不能为空'],
    minlength: [6, '最小长度不能少于6位'],
    maxlength: [12, '最大长度不能大于12位']
  },
  password: String,
  avatar: String,
  email: {
    type: String,
    validate: {
      validator: validator.isEmail
    },
    trim: true
  }
}, {
  timestamps: true,
  toJSON: {
    transform(_doc, ret) {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
      delete ret.password;
      return ret;
    }
  }
});
UserSchema.methods.generateToken = function () {
  let payload = {
    id: this._id
  };
  return jwt.sign(payload, process.env.JWT_SECRET_KEY, {
    expiresIn: '1h'
  });
};
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  try {
    this.password = await bcrypt.hash(this.password, 10);
    next();
  } catch (error) {
    next(error);
  }
});
UserSchema.static('login', async function (username, password) {
  let user = await this.model('User').findOne({
    username
  });
  if (user) {
    const matched = await bcrypt.compare(password, user.password);
    if (matched) {
      return user;
    } else {
      return null;
    }
  }
  return user;
});
exports.User = mongoose.model('User', UserSchema);