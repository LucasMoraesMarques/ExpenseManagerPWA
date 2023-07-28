import React, {useState, useEffect} from "react";
import AlertTitle from "@mui/material/AlertTitle";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from '@mui/material/Alert';
import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';


const Alert = React.forwardRef(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function AlertToast({ severity, title, message, open, onClose }) {
  const [progress, setProgress] = React.useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        console.log(oldProgress)
        if (oldProgress >= 100) {
          clearInterval(timer);
        }
  
        return Math.min(oldProgress + 100/30, 100);
      });
    }, 100);

    return () => {
      clearInterval(timer);
      setProgress(0)
    };
  }, [open]);

  const onCloseSnackBar = () =>{
    clearInterval();
    onClose()
  }
  return (
    <Snackbar open={open} onClose={onCloseSnackBar}>
      <Box>
      <Alert severity={severity}>
        {message}
      </Alert>
      <LinearProgress variant="determinate" value={progress}  className="rotate-180"/>
      </Box>
      
    </Snackbar>
  );
}

export default AlertToast;
