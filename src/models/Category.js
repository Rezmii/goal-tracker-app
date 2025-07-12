import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  order: { type: Number, required: true },
  important: { type: Boolean, default: false },
});

const Category =
  mongoose.models.Category || mongoose.model("Category", CategorySchema);

export default Category;
