const {
  Request,
  Response
} = require("express");
const {
  ILessonDocument,
  Lesson
} = require("../models");
const {
  FilterQuery
} = require('mongoose');
exports.list = async (req, res) => {
  let {
    category
  } = req.query;
  let offset = req.query.offset;
  let limit = req.query.limit;
  offset = isNaN(offset) ? 0 : parseInt(offset);
  limit = isNaN(limit) ? 5 : parseInt(limit);
  let query = {};
  if (category && category != "all") query.category = category;
  let total = await Lesson.count(query);
  let list = await Lesson.find(query).sort({
    order: 1
  }).skip(offset).limit(limit);
  list = list.map(item => item.toJSON());
  setTimeout(function () {
    res.json({
      code: 0,
      data: {
        list,
        hasMore: total > offset + limit
      }
    });
  }, 1000);
};
exports.get = async (req, res) => {
  let id = req.params.id;
  let lesson = await Lesson.findById(id);
  res.json({
    success: true,
    data: lesson
  });
};