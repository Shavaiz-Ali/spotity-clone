import { useState } from "react";
import { assets } from "../assets/assets";
import LoaderCmp from "../components/Loader";
import { toast } from "react-toastify";
import { axiosClient } from "../config/axiosClient";

const AddAlbum = () => {
  const [image, setImage] = useState(false);
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [bgColor, setBGColor] = useState("#ffffff");
  const [loading, setLoading] = useState(false);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("name", name);
      formData.append("desc", desc);
      formData.append("bgColor", bgColor);
      if (image) formData.append("image", image);

      const res = await axiosClient.post("api/album/add", formData);
      if (res.status === 200) {
        toast.success("Album created successfully!");
        setName("");
        setDesc("");
        setBGColor("#ffffff");
        setImage(false);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      toast.error(error.message || "Something went wrong!");
    }
  };

  return loading ? (
    <LoaderCmp />
  ) : (
    <form
      className="flex flex-col items-start gap-8 text-gray-600"
      onSubmit={onSubmitHandler}
    >
      <div className="flex flex-col gap-4">
        <p>Upload song</p>
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
      <div className="flex flex-col gap-2.5">
        <p>Album Name</p>
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
        <p>Description</p>
        <input
          type="text"
          value={desc}
          id="desc"
          className="bg-transparent outline-green-600 border border-gray-400 p-2.5 w-[max(40vw,250px)]"
          placeholder="Type here..."
          required
          onChange={(e) => setDesc(e.target.value)}
        />
      </div>
      <div className="flex flex-col gap-3">
        <p>Background Color</p>
        <input
          type="color"
          value={bgColor}
          className="bg-transparent outline-green-600 border border-gray-400 p-2.5 w-[max(40vw,250px)]"
          placeholder="Type here..."
          required
          onChange={(e) => setBGColor(e.target.value)}
        />
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

export default AddAlbum;
