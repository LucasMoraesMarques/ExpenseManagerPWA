import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import { ListItem } from "@mui/material";
import { inherit } from "hammerjs";

function GalleryImage({
  photo,
  edit = true,
  onDelete = () => {},
  onClick = () => {
    console.log("clicked");
  },
}) {
  return (
    <ListItem
      key={photo.id}
      disableGutters
      sx={{ position: "relative", minWidth: "140px" }}
    >
      <div style={{ width: "160px", position: "relative" }}>
        {edit ? (
          <IconButton
            sx={{
              position: "absolute",
              top: "-5px",
              right: "-5px",
              padding: "3px",
            }}
            onClick={() => onDelete(photo.id)}
          >
            <CloseIcon color="error" />
          </IconButton>
        ) : (
          ""
        )}

        <img
          src={photo.src}
          style={{ maxHeight: "90%", width: "100%" }}
          onClick={() => onClick(photo)}
        />
      </div>
    </ListItem>
  );
}

export default GalleryImage;
