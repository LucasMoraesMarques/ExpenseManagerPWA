import React, { useEffect } from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import DisabledByDefaultIcon from "@mui/icons-material/DisabledByDefault";
import IconButton from "@mui/material/IconButton";
import { useState } from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import CustomModal from "../components/CustomModal";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { Link, useNavigate, Location } from "react-router-dom";
import NoteAltOutlinedIcon from "@mui/icons-material/NoteAltOutlined";

function ValidationItem({ key, validation, onClick = () => {} }) {
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();
  const [inputStates, setInputStates] = useState({
    validated_at: "",
    is_active: "",
    note: "",
  });

  const handleChangeNote = (e) => {
    console.log(inputStates);
    setInputStates({ ...inputStates, note: e.target.value });
  };

  useEffect(() => {
    setInputStates({ ...validation });
  }, []);

  return (
    <ListItem key={key} disableGutters>
      <ListItemButton
        className="flex flex-row justify-center items-start"
        onClick={() => navigate(`/despesa/${validation.expense.id}`)}
      >
        <ListItemText
          primary={`${validation.requested_by} solicitou sua validação na despesa ${validation.expense.name}`}
          secondary={
            validation.is_active
              ? `Solicitada em ${validation.created_at}`
              : validation.validated_at
              ? `Validada em ${validation.validated_at}`
              : "Rejeitada"
          }
        />
      </ListItemButton>
      {validation.is_active ? (
        <div className="flex flex-row justify-center items-start">
          <IconButton onClick={() => onClick(validation)}>
            <CheckBoxIcon color="success" />
          </IconButton>
          <IconButton onClick={() => setOpenModal(true)}>
            <DisabledByDefaultIcon sx={{ color: "red" }} />
          </IconButton>
        </div>
      ) : !validation.validated_at ? (
        <IconButton onClick={() => setOpenModal(true)}>
          <NoteAltOutlinedIcon color="primary" />
        </IconButton>
      ) : (
        <></>
      )}

      <CustomModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        children={
          <>
            {validation.is_active ? (
              <div>
                <Typography
                  id="modal-modal-title"
                  variant="h6"
                  component="h2"
                  sx={{ fontWeight: "bold" }}
                >
                  Explique o que está errado!
                </Typography>

                <TextField
                  id="outlined-basic"
                  placeholder="Descreva aqui o motivo dessa despesa não ser válida."
                  variant="outlined"
                  size="medium"
                  value={inputStates.note || ""}
                  onChange={handleChangeNote}
                  rows={4}
                  fullWidth
                  multiline
                  sx={{ margin: "10px 0px" }}
                />

                <Box className="flex flex-row justify-between mt-[10px]">
                  <Button
                    variant="outlined"
                    onClick={() => setOpenModal(false)}
                  >
                    Cancelar
                  </Button>
                  <Button
                    variant="contained"
                    onClick={() => {
                      onClick({ ...inputStates }, true);
                      setOpenModal(false);
                    }}
                  >
                    Rejeitar
                  </Button>
                </Box>
              </div>
            ) : (
              <div>
                <Typography
                  id="modal-modal-title"
                  variant="h6"
                  component="h2"
                  sx={{ fontWeight: "bold" }}
                >
                  Motivo da rejeição
                </Typography>

                <TextField
                  id="outlined-basic"
                  placeholder="Descreva aqui o motivo dessa despesa não ser válida."
                  variant="outlined"
                  size="medium"
                  rows={4}
                  value={inputStates.note || ""}
                  onChange={handleChangeNote}
                  disabled
                  fullWidth
                  multiline
                  sx={{ margin: "10px 0px" }}
                />

                <Box className="flex flex-row justify-end mt-[10px]">
                  <Button
                    variant="outlined"
                    onClick={() => setOpenModal(false)}
                  >
                    Fechar
                  </Button>
                </Box>
              </div>
            )}
          </>
        }
      />
    </ListItem>
  );
}

export default ValidationItem;
