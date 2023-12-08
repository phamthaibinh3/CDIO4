import React, { useContext, useEffect, useState } from "react";
import demen from "../img/demenphieuluuky.jpg";
import { Data } from "../Context";

export default function TaiLieuMoiNhat() {
  const {xemnhieu} = useContext(Data)

  return (
    <div className=" mt-10 grid grid-cols-6 gap-4">
      {xemnhieu.map((data, index) => (
        <div className="">
          <img className="h-[200px] w-[150px] mb-3" src={data.hinh} alt="" />
          <span className="font-bold text-center">{data.name}</span>
        </div>
      ))}
    </div>
  );
}

