/* eslint-disable react/jsx-key */
import { albumsData, songsData } from "../assets/assets";
import AlbumItem from "./AlbumItem";
import Navbar from "./Navbar";
import SongItem from "./SongItem";

const Home = () => {
  return (
    <>
      <Navbar />
      <div className="mb-4">
        <h4 className="my-5 font-bold text-2xl">Features charts</h4>
        <div className="flex overflow-auto">
          {albumsData.map((album, index) => (
            <AlbumItem
              key={index}
              image={album.image}
              name={album.name}
              desc={album.desc}
              id={album.id}
            />
          ))}
        </div>
      </div>
      <div className="mb-4">
        <h4 className="my-5 font-bold text-2xl">Today&lsquo;s biggest hitts</h4>
        <div className="flex overflow-auto">
          {songsData.map((album, index) => (
            <SongItem
              key={index}
              image={album.image}
              name={album.name}
              desc={album.desc}
              id={album.id}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
