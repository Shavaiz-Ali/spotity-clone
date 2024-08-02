/* eslint-disable react/prop-types */

import { useContext } from "react"
import { playerContext } from "../context/PlayerContext"

const SongItem = ({image,desc,name,id}) => {
  const { playWithId} = useContext(playerContext)
    return (
      <div className="min-w-[180px] p-2 px-3 rounded cursor-pointer hover:bg-[#ffffff26]" key={id} onClick={() => playWithId(id)}>
        <img className="rounded" src={image} alt="" />
        <p className="font-bold mt-2 mb-1">{name}</p>
        <p className="text-slate-200 text-sm mt-2 mb-1">{desc}</p>
      </div>
    )
  }
  
  export default SongItem
  