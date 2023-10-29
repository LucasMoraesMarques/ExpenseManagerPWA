import React, { useEffect, useState } from "react";
import Stack from "@mui/material/Stack";
import GalleryImage from "./GalleryImage";
import { IconButton, List } from "@mui/material";
import CustomModal from "./CustomModal";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
function Gallery({ gallery, onDelete = () => {}, edit = false }) {
  const [openModal, setOpenModal] = useState(false);
  const [currentPhoto, setCurrentPhoto] = useState(null);
  const [sliderIndex, setSlidexIndex] = useState(0);

  const handlePhotoDetail = (photo) => {
    setOpenModal(true);
    setCurrentPhoto(photo);
    let photoIndex = gallery.findIndex((item) => item.id == photo.id);
    setSlidexIndex(photoIndex);
  };

  useEffect(() => {
    setCurrentPhoto(gallery[sliderIndex]);
  }, [sliderIndex]);
  console.log(gallery);

  return gallery ? (
    <>
      <List
        spacing={2}
        className="overflow-y-scroll h-[150px]"
        direction="row"
        component={Stack}
      >
        {gallery &&
          gallery.map((photo) => (
            <GalleryImage
              photo={photo}
              onDelete={onDelete}
              onClick={handlePhotoDetail}
              edit={edit}
            />
          ))}
      </List>
      <CustomModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        children={
          <div
            className="flex justify-center items-center mx-auto"
            style={{ width: "90%" }}
          >
            <IconButton
              onClick={() => setSlidexIndex(sliderIndex - 1)}
              disabled={sliderIndex == 0}
            >
              <ArrowBackIosIcon />
            </IconButton>
            <GalleryImage
              photo={currentPhoto}
              onDelete={onDelete}
              onClick={handlePhotoDetail}
              edit={false}
            />
            <IconButton
              onClick={() => setSlidexIndex(sliderIndex + 1)}
              disabled={sliderIndex == gallery.length - 1}
            >
              <ArrowForwardIosIcon />
            </IconButton>
          </div>
        }
      />
    </>
  ) : (
    ""
  );
}

export default Gallery;
