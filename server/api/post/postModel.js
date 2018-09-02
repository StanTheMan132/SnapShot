/*
  This is the mongoose model for a Post.

  It includes a
    1. username
    2. imgUrl
    3. date
    4. caption

  This model can be used to create a new Post or find a Post by using the
    .findOne()
    .save()
  functions
*/

const mongoose = require('mongoose');

const { Schema } = mongoose;

const postSchema = new Schema({
  username: { type: String, required: true },
  imgUrl: { type: String, required: true },
  date: { type: Date, required: true },
  caption: { type: String, required: false },
});

module.exports = mongoose.model('Post', postSchema);
