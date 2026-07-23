const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  userName: { type: String, required: true },
  titleId: { type: mongoose.Schema.Types.ObjectId, ref: 'Title', required: true },
  content: { type: String, required: true, maxlength: 1000 },
  rating: { type: Number, min: 0, max: 10 },
  likes: { type: Number, default: 0 },
  status: { type: String, enum: ['pending', 'approved', 'flagged', 'removed'], default: 'pending' },
}, { timestamps: true });

commentSchema.index({ titleId: 1, createdAt: -1 });
commentSchema.index({ userId: 1 });

module.exports = mongoose.model('Comment', commentSchema);
