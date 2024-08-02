/* eslint-disable no-unused-vars */
import { useState } from "react";
import { assets } from "../assets/assets";
import axios from "axios";
import { axiosClient } from "../config/axiosClient";
import { toast } from "react-toastify";
import Loader from "../components/Loader";

const AddSong = () => {
  const [image, setImage] = useState(false);
  const [song, setSong] = useState(false);
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [album, setAlbum] = useState("none");
  const [loading, setLoading] = useState(false);
  const [albumData, setAlbumData] = useState([]);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (!image || !song) {
      toast.error("Please upload both an image and a song.");
      return;
    }

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("name", name);
      formData.append("desc", desc);
      formData.append("image", image);
      formData.append("audio", song);
      formData.append("album", album);
      const res = await axiosClient.post("api/song/add", formData);
      console.log(res.data);  

      if (res.status === 200) {
        toast.success("Song added successfully");
      } else {
        toast.error(res.data.error || "Something went wrong");
      }
    } catch (error) {
      toast.error(error.message || "Error adding song");
    } finally {
      setLoading(false);
    }
  };

  return loading ? (
    <Loader />
  ) : (
    <form
      className="flex flex-col items-start gap-8 text-gray-600"
      onSubmit={onSubmitHandler}
    >
      <div className="flex gap-8">
        <div className="flex flex-col gap-4">
          <p>Upload song</p>
          <input
            type="file"
            id="song"
            accept="audio/*"
            hidden
            onChange={(e) => setSong(e.target.files[0])}
          />
          <label htmlFor="song">
            <img
              src={song ? assets.upload_added : assets.upload_song}
              className="w-24 cursor-pointer"
              alt=""
            />
          </label>
        </div>
        <div className="flex flex-col gap-4">
          <p>Upload Image</p>
          <input
            type="file"
            id="image"
            accept="image/*"
            hidden
            onChange={(e) => setImage(e.target.files[0])}
          />
          <label htmlFor="image">
            <img
              src={image ? URL.createObjectURL(image) : assets.upload_area}
              className="w-24 cursor-pointer"
              alt=""
            />
          </label>
        </div>
      </div>
      <div className="flex flex-col gap-2.5">
        <p>Song name</p>
        <input
          type="text"
          value={name}
          id="name"
          className="bg-transparent outline-green-600 border border-gray-400 p-2.5 w-[max(40vw,250px)]"
          placeholder="Type here..."
          required
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="flex flex-col gap-2.5">
        <p>Song description</p>
        <input
          type="text"
          id="name"
          value={desc}
          className="bg-transparent outline-green-600 border border-gray-400 p-2.5 w-[max(40vw,250px)]"
          placeholder="Type here..."
          required
          onChange={(e) => setDesc(e.target.value)}
        />
      </div>
      <div className="flex flex-col gap-2.5">
        <p>Album</p>
        <select
          className="bg-transparent outline-green-600 border border-gray-400 p-2.5 w-[max(40vw,250px)] cursor-pointer"
          defaultValue={album}
          onChange={(e) => setAlbum(e.target.value)}
        >
          <option value="none">None</option>
        </select>
      </div>
      <button
        type="submit"
        className="text-base bg-black text-white py-2.5 px-14 rounded"
      >
        Add
      </button>
    </form>
  );
};

export default AddSong;
