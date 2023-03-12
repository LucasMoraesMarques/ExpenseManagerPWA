import React from "react";
import Paper from '@mui/material/Paper';

function DashItem({title}) {
  return (
    <Paper className="rounded-xl p-3 flex flex-row items-center h-[60px]" variant="outlined">
      <div>
        <p>{title}</p>
        <p>Desc</p>
      </div>
    </Paper>
  );
}

export default DashItem;
