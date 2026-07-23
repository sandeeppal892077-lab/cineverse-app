const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  avatar: String,
  watchlist: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Title' }],
  favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Title' }],
  ratings: [{
    title: { type: mongoose.Schema.Types.ObjectId, ref: 'Title' },
    rating: { type: Number, min: 0, max: 10 },
  }],
  history: [{
    title: { type: mongoose.Schema.Types.ObjectId, ref: 'Title' },
    timestamp: { type: Date, default: Date.now },
    progress: { type: Number, default: 0 },
  }],
  isAdmin: { type: Boolean, default: false },
  preferences: {
    theme: { type: String, default: 'dark' },
    language: { type: String, default: 'en' },
  },
}, { timestamps: true });

userSchema.index({ email: 1 });

module.exports = mongoose.model('User', userSchema);
