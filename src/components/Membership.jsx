import React, { useEffect } from "react";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import DisabledByDefaultIcon from "@mui/icons-material/DisabledByDefault";
import { useState } from "react";
import Typography from "@mui/material/Typography";
import CustomModal from "../components/CustomModal";
import Box from "@mui/material/Box";
import { stringAvatar } from "../services/utils";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import EditIcon from "@mui/icons-material/Edit";
import Tooltip from "@mui/material/Tooltip";

const membershipLevels = {
  Administrador: {
    icon: <ManageAccountsIcon sx={{ fontSize: 30 }} />,
    tooltip: "Administrador",
  },
  Editor: { icon: <EditIcon sx={{ fontSize: 30 }} />, tooltip: "Editor" },
  Leitor: { icon: <AccountBoxIcon sx={{ fontSize: 30 }} />, tooltip: "Leitor" },
};

const membershipLevelsOptions = [
  { id: 1, name: "Administrador" },
  { id: 2, name: "Editor" },
  { id: 3, name: "Leitor" },
];

function Membership({
  key,
  membership,
  variant = "rounded",
  add = false,
  edit = false,
  deleteMode = false,
  isChecked = false,
  onAdd = () => {},
  onEdit = () => {},
  onDelete = () => {},
  onCheck = () => {},
  groupCreator = false,
}) {
  const [openModal, setOpenModal] = useState(false);
  const [inputStates, setInputStates] = useState({
    level: membershipLevelsOptions.find(
      (item) => item.name == membership.level
    ),
  });
  const [levelOptions, setLevelOptions] = useState([
    ...membershipLevelsOptions,
  ]);

  const handleChangeMembershipLevel = (e, value) => {
    if (value) {
      setInputStates({ level: value });
      setLevelOptions(
        membershipLevelsOptions.filter((item) => item.id != value.id)
      );
      onEdit({ ...membership, level: value.name, updated: true });
    }
  };

  const handleConfirmRemoveMember = () => {
    setOpenModal(false);
    onDelete();
  };

  useEffect(() => {
    if (groupCreator) {
      setInputStates({ level: { id: 1, name: "Administrador" } });
    }
  }, []);
  if (membership) {
    let member = membership.user;
    let fullName = member.first_name + " " + member.last_name;

    return (
      <ListItem key={key} disableGutters disablePadding className="w-full">
        <div className="flex justify-between items-center w-full p-2">
          <ListItemAvatar>
            <Avatar {...stringAvatar(fullName)} />
          </ListItemAvatar>
          {!edit ? (
            <ListItemText
              primary={fullName}
              secondary={"Desde " + membership.joined_at}
            />
          ) : (
            ""
          )}
          {edit ? (
            <Autocomplete
              id="tags-standard"
              options={levelOptions}
              filterSelectedOptions
              getOptionLabel={(option) => option.name}
              isOptionEqualToValue={(option, value) => option.id === value.id}
              onChange={handleChangeMembershipLevel}
              value={inputStates.level}
              sx={{ width: 200 }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Nível"
                  placeholder="Selecione a validação"
                  variant="outlined"
                />
              )}
              disabled={groupCreator}
            />
          ) : (
            <Tooltip title={membershipLevels[membership.level].tooltip}>
              <IconButton>{membershipLevels[membership.level].icon}</IconButton>
            </Tooltip>
          )}
        </div>
        {deleteMode ? (
          <IconButton onClick={() => setOpenModal(true)}>
            <DisabledByDefaultIcon sx={{ color: "red" }} />
          </IconButton>
        ) : (
          ""
        )}

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
                Confirmação de ação
              </Typography>

              <div className="text-justify">
                Você realmente deseja remover esse usuário do grupo? O membro
                removido continuará com acesso aos dados até o momento da
                remoção.
              </div>

              <Box className="flex flex-row justify-between mt-[10px]">
                <Button variant="outlined" onClick={() => setOpenModal(false)}>
                  Cancelar
                </Button>
                <Button variant="contained" onClick={handleConfirmRemoveMember}>
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

export default Membership;
