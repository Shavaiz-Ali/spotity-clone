import { v2 as cloudinary } from "cloudinary";
import albumModel from "../models/albumModel.js";

//create album
const createAlbum = async (req, res) => {
  try {
    const { name, desc, bgColor } = req.body;
    const imageFile = req.file;

    // validation
    if ((!name, !desc, !bgColor, !imageFile)) {
      return res.json({
        success: false,
        message: "Missing required fields",
        status: 400,
      });
    }

    //cloudinary image upload
    const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
      resource_type: "image",
    });

    if (!imageUpload) {
      return res.json({
        success: false,
        message: "Failed to upload image",
        status: 400,
      });
    }

    // saving data to the database

    const albumData = {
      name,
      desc,
      bgColor,
      image: imageUpload.secure_url,
    };

    console.log(albumData);

    const album = new albumModel(albumData);
    await album.save();

    res.json({
      success: true,
      message: "Album created successfully",
      data: album,
    });
  } catch (error) {
    return res.json({
      success: false,
      message: "Internal server error",
      status: 500,
    });
  }
};

//list album
const listAlbum = async (req, res) => {
  try {
    const albums = await albumModel.find();
    if (!albums) {
      return res.json({
        success: false,
        message: "No albums found",
        status: 404,
      });
    }

    // fecting albums
    return res.json({
      success: true,
      message: "Albums listed successfully",
      data: albums,
    });
  } catch (error) {
    return res.json({
      success: false,
      message: "Internal server error",
      status: 500,
    });
  }
};

//delete album
const deleteAlbum = async (req, res) => {
  console.log("reached to the deleteAlbum method")
  try {
    const { id } = req.params;
    const album = await albumModel.findByIdAndDelete(id);

    if (!album) {
      return res.status(404).json({
        success: false,
        message: "Album not found",
      });
    }

    res.json({
      success: true,
      message: "Album deleted successfully",
      data: album,
    });
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export { createAlbum, listAlbum, deleteAlbum };
