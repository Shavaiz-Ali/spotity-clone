import mongoose from "mongoose";

const songSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  album: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  file: {
    type: String,
    required: false,
  },
  duration: {
    type: String,
    required: true,
  },
});
const songModel = mongoose.model.song || mongoose.model("song", songSchema)
export default songModel
