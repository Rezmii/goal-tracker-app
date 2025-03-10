import mongoose from "mongoose";

const CelCzasowyArchiwumSchema = new mongoose.Schema({
  text: { type: String, required: true },
  done: { type: Boolean, default: false },
  important: { type: Boolean, default: false },
  date_added: { type: Date, default: Date.now },
  date_finish: { type: Date },
  type: { type: String, required: true },
  archived_at: { type: Date, default: Date.now },
});

export default mongoose.models.CelCzasowyArchiwum ||
  mongoose.model("CelCzasowyArchiwum", CelCzasowyArchiwumSchema);
