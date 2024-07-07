const mongoose = require("mongoose");
const LessonSchema = new mongoose.Schema({
  order: Number,
  title: String,
  video: String,
  poster: String,
  url: String,
  price: String,
  category: String
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
exports.Lesson = mongoose.model("Lesson", LessonSchema);