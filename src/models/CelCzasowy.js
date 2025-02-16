import mongoose from "mongoose";

const CelCzasowySchema = new mongoose.Schema({
  text: { type: String, required: true },
  done: { type: Boolean, default: false },
  important: { type: Boolean, default: false },
  date_added: { type: Date, default: Date.now },
  date_finish: { type: Date, required: true },
  type: {
    type: String,
    enum: ["ten tydzień", "ten miesiąc", "3 miesiące", "ten rok", "3 lata"],
    required: true,
  },
  order: { type: Number, default: 0 },
});

const CelCzasowy =
  mongoose.models.CelCzasowy || mongoose.model("CelCzasowy", CelCzasowySchema);

export default CelCzasowy;
