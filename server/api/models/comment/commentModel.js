const mongoose = require('mongoose');

const { Schema } = mongoose;

const CommentSchema = new Schema({
  commentContent: { type: String, required: true },
  date: { type: Date, required: true },
  parentCommentId: { type: String, required: false },
  parentPostId: { type: String, required: true },
  username: { type: String, required: true },
});

module.exports = mongoose.model('Comment', CommentSchema);
