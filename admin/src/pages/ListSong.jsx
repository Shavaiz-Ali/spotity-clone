import { useEffect, useState } from "react";
import { axiosClient } from "../config/axiosClient";
import { toast } from "react-toastify";
import LoaderCmp from "../components/Loader";
const ListSong = () => {
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(false);


  // fetching songs from database
  const fetchSongs = async () => {
    try {
      setLoader(true);
      const res = await axiosClient.get("api/song/list");
      if (res.status === 200) {
        setData(res.data.data);
      } else {
        toast.error(res.data.message || "Error fecthing data");
      }
      setLoader(false);
    } catch (error) {
      setLoader(false);
      console.log(error);
      toast.error("Something went wrong! Check your internet connection");
    }
  };

  useEffect(() => {
    fetchSongs();
  }, []);

  // deleting single song from database 
  const removeSong = async (id) => {
    const hello = confirm("Are you sure you want to delete this song");
    if (!hello) return;
    try {
      const res = await axiosClient.delete(`api/song/delete/${id}`);
      if (res.status === 200) {
        toast.success(res.data.message || "Song deleted successfully!");
        fetchSongs();
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong! Check your internet connection");
    }
  };

  console.log(data);
  return loader ? (
    <LoaderCmp />
  ) : data && data?.length > 0 ? (
    <div>
      <p>All song list</p>
      <br />
      <div className="">
        <div className="sm:grid hidden grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-center gap-2.5 p-3 border border-gray-300 text-sm mr-5 bg-gray-100">
          <b>Image</b>
          <b>Name</b>
          <b>Album</b>
          <b>Duration</b>
          <b>Action</b>
        </div>
      </div>
      {data?.map((item) => (
        <div
          className="grid grid-cols-[1fr_1fr_1fr] sm:grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-center gap-2.5 p-3 border border-gray-300 text-sm mr-5 bg-gray-100"
          key={item._id}
        >
          <img className="w-12" src={item.image} alt="" />
          <p>{item.name}</p>
          <p>{item.album}</p>
          <p>{item.duration}</p>
          <p className="text-red-600 cursor-pointer" onClick={() => removeSong(item._id)}> Delete</p>
        </div>
      ))}
    </div>
  ) : (
    <div>No songs added yet!</div>
  );
};

export default ListSong;
