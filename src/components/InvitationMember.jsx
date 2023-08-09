import React from "react";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ListItemButton from "@mui/material/ListItemButton";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { useState } from "react";
import Typography from "@mui/material/Typography";
import CustomModal from "../components/CustomModal";
import Box from "@mui/material/Box";
import { stringAvatar } from "../services/utils";

function InvitationMember({ key, member, onAdd = () => {} }) {
  const [openModal, setOpenModal] = useState(false);

  const handleConfirm = () => {
    setOpenModal(false);
    onAdd();
  };
  if (member) {
    let fullName = member.first_name + " " + member.last_name;
    return (
      <ListItem key={key} disableGutters disablePadding className="w-full">
        <ListItemButton>
          <ListItemAvatar>
            <Avatar {...stringAvatar(fullName)} />
          </ListItemAvatar>
          <ListItemText primary={fullName} />
        </ListItemButton>
        <span className="rounded-[50%] bg-slate-300 align-middle">
          <IconButton onClick={() => setOpenModal(true)}>
            <AddIcon />
          </IconButton>
        </span>

        <CustomModal
          open={openModal}
          onClose={() => setOpenModal(false)}
          children={
            <>
              <Typography
                id="modal-modal-title"
                variant="h6"
                component="h2"
                sx={{ fontWeight: "bold" }}
              >
                Confirmação de ação!
              </Typography>
              <div className="text-justify">
                Você realmente deseja convidar esse usuário para o grupo? Ele
                será adicionado com nível de editor, mas você poderá editar isso
                posteriormente.
              </div>
              <Box className="flex flex-row justify-between mt-[10px]">
                <Button variant="outlined" onClick={() => setOpenModal(false)}>
                  Cancelar
                </Button>
                <Button variant="contained" onClick={handleConfirm}>
                  Confirmar
                </Button>
              </Box>
            </>
          }
        />
      </ListItem>
    );
  } else {
    return <></>;
  }
}

export default InvitationMember;
