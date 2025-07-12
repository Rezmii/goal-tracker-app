import mongoose from "mongoose";

const LevelSchema = new mongoose.Schema({
  level: { type: Number, enum: [1, 2, 3], required: true },
  text: { type: String, required: true },
  done: { type: Boolean, default: false },
});

const CelTrzyPoziomyArchiwumSchema = new mongoose.Schema({
  text: { type: String, required: true },
  done: { type: Boolean, default: false },
  important: { type: Boolean, default: false },
  levels: [LevelSchema],
  date_added: { type: Date, required: true },
  date_finish: { type: Date },

  archived_at: { type: Date, default: Date.now },
});

const CelTrzyPoziomyArchiwum =
  mongoose.models.CelTrzyPoziomyArchiwum ||
  mongoose.model("CelTrzyPoziomyArchiwum", CelTrzyPoziomyArchiwumSchema);

export default CelTrzyPoziomyArchiwum;
