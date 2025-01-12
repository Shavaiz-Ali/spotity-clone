import { Route, Routes } from "react-router-dom";
import "./App.css";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddSong from "./pages/AddSong";
import AddAlbum from "./pages/AddAlbum";
import ListSong from "./pages/ListSong";
import ListAlbum from "./pages/ListAlbum";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
function App() {
  return (
    <>
      <div className="flex items-start min-h-screen">
        <ToastContainer />
        <Sidebar />
        <div className="flex-1 h-screen overflow-y-scroll bg-[#f3fff7]">
          <Navbar />
          <div className="py-8 pl-5 sm:px-12">
            <Routes>
              <Route path="/add-song" element={<AddSong />} />
              <Route path="/add-album" element={<AddAlbum />} />
              <Route path="/list-song" element={<ListSong />} />
              <Route path="/list-album" element={<ListAlbum />} />
            </Routes>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
