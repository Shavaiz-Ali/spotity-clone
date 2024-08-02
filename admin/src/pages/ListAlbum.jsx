import { useEffect, useState } from "react";
import LoaderCmp from "../components/Loader";
import { toast } from "react-toastify";
import { axiosClient } from "../config/axiosClient";

const ListAlbum = () => {
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(false);

  //fetching data from album
  const fetchAlbums = async () => {
    try {
      setLoader(true);
      const res = await axiosClient.get("api/album/list");
      console.log(res);
      if (res.status === 200) {
        setData(res.data.data);
        setLoader(false);
      }
    } catch (error) {
      setLoader(false);
      console.log(error);
      toast(error.message || "Something went wrong");
    }
  };

  useEffect(() => {
    fetchAlbums();
  }, []);

  //deleteting single album
  const removeSong = async (id) => {
    try {
      const res = await axiosClient.delete(`api/album/delete/${id}`);
      console.log(res);
      if (res.status === 200) {
        toast("Song deleted successfully");
        fetchAlbums();
      }
    } catch (error) {
      console.log(error);
      toast(error.message || "Something went wrong");
    }
  };

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
          <b>Description</b>
          <b>bgColor</b>
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
          <p>{item.desc}</p>
          <p
            className={`${
              item.bgColor === "#ffffff" ? "text-black" : "text-white"
             } w-[100px] px-3 py-1 rounded`}
            style={{ backgroundColor: `${item.bgColor}` }}
          >
            {item.bgColor}
          </p>
          <p
            className="text-red-600 cursor-pointer"
            onClick={() => removeSong(item._id)}
          >
            {" "}
            Delete
          </p>
        </div>
      ))}
    </div>
  ) : (
    <div>No songs added yet!</div>
  );
};

export default ListAlbum;
