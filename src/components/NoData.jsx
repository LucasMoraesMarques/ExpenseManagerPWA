import React from "react";
import { ReactComponent as NoDataSVG } from "../assets/img/no_data.svg";

function NoData({ message }) {
  return (
    <div className="flex flex-col justify-center items-center mt-5">
      <NoDataSVG className="w-[50%] h-[30%]" />
      <span className="font-bold">{message}</span>
    </div>
  );
}

export default NoData;
