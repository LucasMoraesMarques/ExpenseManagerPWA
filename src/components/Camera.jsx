import React, { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import FlipCameraAndroidIcon from "@mui/icons-material/FlipCameraAndroid";

function Camera({ opened, onClose = {}, onCapture = {} }) {
  const canvas = document.getElementById("canvas");
  const photo = document.getElementById("photo");
  const [picture, setPicture] = useState(null);
  const [video, setVideo] = useState({});
  const [facingMode, setFacingMode] = useState("environment");

  function openCamera() {
    const constraints = {
      video: { width: 1280, height: 720, facingMode: facingMode },
    };
    const videoTag = document.querySelector("video");

    navigator.mediaDevices
      .getUserMedia(constraints)
      .then((mediaStream) => {
        console.log(mediaStream);
        videoTag.srcObject = mediaStream;
        videoTag.onloadedmetadata = () => {
          videoTag.play();
          setVideo(videoTag);
        };
      })
      .catch((err) => {
        // always check for errors at the end.
        console.error(`${err.name}: ${err.message}`);
      });
  }

  useEffect(() => {
    if (picture && photo) {
      photo.setAttribute("src", picture);
    }
  }, [picture]);

  useEffect(() => {
    openCamera();
  }, [facingMode]);

  function takePicture() {
    const context = canvas.getContext("2d");
    const videoTag = document.querySelector("video");

    canvas.width = videoTag.offsetWidth;
    canvas.height = videoTag.offsetHeight;
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    const data = canvas.toDataURL("image/png");
    setPicture(data);
  }

  function clearPicture() {
    const context = canvas.getContext("2d");
    context.fillRect(0, 0, 0, 0);

    const data = canvas.toDataURL("image/png");
    photo.setAttribute("src", data);
    setPicture(null);
  }

  function savePicture() {
    if (photo) {
      onCapture(photo.src);
      clearPicture();
    }
  }

  function changeFacingMode() {
    setFacingMode(facingMode == "user" ? "environment" : "user");
  }
  return (
    <div
      className="absolute top-0 left-0 w-100"
      style={{ zIndex: 1200, display: opened ? "block" : "none" }}
    >
      <div id="camera-mode" style={{ display: picture ? "none" : "block" }}>
        <IconButton
          color="black"
          aria-label="upload picture"
          component="label"
          sx={{
            position: "absolute",
            top: "0px",
            right: "0px",
            zIndex: 1200,
          }}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
        <video></video>
        <div
          className="flex justify-center"
          style={{
            position: "absolute",
            bottom: "0px",
            width: window.innerWidth,
          }}
        >
          <IconButton
            color="primary"
            aria-label="upload picture"
            component="label"
            onClick={changeFacingMode}
          >
            <FlipCameraAndroidIcon fontSize="large" />
          </IconButton>
          <IconButton
            color="primary"
            aria-label="upload picture"
            component="label"
            onClick={takePicture}
          >
            <CameraAltIcon fontSize="large" />
          </IconButton>
        </div>
        <canvas id="canvas" style={{ display: "none" }}></canvas>
      </div>
      <div id="picture-mode" style={{ display: picture ? "block" : "none" }}>
        <IconButton
          color="black"
          aria-label="upload picture"
          component="label"
          sx={{
            position: "absolute",
            top: "0px",
            right: "0px",
            zIndex: 1200,
          }}
          onClick={clearPicture}
        >
          <CloseIcon />
        </IconButton>
        <img src="" alt="" id="photo" />
        <div
          className="flex justify-center"
          style={{
            position: "absolute",
            bottom: "10px",
            width: window.innerWidth,
          }}
        >
          <Button
            color="primary"
            aria-label="upload picture"
            component="label"
            variant="contained"
            onClick={savePicture}
          >
            Salvar
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Camera;
