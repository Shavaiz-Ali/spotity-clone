/* eslint-disable react/prop-types */

import {useNavigate } from "react-router-dom"

const AlbumItem = ({image,desc,name,id}) => {
    const naviagate = useNavigate()
  return (
    <div onClick={() => naviagate(`/album/${id}`)} className="min-w-[180px] p-2 px-3 rounded cursor-pointer hover:bg-[#ffffff26]" key={id}>
      <img className="rounded" src={image} alt="" />
      <p className="font-bold mt-2 mb-1">{name}</p>
      <p className="text-slate-200 text-sm mt-2 mb-1">{desc}</p>
    </div>
  )
}

export default AlbumItem
