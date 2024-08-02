import express from "express";
import {
  createAlbum,
  deleteAlbum,
  listAlbum,
} from "../controllers/albumController.js";
import upload from "../middleware/multer.js";
const router = express.Router();

router.post("/add", upload.single("image"), createAlbum);
router.get("/list", listAlbum);
router.delete("/delete/:id", deleteAlbum);

export default router;
