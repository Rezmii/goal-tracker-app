// src/models/CelTrzyPoziomy.js

import mongoose from "mongoose";

const LevelSchema = new mongoose.Schema({
  level: {
    type: Number,
    enum: [1, 2, 3], // Ograniczamy do 3 poziomów
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  done: {
    type: Boolean,
    default: false,
  },
});

const CelTrzyPoziomySchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  done: { type: Boolean, default: false },
  important: { type: Boolean, default: false },
  levels: [LevelSchema],
  date_added: {
    type: Date,
    default: Date.now,
  },
  date_finish: { type: Date, required: true },
  order: {
    type: Number,
    default: 0,
  },
});

const CelTrzyPoziomy =
  mongoose.models.CelTrzyPoziomy ||
  mongoose.model("CelTrzyPoziomy", CelTrzyPoziomySchema);

export default CelTrzyPoziomy;
