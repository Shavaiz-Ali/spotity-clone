import express from "express";
import "dotenv/config";
import cors from "cors";
const app = express();
import { dbConnect } from "./src/config/dbConnect.js";
import songsRouter from "./src/routes/songRoute.js";
import albumRouter from "./src/routes/albumRoute.js";
import connectCloudinary from "./src/config/cloudinary.js";
const PORT = process.env.PORT || 8080;

// configuration functions
dbConnect();
connectCloudinary();

// middlwares
app.use(express.json());
app.use(cors());

// intializing routes
app.use("/api/song", songsRouter);
app.use("/api/album", albumRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port: http://localhost:${PORT}`);
});
