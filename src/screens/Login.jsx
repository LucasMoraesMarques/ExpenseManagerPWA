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
import { Link, useNavigate, Location } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Member from "../components/Member";
import CustomModal from "../components/CustomModal";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {ReactComponent as LoginSVG} from '../assets/img/login.svg';
import { signInWithGoogle } from '../services/firebase';
import { useSelector, useDispatch } from "react-redux";
import { setCurrentUser, setUser } from "../redux/slices/userSlice";
const groups = [
  { label: "Group 1", id: 1 },
  { label: "Group 2", id: 2 },
];

function Login() {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)


  const handleSignInWithGoogle = async () => {
    try {
      const result = await signInWithGoogle()
      console.log(result)
      const userInfo = result.additionalUserInfo.profile
      let data = {
        email: userInfo.email,
        password: '',
        picture: userInfo.picture,
        google_id: userInfo.id

      }
      dispatch(setCurrentUser(data))
    } catch(error) {
      console.log(error)

    }
  }

  useEffect(()=> {
    console.log("effect", user)
  }, [user])


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
            Login
          </Typography>
        
        </Toolbar>
      </AppBar>
      <div className="w-[90vw] mx-auto my-3 flex flex-col justify-start items-center">
        <LoginSVG className="w-[180px] h-[180px] my-4"/>
        <TextField
          id="outlined-basic"
          label="Email"
          variant="outlined"
          size="medium"
          type="email"
          fullWidth
          sx={{ margin: "10px 0px" }}
        />
        <TextField
          id="outlined-basic"
          label="Senha"
          variant="outlined"
          size="medium"
          fullWidth
          sx={{ margin: "10px 0px" }}
          type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
        />
        <Button variant="contained" className="w-full">
          Entrar
        </Button>
        <span className="my-3">Ou</span>
        <Button variant="contained" className="w-full" color="success" onClick={handleSignInWithGoogle}>
          Entrar com google
        </Button>  
        <span className="my-3">Ainda não tem uma conta? <Link to='/registrar' className="text-blue-600">Registre-se aqui</Link> </span>
       
      </div>
    </div>
  );
}

export default Login;
