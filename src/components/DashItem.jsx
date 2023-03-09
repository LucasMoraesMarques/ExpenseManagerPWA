import React from "react";

function DashItem({title}) {
  return (
    <div className="rounded-xl bg-slate-400 p-3 flex flex-row items-center h-[60px]">
      <div>
        <p>{title}</p>
        <p>Desc</p>
      </div>
    </div>
  );
}

export default DashItem;
