import mongoose from "mongoose";

const SubtaskSchema = new mongoose.Schema({
  text: { type: String, required: true },
  done: { type: Boolean, default: false },
});

const CelOgolnyArchiwumSchema = new mongoose.Schema({
  text: { type: String, required: true },
  done: { type: Boolean, default: false },
  important: { type: Boolean, default: false },
  category: { type: String, required: true },
  subtasks: [SubtaskSchema],
  date_added: { type: Date, required: true },
  archived_at: { type: Date, default: Date.now },
});

const CelOgolnyArchiwum =
  mongoose.models.CelOgolnyArchiwum ||
  mongoose.model("CelOgolnyArchiwum", CelOgolnyArchiwumSchema);

export default CelOgolnyArchiwum;
