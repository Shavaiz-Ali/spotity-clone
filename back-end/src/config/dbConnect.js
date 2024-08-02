import mongoose from "mongoose";

export const dbConnect = async () => {
  mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
      console.log("db connected successfully");
    })
    .catch((err) => console.error(err));
};
