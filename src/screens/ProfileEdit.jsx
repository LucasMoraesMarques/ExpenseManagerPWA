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
import Item from "../components/Item";
import { Link, useNavigate, Location } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import BackButton from "../components/BackButton";
import { useSelector, useDispatch } from "react-redux";
import { editUser } from "../services/user";
import { setCurrentUser } from "../redux/slices/userSlice";
import { addMessage } from "../redux/slices/messageSlice";

function ProfileEdit() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();
  const userState = useSelector((state) => state.user);

  const [inputStates, setInputStates] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
  });

  const dispatch = useDispatch();


  const handleChangeFirstName = (e) => {
    setInputStates({ ...inputStates, first_name: e.target.value });
  };

  const handleChangeLastName = (e) => {
    setInputStates({ ...inputStates, last_name: e.target.value });
  };

  const handleChangeEmail = (e) => {
    setInputStates({ ...inputStates, email: e.target.value });
  };

  const handleChangePhone = (e) => {
    setInputStates({ ...inputStates, phone: e.target.value });
  };

  const handleSaveUser = () => {
    console.log(inputStates)
    editUser("", userState.currentUser.id, inputStates).then(({ flag, data }) => {
      console.log(flag, data);
      if (flag) {
        let newUser = {
          ...data,
        };
        dispatch(
          setCurrentUser(newUser)
        );

        dispatch(addMessage({
          severity: "success",
          title: "Sucesso!",
          body: "Dados pessoais atualizados com sucesso!",
        }))
        setOpenModal(false);
      } else {
        dispatch(addMessage({
          severity: "error",
          title: "Erro!",
          body: "Tivemos problemas ao atualizar seus dados. Tente novamente!",
        }))
        setOpenModal(false);
      }
    });
  }

  useEffect(() => {
    let user = userState.currentUser
    console.log(user)
    setInputStates({
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      phone: user.phone
    })
  }, [])
  return (
    <div>
      <AppBar position="sticky">
        <Toolbar>
        <BackButton/>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Seus dados
          </Typography>
          {true && (
            <div>
              <Button
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                color="inherit"
                variant="outlined"
                onClick={handleSaveUser}
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
          value={inputStates.first_name}
          onChange={handleChangeFirstName}
          variant="outlined"
          size="medium"
          fullWidth
          sx={{ margin: "10px 0px" }}
        />
        <TextField
          id="outlined-basic"
          label="Sobrenome"
          value={inputStates.last_name}
          onChange={handleChangeLastName}
          variant="outlined"
          size="medium"
          fullWidth
          sx={{ margin: "10px 0px" }}
        />
        <TextField
          id="outlined-basic"
          label="Email"
          variant="outlined"
          value={inputStates.email}
          onChange={handleChangeEmail}
          type="email"
          rows={3}
          size="medium"
          fullWidth
          sx={{ margin: "10px 0px" }}
        />
        <TextField
          id="outlined-basic"
          label="Telefone"
          variant="outlined"
          value={inputStates.phone}
          onChange={handleChangePhone}
          rows={3}
          size="medium"
          fullWidth
          sx={{ margin: "10px 0px" }}
        />
       
      </div>
    </div>
  );
}

export default ProfileEdit;
