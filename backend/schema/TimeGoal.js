const mongoose = require("mongoose");

// Schema dla TimeGoal
const timeGoalSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    default: Date.now,
  },
  endDate: {
    type: Date,
    required: true,
  },
  done: {
    type: Boolean,
    default: false,
  },
  priority: {
    type: Boolean,
    default: false,
  },
  timePeriod: {
    type: String,
    enum: ["ten tydzień", "ten miesiąc", "3 miesiące", "rok", "3 lata"],
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

// Model dla TimeGoal
const TimeGoal = mongoose.model("TimeGoal", timeGoalSchema);

module.exports = TimeGoal;
