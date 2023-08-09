import React, { useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import { useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import List from "@mui/material/List";
import { useNavigate, useParams } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import Member from "../components/Member";
import TagIcon from '@mui/icons-material/Tag';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { loadUsers } from "../services/user";
import { useSelector } from "react-redux";
import { useOutletContext } from "react-router-dom";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});



function AddMember() {
  const navigate = useNavigate();
  let { id = null } = useParams();
  const [openToast, setOpenToast] = useState(false);
  const groupState = useSelector((state) => state.group);
  const [group, setGroup] = useState({});
  const [users, setUsers] = useState([]);
  const {user} = useOutletContext()

  const copyGroupCode = (code) => {
    navigator.clipboard.writeText(code);
    setOpenToast(true)

  }


  useEffect(() => {
    let index = groupState.userGroups.findIndex((item) => item.id == id);
    if (index != -1) {
      let data = groupState.userGroups[index];
      setGroup({ ...data });
    }
    loadUsers(user.api_token).then((json) => {
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
