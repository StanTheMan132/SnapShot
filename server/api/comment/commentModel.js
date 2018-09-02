/*
  This is the mongoose model for a Post.

  It includes a
    1. commentContent
    2. date
    3. parentCommentId
    4. parentPostId
    5. username

  This model can be used to create a new comment or find a comment by using the
    .findOne()
    .save()
  functions

  The parentPostId is allways required, however the parentCommentId is only required when it is a nested comment.
*/

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
