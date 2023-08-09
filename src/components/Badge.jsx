import React from "react";

function Badge({ text, bgcolor, top, left }) {
  return (
    <div
      className="text-white rounded-xl w-[20px] h-[20px] text-center align-middle absolute"
      style={{ top: "20px", left: "20px", backgroundColor: bgcolor }}
    >
      {text}
    </div>
  );
}

export default Badge;
