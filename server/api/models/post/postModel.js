const mongoose = require('mongoose');

const { Schema } = mongoose;

const postSchema = new Schema({
  username: { type: String, required: true },
  imgUrl: { type: String, required: true },
  date: { type: Date, required: true },
});

module.exports = mongoose.model('Post', postSchema);
