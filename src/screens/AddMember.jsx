import React, { useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
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
import { Link, useNavigate, Location, useParams } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import SearchIcon from "@mui/icons-material/Search";
import Member from "../components/Member";
import TagIcon from '@mui/icons-material/Tag';
import ShareIcon from '@mui/icons-material/Share';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { loadUsers } from "../services/user";
import { createGroup, editGroup, loadGroups } from "../services/groups";
import { setGroups } from "../redux/slices/groupSlice";
import { useSelector } from "react-redux";
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


const groups = [
  { label: "Group 1", id: 1 },
  { label: "Group 2", id: 2 },
];

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 3,
};

function AddMember() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();
  let { id = null } = useParams();
  const [openToast, setOpenToast] = useState(false);
  const groupState = useSelector((state) => state.group);
  const [group, setGroup] = useState({});
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  
  const copyGroupCode = (code) => {
    navigator.clipboard.writeText(code);
    setOpenToast(true)

  }

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    let index = groupState.userGroups.findIndex((item) => item.id == id);
    console.log(id, index);
    if (index != -1) {
      let data = groupState.userGroups[index];
      setGroup({ ...data });
    }
    loadUsers("").then((json) => {
      setUsers([...json]);
    });
  }, [])
  return (
    <div>
      <AppBar position="sticky">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() => navigate("/")}
          >
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Adicionar Membro
          </Typography>
          
        </Toolbar>
      </AppBar>
      <div className="w-[90vw] mx-auto">
        <TextField
          id="outlined-basic"
          label="Valor"
          variant="outlined"
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
        <span className="font-bold text-lg">Resultados de "pesquisa"</span>
        <List>
          <Member variant="full" add={true}/>
        </List>
      </div>
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
          defaultValue={group.hash_id}
          
        />
          <IconButton color="inherit" onClick={() => copyGroupCode(group.hash_id)}>
            <ContentCopyIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Snackbar open={openToast} autoHideDuration={3000} onClose={() => setOpenToast(false)}>
  <Alert onClose={() => setOpenToast(false)} severity="info" sx={{ width: '100%' }}>
    Código copiado com sucesso!
  </Alert>
</Snackbar>
    </div>
  );
}

export default AddMember;
