import mongoose from "mongoose";

const MONGODB_URI_ENV = MONGODB_URI || "";

export async function connectToDatabase() {
  if (mongoose.connection.readyState >= 1) {
    return;
  }

  try {
    await mongoose.connect(MONGODB_URI_ENV, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("✅ Połączono z MongoDB");
  } catch (error) {
    console.error("❌ Błąd połączenia z MongoDB:", error);
    process.exit(1);
  }
}
