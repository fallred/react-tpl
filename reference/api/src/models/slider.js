const mongoose = require("mongoose");
const SliderSchema = new mongoose.Schema({
  url: String
}, {
  timestamps: true
});
exports.Slider = mongoose.model("Slider", SliderSchema);