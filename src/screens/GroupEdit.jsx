import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
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
import { Link, useNavigate, Location } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Member from "../components/Member";
import CustomModal from "../components/CustomModal";
import SearchIcon from "@mui/icons-material/Search";

import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { loadUsers } from "../services/user";
import { createGroup, editGroup, loadGroups } from "../services/groups";
import { setGroups } from "../redux/slices/groupSlice";
import AlertToast from "../components/AlertToast";
import BackButton from "../components/BackButton";
import { loadActions } from '../services/actions';
import { setActions } from '../redux/slices/actionSlice';
import { addMessage } from "../redux/slices/messageSlice";

function GroupEdit() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();
  let { id = null } = useParams();
  const groupState = useSelector((state) => state.group);
  const [group, setGroup] = useState({});
  const [inputStates, setInputStates] = useState({
    name: "",
    description: "",
    members: [],
  });
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [memberSearch, setMemberSearch] = useState("");
  const [fieldsValid, setFieldsValid] = useState(false)
  const dispatch = useDispatch();
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChangeName = (e) => {
    setInputStates({ ...inputStates, name: e.target.value });
  };

  const handleChangeDescription = (e) => {
    setInputStates({ ...inputStates, description: e.target.value });
  };

  const handleAddMember = (user) => {
    console.log("members", user);
    let members = [...inputStates.members];
    let index = members.findIndex((item) => item.id == user.id);
    if (index == -1) {
      members.push(user);
    }
    setFilteredUsers(filteredUsers.filter((item) => item.id != user.id));

    setInputStates({ ...inputStates, members: [...members] });
  };
  const handleRemoveMember = (user) => {
    console.log("members", user);
    let members = [...inputStates.members.filter((item) => item.id != user.id)];
    setInputStates({ ...inputStates, members: [...members] });
  };

  const handleSaveGroup = () => {
    let data = {
      ...inputStates,
      members: inputStates.members.map((item) => item.id),
    };
    console.log(data);
    if (id) {
      editGroup("", id, data).then(({ flag, data }) => {
        if (flag) {
          setGroup({ ...data });
          console.log(groupState.userGroups);
          let index = groupState.userGroups.findIndex((item) => item.id == id);
          let newGroups = [...groupState.userGroups];
          console.log(newGroups);
          newGroups[index] = {...newGroups[index], ...inputStates};
          dispatch(setGroups(newGroups));
          dispatch(addMessage({
            severity: "success",
            title: "Sucesso!",
            body: "Grupo editado com sucesso!",
          }))
        } else {
          dispatch(addMessage({
            severity: "error",
            title: "Erro!",
            body: "Tivemos problemas ao atualizar os dados. Tente novamente!",
          }))
        }
      });
    } else {
      createGroup("", data).then(({flag, data}) =>{
        if (flag) {
          setGroup({ ...data });
          loadGroups('').then((newGroups)=>dispatch(setGroups(newGroups)))
          ;
          dispatch(addMessage({
            severity: "success",
            title: "Sucesso!",
            body: "Grupo adicionado com sucesso!",
          }))
        } else {
          dispatch(addMessage({
            severity: "error",
            title: "Erro!",
            body: "Tivemos problemas ao criar o grupo. Tente novamente!",
          }))
        }
      });
    }
    loadActions('').then((json) => {
      dispatch(setActions(json))
    })
  };

  const handleChangeMemberSearch = (e) => {
    let value = e.target.value;
    setMemberSearch(value);
    if (value.trim() == "") {
      setFilteredUsers([]);
    } else {
      let upperValue = value ? value.toUpperCase() : "";
      let words = upperValue.split(" ");
      let newUsers = users.filter((item) => {
        let condition1 =
          inputStates.members.filter((user) => user.id == item.id).length == 0;
        for (let word of words) {
          word = word.trim();
          let condition2 =
            item.first_name.toUpperCase().includes(word) ||
            item.last_name.toUpperCase().includes(upperValue) ||
            item.email.toUpperCase().includes(upperValue);
          if (condition1 && condition2) {
            return true;
          }
        }
      });
      setFilteredUsers([...newUsers]);
    }
  };

  useEffect(() => {
    let index = groupState.userGroups.findIndex((item) => item.id == id);
    console.log(id, index);
    if (index != -1) {
      let data = groupState.userGroups[index];
      setGroup({ ...data });
      setInputStates({
        name: data.name,
        description: data.description,
        members: data.members,
      });
    }
    loadUsers("").then((json) => {
      setUsers([...json]);
    });
  }, []);

  useEffect(() => {
    console.log(inputStates);
    if(inputStates.name.trim() == '' || inputStates.description.trim() == '' || inputStates.members.length == 0){
      setFieldsValid(false)
    } else{
      setFieldsValid(true)
    }
  }, [inputStates]);

  return (
    <div>
      <AppBar position="sticky">
        <Toolbar>
          <BackButton/>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {id ? "Editar Grupo" : "Criar Grupo"}
          </Typography>
          {true && (
            <div>
              <Button
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                disabled={!fieldsValid}
                color="inherit"
                variant="outlined"
                onClick={handleSaveGroup}
              >
                Salvar
              </Button>
            </div>
          )}
        </Toolbar>
      </AppBar>
      <div className="w-[90vw] mx-auto">
        <TextField
          id="outlined-basic"
          label="Nome"
          variant="outlined"
          size="medium"
          error={inputStates.name.trim() == '' ? true : false}
          helperText={inputStates.name.trim() == '' ? 'Não pode ser vazio' : ''}
          fullWidth
          value={inputStates.name}
          onChange={handleChangeName}
          sx={{ margin: "10px 0px" }}
        />
        <TextField
          id="outlined-basic"
          label="Descrição"
          variant="outlined"
          error={inputStates.description.trim() == '' ? true : false}
          helperText={inputStates.description.trim() == '' ? 'Não pode ser vazio' : ''}
          multiline
          rows={3}
          size="medium"
          fullWidth
          value={inputStates.description}
          onChange={handleChangeDescription}
          sx={{ margin: "10px 0px" }}
        />

        <div className="flex flex-row justify-between w-full items-center">
          <span className="font-bold text-xl">Membros</span>
          <span className="rounded-[50%] bg-slate-300 align-middle">
            <IconButton onClick={() => setOpenModal(true)}>
              <AddIcon />
            </IconButton>
          </span>
        </div>
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
                Adicionar Membro(s)
              </Typography>
              <div className="w-[90%] mx-auto">
                <TextField
                  id="outlined-basic"
                  label="Valor"
                  variant="outlined"
                  size="medium"
                  value={memberSearch}
                  onChange={handleChangeMemberSearch}
                  fullWidth
                  sx={{ margin: "10px 0px" }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  }}
                />
                <span className="font-bold text-lg">
                  Resultados de "{memberSearch}"
                </span>
                <List>
                  {filteredUsers.map((item) => {
                    return (
                      <Member
                        variant="full"
                        key={item.id}
                        member={item}
                        add={true}
                        onAdd={() => handleAddMember(item)}
                      />
                    );
                  })}
                </List>
              </div>
              <Box className="flex flex-row justify-end mt-[10px]">
                <Button variant="outlined" onClick={() => setOpenModal(false)}>
                  Fechar
                </Button>
              </Box>
            </>
          }
        />
        <List>
          {inputStates.members.map((item) => {
            return (
              <Member
                variant="full"
                key={item.id}
                member={item}
                edit={true}
                onEdit={() => handleRemoveMember(item)}
              />
            );
          })}
        </List>
      </div>
    </div>
  );
}

export default GroupEdit;
