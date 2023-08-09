import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import MenuItem from "@mui/material/MenuItem";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Menu from "@mui/material/Menu";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Member from "../components/Member";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import NoData from "../components/NoData";
import BackButton from "../components/BackButton";
import TagIcon from '@mui/icons-material/Tag';
import TextField from "@mui/material/TextField";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import AlertToast from "../components/AlertToast";
import ConfirmationModal from "../components/ConfirmationModal";
import CustomModal from "../components/CustomModal";
import { deleteGroup } from "../services/groups";
import { setGroups } from "../redux/slices/groupSlice";
import { loadRegardings } from "../services/regardings";
import { setRegardings } from "../redux/slices/regardingSlice";
import { loadActions } from '../services/actions';
import { setActions } from '../redux/slices/actionSlice';
import { addMessage } from "../redux/slices/messageSlice";
import { useOutletContext } from "react-router-dom";
import InvitationItem from "../components/InvitationItem";
import { setReload } from "../redux/slices/configSlice";


function GroupDetail() {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  let { id } = useParams();
  const groupState = useSelector((state) => state.group);
  const dispatch = useDispatch();
  const [group, setGroup] = useState({});
  const [openConfirmationModal, setOpenConfirmationModal] = useState(false);
  const {user} = useOutletContext()


  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const editGroup = () => {
    setAnchorEl(null);
    navigate(`/editar-grupo/${id}`);
  };

  const copyGroupCode = (code) => {
    navigator.clipboard.writeText(code);
    dispatch(addMessage({
      severity:"success",
      title: '',
      body: "Código do grupo copiado com sucesso!"
    }))

  }

  const handleRemove = async () => {
    deleteGroup(user.api_token, group.id).then((flag) => {
      if(flag){
        let newGroups = groupState.userGroups.filter((item) => item.id != group.id)
        dispatch(setGroups([...newGroups]))
        dispatch(addMessage({
          severity: "success",
          title: "Sucesso!",
          body: "Grupo removido com sucesso!",
        }))
        navigate('/inicio')
        dispatch(setReload(true))
      }
      else{
        dispatch(addMessage({
          severity: "error",
          title: "Erro!",
          body: "Tivemos problemas ao deletar o grupo. Tente novamente!",
        }))
      }
      setOpenConfirmationModal(false)

    })
  }

  useEffect(() => {
    let index = groupState.userGroups.findIndex((item) => item.id == id);
    console.log(id, index);
    if (index != -1) {
      setGroup({ ...groupState.userGroups[index] });
    }
  }, []);

  useEffect(() => {
    console.log(Object.keys(group), group.hash_id);
  }, [group]);
  return (
    <div>
      <AppBar position="sticky">
        <Toolbar>
          <BackButton/>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Detalhes do grupo
          </Typography>
          {true && (
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <MoreVertIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={() => setAnchorEl(null)}
              >
                <MenuItem onClick={editGroup}>Editar</MenuItem>
                <MenuItem onClick={() => setOpenConfirmationModal(true)}>Deletar</MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>

      {Object.keys(group).length > 0 ? (
        <div className="w-[95%] mx-auto mt-3 overflow-y-scroll max-h-[calc(100vh-150px)]">
          <h5 className="font-bold">Nome</h5>
          <span className="ml-[10px] text-sm">{group.name}</span>
          <h5 className="font-bold">Descrição</h5>
          <span className="ml-[10px] text-sm">{group.description}</span>
          <h5 className="font-bold">Data de Criação</h5>
          <span className="ml-[10px] text-sm"> {group.created_at}</span>
          <h5 className="font-bold">Número de Referências</h5>
          <span className="ml-[10px] text-sm">
            {group.number_of_regardings}
          </span>
          <h5 className="font-bold">Número de Despesas</h5>
          <span className="ml-[10px] text-sm"> {group.number_of_expenses}</span>
          <h5 className="font-bold">Ativo ?</h5>
          <span className="ml-[10px] text-sm">
            {group.is_active ? "Sim" : "Não"}
          </span>
          <h5 className="font-bold">Membros</h5>
          
            {"members" in group && group.members.length > 0 ?
            (<List>
              {group.memberships.map((item) => <Member variant="full" key={item.id} member={{...item, ...item.user}} />)}
              </List>) : <NoData message="Esse grupo não tem membros"/>
              }
           {"invitations" in group && group.invitations.length > 0 &&
        <>
        <div className="flex flex-row justify-between w-full items-center">
          <span className="font-bold">Convites</span>

          
        </div>
        <List>
           {group.invitations.map((item) => {
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
      ) : (
        <></>
      )}
      <AppBar position="fixed" color="transparent" sx={{ top: 'auto', bottom: 0 }}>
        <Toolbar>
          <IconButton color="inherit" aria-label="open drawer">
            <TagIcon />
          </IconButton>
          <TextField
          id="outlined-basic"
          label="Código do Grupo"
          size="medium"
          fullWidth
          sx={{margin: '10px 0px'}}
          disabled
          value={group.hash_id}
          InputLabelProps={{ shrink: true }}
          
        />
          <IconButton color="inherit" onClick={() => copyGroupCode(group.hash_id)}>
            <ContentCopyIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <CustomModal
        open={openConfirmationModal}
        onClose={() => setOpenConfirmationModal(false)}
        children={
          <>
            <ConfirmationModal
              message={`Você realmente deseja deletar esse grupo? Todos as referências e despesas também serão deletadas.`}
              onCancel={() => setOpenConfirmationModal(false)}
              onConfirm={handleRemove}
            />
          </>
        }
      />
    </div>
  );
}

export default GroupDetail;
