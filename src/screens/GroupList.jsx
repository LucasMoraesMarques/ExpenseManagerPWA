import React, { useEffect } from "react";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useState } from "react";
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
import Modal from "@mui/material/Modal";
import SearchIcon from "@mui/icons-material/Search";
import RegardingItem from "../components/RegardingItem";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import FilterListIcon from "@mui/icons-material/FilterList";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import CloseIcon from "@mui/icons-material/Close";
import CustomModal from "../components/CustomModal";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import GroupItem from "../components/GroupItem";
import TagIcon from "@mui/icons-material/Tag";
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";
import { useSelector, useDispatch } from "react-redux";
import BackButton from "../components/BackButton";
import NoData from "../components/NoData";
import { createGroup, joinGroup, loadGroups } from "../services/groups";
import { setGroups } from "../redux/slices/groupSlice";
import { addMessage } from "../redux/slices/messageSlice";
import { useOutletContext } from "react-router-dom";


const groups = [
  { label: "Group 1", id: 1 },
  { label: "Group 2", id: 2 },]
function GroupList() {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const groupState = useSelector((state) => state.group);
  const [filteredGroups, setFilteredGroups] = useState([]);
  const [search, setSearch] = useState("");
  const [hashId, setHashId] = useState("")
  const dispatch = useDispatch();
  const {user} = useOutletContext()


  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleJoinGroup = async () => {
    joinGroup(user.api_token, hashId).then(({flag, message}) => {
      if (flag) {
        loadGroups(user.api_token).then((newGroups)=>dispatch(setGroups(newGroups)))
        dispatch(addMessage({
          severity: "success",
          title: "Sucesso!",
          body: message,
        }))
      } else {
        dispatch(addMessage({
          severity: "error",
          title: "Erro!",
          body: message,
        }))
      }
    })
  }

  const handleChangeSearch = (e) => {
    let value = e.target.value;
    setSearch(value);
    let upperValue = value ? value.toUpperCase() : "";
    let words = upperValue.split(" ");
    let newGroups = groupState.userGroups.filter((item) => {
      for (let word of words) {
        word = word.trim();
        let condition = item.name.toUpperCase().includes(word) || item.description.toUpperCase().includes(word);
        if (condition) {
          return true;
        }
      }
    });
    setFilteredGroups([...newGroups]);
  };

  useEffect(() => {
    setFilteredGroups([...groupState.userGroups]);
  }, [groupState.userGroups]);
  return (
    <div className="">
      <AppBar position="sticky">
        <Toolbar>
          <BackButton/>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Grupos
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
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
      <div className=" w-[95%] mx-auto h-[calc(100vh-150px)]">
        <div className="flex flex-row justify-between">
          <TextField
            id="outlined-basic"
            label="Pesquisa"
            placeholder="Filtre os grupos por nome"
            variant="outlined"
            value={search}
            onChange={handleChangeSearch}
            size="medium"
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
        </div>
        <span className="font-bold text-lg">
        {search ? `Resultados de "${search}"` : ""}
      </span>
      <div className="flex flew-row justify-between items-center">
        <span className="text-sm">
          Mostrando {filteredGroups.length} grupos
        </span>
      </div>

      <List sx={{maxHeight: '90%', overflow: 'auto'}}>
        {filteredGroups.length > 0 ? (
          filteredGroups.map((item) => {
            return <GroupItem variant="full" key={item.id} group={item} />;
          })
        ) : (
          <NoData message="Nenhum grupo encontrado" />
        )}
      </List>
      </div>
      <AppBar
        position="fixed"
        color="transparent"
        sx={{ top: "auto", bottom: 0 }}
      >
        <Toolbar>
          <IconButton color="inherit" aria-label="open drawer">
            <TagIcon />
          </IconButton>
          <TextField
            id="outlined-basic"
            label="Entre em um grupo pelo código"
            size="medium"
            fullWidth
            sx={{ margin: "10px 0px" }}
            placeholder="Digite o código do grupo"
            value={hashId}
            onChange={(e) => setHashId(e.target.value)}
          />
          <IconButton color="inherit" aria-label="open drawer" disabled={hashId && hashId.trim().length > 0 ? false : true}>
            <LoginOutlinedIcon onClick={handleJoinGroup}/>
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default GroupList;
