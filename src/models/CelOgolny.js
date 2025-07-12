import mongoose from "mongoose";

const SubtaskSchema = new mongoose.Schema({
  text: { type: String, required: true },
  done: { type: Boolean, default: false },
});

const CelOgolnySchema = new mongoose.Schema({
  text: { type: String, required: true },
  done: { type: Boolean, default: false },
  important: { type: Boolean, default: false },
  category: { type: String, required: true, trim: true },
  subtasks: [SubtaskSchema],
  date_added: { type: Date, default: Date.now },
  order: { type: Number, default: 0 },
});

const CelOgolny =
  mongoose.models.CelOgolny || mongoose.model("CelOgolny", CelOgolnySchema);

export default CelOgolny;
