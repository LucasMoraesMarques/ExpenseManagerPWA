import React from "react";
import Paper from '@mui/material/Paper';

function DashItem({title, value}) {
  return (
    <Paper className="rounded-xl p-0 flex flex-row items-center h-[60px] " variant="outlined">
      <div className="w-full bg-slate-200">
        <p className="text-center font-bold">{title}</p>
        <p className="text-center">{value}</p>
      </div>
    </Paper>
  );
}

export default DashItem;
