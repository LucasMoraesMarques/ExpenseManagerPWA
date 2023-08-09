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
import { useOutletContext } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import InvitationMember from "../components/InvitationMember";
import ConfirmationModal from "../components/ConfirmationModal";
import InvitationItem from "../components/InvitationItem";
import NoData from "../components/NoData";
import Membership from "../components/Membership";
import { setReload } from "../redux/slices/configSlice";
function GroupEdit() {
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();
  let { id = null } = useParams();
  const groupState = useSelector((state) => state.group);
  const [group, setGroup] = useState({});
  const [inputStates, setInputStates] = useState({
    name: "",
    description: "",
    members: [],
    memberships: [],
    invitations: []
  });
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [memberSearch, setMemberSearch] = useState("");
  const [fieldsValid, setFieldsValid] = useState(false)
  const dispatch = useDispatch();
  const {user} = useOutletContext()
  const [deleteMode, setDeleteMode] = useState(false);
  const [deleteIds, setDeleteIds] = useState([]);
  const [openConfirmationModal, setOpenConfirmationModal] = useState(false);


  const handleChangeName = (e) => {
    setInputStates({ ...inputStates, name: e.target.value });
  };

  const handleChangeDescription = (e) => {
    setInputStates({ ...inputStates, description: e.target.value });
  };
  
  const handleChangeMembership = (newMembership) => {
    let index = inputStates.memberships.findIndex((member) => member.id == newMembership.id)
    let newMemberships = [...inputStates.memberships]
    if(index != -1){
      newMemberships[index] = newMembership
      setInputStates({...inputStates, memberships:newMemberships})
    }
  }

  const handleInviteUser = (invitedUser) => {
    console.log("members", invitedUser);
    let members = [...inputStates.members];
    let index = members.findIndex((item) => item.id == invitedUser.id);
    let invitation = {}
    if (index == -1) {
      let lastInvitation = inputStates.invitations.at(-1)
      let lastId = 0
      if(inputStates.invitations.length > 0){
        lastId = lastInvitation.id
      }
      let sendBy = user
      let now = new Date()
      invitation = {
        id: lastId + 1,
        sent_by: {id: sendBy.id, full_name: sendBy.full_name},
        invited: {id: invitedUser.id, full_name: invitedUser.full_name},
        created_at: `${now.getDate().toString().padStart(2, '0')}/${(now.getMonth()+1).toString().padStart(2, '0')}/${now.getFullYear()}`,
        status: "Pendente",
        create: true,
        expense_group: group.id,
        group_name: group.name
      }
      setFilteredUsers(filteredUsers.filter((item) => item.id != invitedUser.id));

    setInputStates({ ...inputStates, invitations: [...inputStates.invitations, invitation]});
    }
    
  };
  const handleRemoveMember = (membershipToRemove) => {
    console.log("members", membershipToRemove);
    let members = [...inputStates.members.filter((item) => item.id != membershipToRemove.user.id)];
    let memberships = [...inputStates.memberships.filter((item) => item.id != membershipToRemove.id)];
    console.log(members, memberships)
    setInputStates({ ...inputStates, members: [...members], memberships: [...memberships] });
  };

  const handleSaveGroup = () => {
    let data = {
      ...inputStates,
      members: inputStates.members.map((item) => item.id),
    };
    console.log(data);
    if (id) {
      editGroup(user.api_token, id, data).then(({ flag, data }) => {
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
          navigate(`/inicio`)
          dispatch(setReload(true))
        } else {
          dispatch(addMessage({
            severity: "error",
            title: "Erro!",
            body: "Tivemos problemas ao atualizar os dados. Tente novamente!",
          }))
        }
      });
    } else {
      createGroup(user.api_token, data).then(({flag, data}) =>{
        if (flag) {
          setGroup({ ...data });
          dispatch(addMessage({
            severity: "success",
            title: "Sucesso!",
            body: "Grupo adicionado com sucesso!",
          }))
          navigate(`/inicio`)
          dispatch(setReload(true))
        } else {
          dispatch(addMessage({
            severity: "error",
            title: "Erro!",
            body: "Tivemos problemas ao criar o grupo. Tente novamente!",
          }))
        }
      });
    }
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
          inputStates.members.filter((user) => user.id == item.id).length == 0 &&
          inputStates.invitations.filter((invitation) => invitation.invited.id == item.id).length == 0;

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

  const handleCheckbox = (id) => {
    let index = deleteIds.indexOf(id)
    console.log(id, index, deleteIds)
    if(index != -1){
      setDeleteIds(deleteIds.filter((item) => item != id))
    }
    else{
      let newIds = [...deleteIds]
      newIds.push(id)
      setDeleteIds([...newIds])
    }
  }

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
        memberships: data.memberships,
        invitations: data.invitations
      });
    } else{
      let currentUserMembership = {
        "id": 1,
        "user": {
            "id": 1,
            "first_name": "Lucas",
            "last_name": "Moraes",
            "full_name": "Lucas Moraes"
        },
        "level": "Leitor",
    }
    setInputStates({ ...inputStates,
      members: [currentUserMembership.user],
      memberships: [currentUserMembership],
    })
    }
    loadUsers(user.api_token).then((json) => {
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
    console.log(inputStates)
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
      <div className="w-[90vw] mx-auto overflow-y-scroll">
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
          
          {deleteMode ? (
          <div className="flex">
            <Button onClick={() => {setDeleteMode(false);setDeleteIds([])}} size="small">Cancelar</Button>
          </div>
        ) : (
        <div className="flex">
            <IconButton onClick={() => setOpenModal(true)}>
              <PersonAddIcon />
          </IconButton>
          {"members" in group && group.members.length > 0  ? <IconButton onClick={() => setDeleteMode(true)}>
            <DeleteIcon sx={{ color: "red" }} />
          </IconButton> : <></>}
          
        </div>
          
        )}
          
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
                Convidar usuários
              </Typography>
              <div className="w-[90%] mx-auto">
                <TextField
                  id="outlined-basic"
                  label="Nome ou email"
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
                      <InvitationMember
                        key={item.id}
                        member={item}
                        onAdd={() => handleInviteUser(item)}
                      />
                    );
                  })}
                </List>
              </div>
              <Box className="flex flex-row justify-end mt-[10px]">
                <Button variant="outlined" onClick={() => setOpenModal(false)}>
                  Fechar
                </Button>
              </Box> </>
              }/>
              {!id ?  <span className="text-[red] text-xs">
                  Você será adicionado como Administrador do grupo
                </span>: ""}
        {"memberships" in inputStates && inputStates.memberships.length > 0 ?
        <List>
          {inputStates.memberships.map((item) => {
            return (
              <Membership
                variant="full"
                key={item.id}
                membership={item}
                edit={true}
                deleteMode={deleteMode}
                isChecked={deleteIds.includes(item.id)}
                onEdit={handleChangeMembership}
                onDelete={() => handleRemoveMember(item)}
                onCheck={() => handleCheckbox(item.id)}
                groupCreator={!id ? true : false}
              />
            );
          })}
        </List>
        : (
          <NoData message="Nenhum membro encontrado" />
        )}
        {"invitations" in inputStates && inputStates.invitations.length > 0 &&
        <>
        <div className="flex flex-row justify-between w-full items-center">
          <span className="font-bold text-xl">Convites</span>

          
        </div>
        <List>
           {inputStates.invitations.map((item) => {
            return (
              <InvitationItem
                key={item.id}
                invitation={item}
                edit={false}
              />
            );
          })}
        </List>
        </>
        
        }
      </div>
    </div>
  );
}

export default GroupEdit;
