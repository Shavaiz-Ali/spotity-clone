import { Link } from "react-router-dom";
import { assets } from "../assets/assets";
const Sidebar = () => {
  return (
    <div className="bg-[#003a10] min-h-screen pl-[4vw]">
      <img
        className="mt-5 w-[max(10vw,100px)] hidden sm:block"
        src={assets.logo}
        alt=""
      />
      <img
        className="mt-5 w-[max(5vw,40px)] mr-5 sm:hidden block"
        src={assets.logo_small}
        alt=""
      />

      <div className="flex flex-col gap-5 mt-10">
        <Link to={"/add-song"} className="flex items-center gap-2.5 text-gray-800 bg-white border border-black p-2 pr-[max(8vw,10px)] drop-shadow-[-4px_4px_#00ff5b] text-sm font-medium">
          <img className="w-5" src={assets.add_song} alt="" />
          <p className="hidden sm:block">Add Song</p>
        </Link>
        <Link to={"/list-song"} className="flex items-center gap-2.5 text-gray-800 bg-white border border-black p-2 pr-[max(8vw,10px)] drop-shadow-[-4px_4px_#00ff5b] text-sm font-medium">
          <img className="w-5" src={assets.song_icon} alt="" />
          <p className="hidden sm:block">List Song</p>
        </Link>
        <Link to={"add-album"} className="flex items-center gap-2.5 text-gray-800 bg-white border border-black p-2 pr-[max(8vw,10px)] drop-shadow-[-4px_4px_#00ff5b] text-sm font-medium">
          <img className="w-5" src={assets.add_album} alt="" />
          <p className="hidden sm:block">Add Album</p>
        </Link>
        <Link to={"list-album"} className="flex items-center gap-2.5 text-gray-800 bg-white border border-black p-2 pr-[max(8vw,10px)] drop-shadow-[-4px_4px_#00ff5b] text-sm font-medium">
          <img className="w-5" src={assets.album_icon} alt="" />
          <p className="hidden sm:block">List Album</p>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;