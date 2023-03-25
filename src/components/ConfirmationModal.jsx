import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

const ConfirmationModal = ({
  title = "Confirmação de ação",
  message = "Você confirma a ação?",
  onCancel = () => {},
  onConfirm = () => {},
}) => {
  return (
    <div>
      <Typography
        id="modal-modal-title"
        variant="h6"
        component="h2"
        sx={{ fontWeight: "bold" }}
      >
        {title}
      </Typography>
      <span>{message}</span>
      <Box className="flex flex-row justify-between mt-[10px]">
        <Button variant="outlined" onClick={onCancel}>
          Cancelar
        </Button>
        <Button variant="contained" onClick={onConfirm}>
          Confirmar
        </Button>
      </Box>
    </div>
  );
};

export default ConfirmationModal;
