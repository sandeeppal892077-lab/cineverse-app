const mongoose = require('mongoose');

const titleSchema = new mongoose.Schema({
  slug: { type: String, required: true, unique: true, index: true },
  name: { type: String, required: true, index: 'text' },
  tagline: String,
  synopsis: { type: String, required: true },
  poster: String,
  backdrop: String,
  trailer: String,
  type: { type: String, required: true, index: true },
  genres: [{ type: String, index: true }],
  year: { type: Number, index: true },
  runtime: Number,
  imdbRating: { type: Number, default: 0 },
  userRating: { type: Number, default: 0 },
  languages: [String],
  country: { type: String, index: true },
  studio: String,
  platform: String,
  ageRating: String,
  releaseDate: String,
  awards: [String],
  cast: [{
    id: String,
    name: String,
    avatar: String,
    character: String,
  }],
  crew: [{
    id: String,
    name: String,
    role: String,
  }],
  seasons: [{
    id: String,
    number: Number,
    title: String,
    episodeCount: Number,
    year: Number,
    episodes: [{
      id: String,
      number: Number,
      title: String,
      synopsis: String,
      runtime: Number,
      airDate: String,
      imdbRating: Number,
      thumbnail: String,
      isFiller: Boolean,
      isCanon: Boolean,
    }],
  }],
  chapters: [{
    id: String,
    number: Number,
    title: String,
    pages: Number,
  }],
  volumes: Number,
  relatedTitles: [String],
  trending: { type: Boolean, default: false },
  newRelease: { type: Boolean, default: false },
  featured: { type: Boolean, default: false },
  editorsPick: { type: Boolean, default: false },
}, { timestamps: true });

titleSchema.index({ name: 'text', synopsis: 'text' });
titleSchema.index({ type: 1, year: -1 });
titleSchema.index({ imdbRating: -1 });

module.exports = mongoose.model('Title', titleSchema);
