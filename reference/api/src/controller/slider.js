const {
  Request,
  Response
} = require("express");
const {
  ISliderDocument,
  Slider
} = require("../models");
exports.list = async (_req, res) => {
  let sliders = await Slider.find();
  res.json({
    success: true,
    data: sliders
  });
};