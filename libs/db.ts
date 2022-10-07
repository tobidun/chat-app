import mongoose from "mongoose";

export function useDataBase() {
  return mongoose.connect(
    process.env.DATABASE_ENDPOINT || "mongodb://localhost:27017/nigeria-pol"
  );
}
