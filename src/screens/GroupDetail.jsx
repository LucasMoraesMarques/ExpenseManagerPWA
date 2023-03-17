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
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import NoData from "../components/NoData";
import BackButton from "../components/BackButton";
import TagIcon from '@mui/icons-material/Tag';
import TextField from "@mui/material/TextField";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import AlertToast from "../components/AlertToast";

function GroupDetail() {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  let { id } = useParams();
  const groupState = useSelector((state) => state.group);
  const [group, setGroup] = useState({});
  const [message, setMessage] = useState({});
  const [open, setOpen] = useState(false);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const editGroup = () => {
    setAnchorEl(null);
    navigate(`/editar-grupo/${id}`);
  };

  const copyGroupCode = (code) => {
    navigator.clipboard.writeText(code);
    setOpen(true)
    setMessage({
      severity:"success",
      title: '',
      body: "Código do grupo copiado com sucesso!"
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
                {/*<MenuItem onClick={() => {}}>Deletar</MenuItem>*/}
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>

      {Object.keys(group).length > 0 ? (
        <div className="w-[95%] mx-auto mt-3">
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
              {group.members.map((item) => <Member variant="full" key={item.id} member={item} />)}
              </List>) : <NoData message="Esse grupo não tem membros"/>
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
      {Object.keys(message) && (
        <AlertToast
          severity={message.severity}
          title={message.title}
          message={message.body}
          open={open}
          onClose={() => {
            setOpen(false);
            setMessage({});
          }}
        />
      )}
    </div>
  );
}

export default GroupDetail;
