import songModel from "../models/songModel.js";
import { v2 as cloudinary } from "cloudinary";

const addSong = async (req, res) => {
  console.log("reached ", req.body)
  try {
    const { name, desc, album } = req.body;
    const audioFile = req.files.audio ? req.files.audio[0] : null;
    const imageFile = req.files.image ? req.files.image[0] : null;

    if (!name || !desc || !album || !audioFile || !imageFile) {
      return res.status(404).json({
        success: false,
        message: "Some fields are missing",
      });
    }

    // Cloudinary image and audio upload
    const audioUpload = await cloudinary.uploader.upload(audioFile.path, {
      resource_type: "video",
    });
    const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
      resource_type: "image",
    });

    const duration = `${Math.floor(audioUpload.duration / 60)}:${Math.floor(
      audioUpload.duration % 60
    )}`;

    if (!audioUpload || !imageUpload) {
      return res.status(400).json({
        success: false,
        message: "Failed to upload files",
      });
    }

    // saving data to the database

    const songsData = {
      name,
      desc,
      album,
      file: audioUpload.secure_url,
      image: imageUpload.secure_url,
      duration,
    };

    const song = new songModel(songsData);
    await song.save();

    //sending response
    res.status(200).json({
      success: true,
      message: "Song added successfully",
      data: song,
    });
  } catch (error) {
    console.error("Error in addSong:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const listSong = async (req, res) => {
  try {
    const songs = await songModel.find({});
    if (!songs) {
      res.json({ success: false, message: "No songs found", status: 404 });
    }
    res.json({
      success: true,
      message: "Songs fetched successfully",
      data: songs,
    });
  } catch (error) {
    res.json({
      success: false,
      message: "Internal server error",
      error: error,
      status: 500,
    });
  }
};

const deleteSong = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteSong = await songModel.findByIdAndDelete(id);
    if (!deleteSong) {
      res.json({
        success: false,
        message: `No song found to delete`,
        status: 404,
      });
    }

    res.json({
      success: true,
      message: "Song deleted successfully",
      data: deleteSong,
    });
  } catch (error) {
    res.json({
      success: false,
      message: "Internal server error",
      error: error,
      status: 500,
    });
  }
};

export { addSong, listSong, deleteSong };
