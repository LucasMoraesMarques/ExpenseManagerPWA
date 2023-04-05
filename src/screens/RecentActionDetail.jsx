import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useState, useEffect } from "react";
import MenuItem from "@mui/material/MenuItem";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Menu from "@mui/material/Menu";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import AttachmentIcon from "@mui/icons-material/Attachment";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import List from "@mui/material/List";
import { Link, useNavigate, useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import { useSelector, useDispatch } from "react-redux";
import BackButton from "../components/BackButton";

const iconsByAction = {
  CREATE: "Criação",
  UPDATE: "Atualização",
  DELETE: "Exclusão",
};

function RecentActionDetail() {
  let { id } = useParams();
  const navigate = useNavigate();
  const actionState = useSelector((state) => state.action);
  const [action, setAction] = useState({});

  useEffect(() => {
    let index = actionState.groupsActions.findIndex((item) => item.id == id);
    if (index != -1) {
      setAction({ ...actionState.groupsActions[index] });
      console.log(actionState.groupsActions[index]);
    }
  }, []);

  return (
    <div>
      <AppBar position="sticky">
        <Toolbar>
          <BackButton />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Detalhes da ação
          </Typography>
        </Toolbar>
      </AppBar>
      <div className="w-[95vw] mx-auto my-3">
        <h5 className="font-bold">Descrição </h5>
        <span className="ml-[10px] text-sm">{action.description}</span>
        <h5 className="font-bold mt-2">Membro</h5>
        <span className="ml-[10px] text-sm">
          {"user" in action ? action.user.full_name : "-"}
        </span>
        <h5 className="font-bold mt-2">Grupo de Despesa</h5>
        <span className="ml-[10px] text-sm">
          {"expense_group" in action ? action.expense_group : "-"}
        </span>
        <h5 className="font-bold">Data da Ação </h5>
        <span className="ml-[10px] text-sm">{action.created_at}</span>
        <h5 className="font-bold mt-2">Tipo de Ação</h5>
        <span className="ml-[10px] text-sm">{iconsByAction[action.type]}</span>
        {action.type == "UPDATE" ? (
          <>
            <h5 className="font-bold">Alterações </h5>
            <List>
              {action.changes_json &&
                Object.keys(action.changes_json).map((key) => {
                  return <p>{action.changes_json[key]}</p>;
                })}
            </List>
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default RecentActionDetail;
