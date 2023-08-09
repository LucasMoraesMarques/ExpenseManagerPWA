import React, { useEffect } from "react";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import List from "@mui/material/List";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import SearchIcon from "@mui/icons-material/Search";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import GroupItem from "../components/GroupItem";
import TagIcon from "@mui/icons-material/Tag";
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";
import { useSelector, useDispatch } from "react-redux";
import BackButton from "../components/BackButton";
import NoData from "../components/NoData";
import { joinGroup } from "../services/groups";
import { addMessage } from "../redux/slices/messageSlice";
import { useOutletContext } from "react-router-dom";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import InvitationItem from "../components/InvitationItem";
import { setReload } from "../redux/slices/configSlice";

function TabPanel(props) {
  const { children, value, index, padding, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
      className="bg-white text-black min-h-[calc(100vh-105px)]"
    >
      {value === index && <Box sx={{ p: padding }}>{children}</Box>}
    </div>
  );
}
function GroupList() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [value, setValue] = useState(0);
  const navigate = useNavigate();
  const groupState = useSelector((state) => state.group);
  const [filteredGroups, setFilteredGroups] = useState([]);
  const [search, setSearch] = useState("");
  const [hashId, setHashId] = useState("");
  const dispatch = useDispatch();
  const { user } = useOutletContext();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleJoinGroup = async () => {
    joinGroup(user.api_token, hashId).then(({ flag, message }) => {
      if (flag) {
        dispatch(
          addMessage({
            severity: "success",
            title: "Sucesso!",
            body: message,
          })
        );
        dispatch(setReload(true));
      } else {
        dispatch(
          addMessage({
            severity: "error",
            title: "Erro!",
            body: message,
          })
        );
      }
    });
  };

  const handleChangeSearch = (e) => {
    let value = e.target.value;
    setSearch(value);
    let upperValue = value ? value.toUpperCase() : "";
    let words = upperValue.split(" ");
    let newGroups = groupState.userGroups.filter((item) => {
      for (let word of words) {
        word = word.trim();
        let condition =
          item.name.toUpperCase().includes(word) ||
          item.description.toUpperCase().includes(word);
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
          <BackButton />
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
      <div className="">
        <AppBar position="static">
          <Tabs
            value={value}
            onChange={handleChange}
            className="bg-[#e2e2e2] text-[#000]"
            textColor="inherit"
            indicatorColor="primary"
            variant="fullWidth"
            aria-label="full width tabs example"
          >
            <Tab label="Seus grupos" />
            <Tab label="Convites" />
          </Tabs>
          <TabPanel value={value} index={0} className="text-black" padding={1}>
            <div className="overflow-y-scroll mx-auto max-h-[calc(100vh-220px)]">
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

              <List sx={{ maxHeight: "90%", overflow: "auto" }}>
                {filteredGroups.length > 0 ? (
                  filteredGroups.map((item) => {
                    return (
                      <GroupItem variant="full" key={item.id} group={item} />
                    );
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
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  disabled={hashId && hashId.trim().length > 0 ? false : true}
                >
                  <LoginOutlinedIcon onClick={handleJoinGroup} />
                </IconButton>
              </Toolbar>
            </AppBar>
          </TabPanel>
          <TabPanel value={value} index={1} padding={1}>
            <div className="overflow-y-scroll mx-auto max-h-[calc(100vh-220px)]">
              {user.invitations_received.length > 0 ? (
                <List>
                  {user.invitations_received.map((item) => {
                    return (
                      <InvitationItem
                        key={item.id}
                        invitation={item}
                        edit={true}
                      />
                    );
                  })}
                </List>
              ) : (
                <NoData message="Nenhum convite encontrado" />
              )}
            </div>
          </TabPanel>
        </AppBar>
      </div>
    </div>
  );
}

export default GroupList;
