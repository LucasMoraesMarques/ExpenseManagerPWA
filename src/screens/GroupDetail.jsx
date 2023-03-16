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


function GroupDetail() {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  let { id } = useParams();
  const groupState = useSelector((state) => state.group);
  const [group, setGroup] = useState({});

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const editGroup = () => {
    setAnchorEl(null);
    navigate(`/editar-grupo/${id}`);
  };

  useEffect(() => {
    let index = groupState.userGroups.findIndex((item) => item.id == id);
    console.log(id, index);
    if (index != -1) {
      setGroup({ ...groupState.userGroups[index] });
    }
  }, []);

  useEffect(() => {
    console.log(Object.keys(group));
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
    </div>
  );
}

export default GroupDetail;
