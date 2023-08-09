import React from "react";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ListItemButton from "@mui/material/ListItemButton";
import ListItem from "@mui/material/ListItem";
import Person2Icon from "@mui/icons-material/Person2";
import ListItemText from "@mui/material/ListItemText";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import DisabledByDefaultIcon from "@mui/icons-material/DisabledByDefault";
import { useState } from "react";
import Typography from "@mui/material/Typography";
import CustomModal from "../components/CustomModal";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import { stringAvatar } from "../services/utils";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import EditIcon from "@mui/icons-material/Edit";
import ListItemIcon from "@mui/material/ListItemIcon";
import Tooltip from "@mui/material/Tooltip";
import Checkbox from "@mui/material/Checkbox";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { editInvitation } from "../services/invitations";
import { useDispatch, useSelector } from "react-redux";
import { useOutletContext } from "react-router-dom";
import { addMessage } from "../redux/slices/messageSlice";
import { setCurrentUser, setUsers } from "../redux/slices/userSlice";
import { loadUsers } from "../services/user";
import { setGroups } from "../redux/slices/groupSlice";
import { loadGroups } from "../services/groups";
const colorsByStatus = {
  Pendente: "warning",
  Rejeitado: "error",
  Aceito: "success",
};

function InvitationItem({
  key,
  invitation,
  add = false,
  edit = false,
  deleteMode = false,
  isChecked = false,
  onAdd = () => {},
  onEdit = () => {},
  onCheck = () => {},
}) {
  const dispatch = useDispatch();
  const userState = useSelector(state => state.user)
  let apiToken = userState.currentUser.api_token

  const handleInvitationAnswer = (answer) => {
      let data = {
        status: answer ? "ACCEPTED" : "REJECTED"
      }
      editInvitation(userState.currentUser.api_token, invitation.id, data).then(
        ({ flag, data }) => {
          console.log(data, flag);
          if (flag) {
            if(answer){
              dispatch(addMessage({
                severity: "success",
                title: "Sucesso!",
                body: `Você entrou no grupo ${invitation.group_name}!`,
              }))
            }
            else{
              dispatch(addMessage({
                severity: "info",
                title: "Alerta!",
                body: `Convite rejeitado!`,
              }))
            }
            navigate('/inicio')
            dispatch(setReload(true))
          } else {
            dispatch(addMessage({
              severity: "error",
              title: "Erro!",
              body: "Tivemos problemas ao atualizar os dados. Tente novamente!",
            }))
          }
        }
      )
  };



  if (invitation) {
    return edit ? (
      <ListItem key={key} disableGutters disablePadding className="w-full p-2">
        <ListItemText
          primary="Convite"
          secondary={`${invitation.sent_by.full_name} te convidou para o grupo ${invitation.group_name}`}
        />
        {edit ? (
          <Box className="flex flex-row justify-between mt-[10px]">
            <IconButton
              size="medium"
              onClick={() => handleInvitationAnswer(false)}
            >
              <DisabledByDefaultIcon sx={{ color: "red" }} />
            </IconButton>
            <IconButton
              size="medium"
              onClick={() => handleInvitationAnswer(true)}
            >
              <CheckBoxIcon sx={{ color: "green" }} />
            </IconButton>
          </Box>
        ) : (
          <Chip
            label={invitation.status}
            color={colorsByStatus[invitation.status]}
            size="small"
          />
        )}
      </ListItem>
    ) : (
      <ListItem key={key} disableGutters disablePadding className="w-full p-2">
        <ListItemAvatar>
          <Avatar {...stringAvatar(invitation.invited.full_name)} />
        </ListItemAvatar>
        <ListItemText
          primary={invitation.invited.full_name}
          secondary={`Convidado em ${invitation.created_at} por ${invitation.sent_by.full_name}`}
        />
        <Chip
          label={invitation.status}
          color={colorsByStatus[invitation.status]}
          size="small"
        />
      </ListItem>
    );
  } else {
    return <></>;
  }
}

export default InvitationItem;
