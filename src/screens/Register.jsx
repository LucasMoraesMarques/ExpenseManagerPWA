import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import { useState, useEffect } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import { Link, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { ReactComponent as RegisterSVG } from "../assets/img/register.svg";
import { signInWithGoogle } from "../services/firebase";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../redux/slices/userSlice";
import { addMessage } from "../redux/slices/messageSlice";
import CircularProgress from "@mui/material/CircularProgress";
import { validateEmail } from "../services/utils";
import { persistor } from "../redux/store";

function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password1, setPassword1] = React.useState("");
  const [password2, setPassword2] = React.useState("");
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [formFilled, setFormFilled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [registerWithGoogle, setRegisterWithGoogle] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClickShowPassword1 = () => setShowPassword1((show) => !show);
  const handleClickShowPassword2 = () => setShowPassword2((show) => !show);

  const handleMouseDownPassword1 = (event) => {
    event.preventDefault();
  };
  const handleMouseDownPassword2 = (event) => {
    event.preventDefault();
  };

  const register = async (userInfo) => {
    setLoading(true);
    try {
      const response = await fetch(
        process.env.REACT_APP_API_ROOT_URL + "register/",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userInfo),
        }
      );
      const json = await response.json();
      if (response.status == 200) {
        try {
          dispatch(setCurrentUser({ ...json.user, api_token: json.api_token }));
          dispatch(
            addMessage({
              title: "Alerta",
              body: "Cadastro realizado com sucesso!",
              severity: "success",
            })
          );
          setTimeout(() => navigate("/"), 2000);
        } catch (error) {
          setLoading(false);
          setRegisterWithGoogle(false);
          //Sentry.captureException(error);
        }
      } else {
        setLoading(false);
        setRegisterWithGoogle(false);
        dispatch(
          addMessage({ title: "Alerta", body: json.detail, severity: "error" })
        );
      }
    } catch (error) {
      setLoading(false);
      setRegisterWithGoogle(false);
      //Sentry.captureException(error);
    } finally {
    }
  };

  const handleFormRegister = () => {
    let data = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password1,
      googleId: null,
    };
    register(data);
  };

  const handleRegisterWithGoogle = async () => {
    try {
      setLoading(true);
      setRegisterWithGoogle(true);
      const result = await signInWithGoogle();
      const userInfo = result.additionalUserInfo.profile;
      let data = {
        firstName: userInfo.given_name,
        lastName: userInfo.family_name,
        email: userInfo.email,
        password: userInfo.email,
        picture: userInfo.picture,
        googleId: userInfo.id,
      };
      await register(data);
    } catch (error) {
    }
  };

  useEffect(() => {
    setFormFilled(
      firstName.length > 0 &&
        lastName.length > 0 &&
        password1.length > 0 &&
        password2.length > 0 &&
        validateEmail(email) > 0 &&
        password1 === password2
    );
  }, [firstName, lastName, email, password1, password2]);

  useEffect(() => {
    persistor.persist();
  }, []);

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
            Cadastre-se
          </Typography>
        </Toolbar>
      </AppBar>
      <div className="w-[90vw] mx-auto my-3 flex flex-col justify-start items-center">
        <RegisterSVG className="w-[180px] h-[180px] my-4" />
        <TextField
          id="outlined-basic"
          label="Nome"
          variant="outlined"
          size="medium"
          fullWidth
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          sx={{ margin: "10px 0px" }}
          required
        />
        <TextField
          id="outlined-basic"
          label="Sobrenome"
          variant="outlined"
          size="medium"
          fullWidth
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          sx={{ margin: "10px 0px" }}
          required
        />
        <TextField
          id="outlined-basic"
          label="Email"
          variant="outlined"
          size="medium"
          type="email"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={email && !validateEmail(email)}
          helperText={email && !validateEmail(email) ? "Email inválido" : ""}
          sx={{ margin: "10px 0px" }}
          required
        />
        <TextField
          id="outlined-basic"
          label="Senha"
          variant="outlined"
          size="medium"
          fullWidth
          sx={{ margin: "10px 0px" }}
          value={password1}
          onChange={(e) => setPassword1(e.target.value)}
          error={password1 !== password2}
          helperText={password1 !== password2 ? "As senhas não são iguais" : ""}
          type={showPassword1 ? "text" : "password"}
          required
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword1}
                  onMouseDown={handleMouseDownPassword1}
                  edge="end"
                >
                  {showPassword1 ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <TextField
          id="outlined-basic"
          label="Confirmação de Senha"
          variant="outlined"
          size="medium"
          fullWidth
          sx={{ margin: "10px 0px" }}
          value={password2}
          onChange={(e) => setPassword2(e.target.value)}
          error={password1 !== password2}
          helperText={password1 !== password2 ? "As senhas não são iguais" : ""}
          type={showPassword2 ? "text" : "password"}
          required
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword2}
                  onMouseDown={handleMouseDownPassword2}
                  edge="end"
                >
                  {showPassword2 ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Button
          variant="contained"
          className="w-full"
          disabled={!formFilled}
          onClick={handleFormRegister}
        >
          {loading && !registerWithGoogle ? (
            <span>
              <CircularProgress size={20} sx={{ color: "white" }} /> Cadastrando
              ...
            </span>
          ) : (
            <span>Cadastrar</span>
          )}
        </Button>
        <span className="my-3">Ou</span>
        <Button
          variant="contained"
          className="w-full"
          color="success"
          onClick={handleRegisterWithGoogle}
        >
          {loading && registerWithGoogle ? (
            <CircularProgress size={20} sx={{ color: "white" }} />
          ) : (
            <></>
          )}
          {loading && registerWithGoogle
            ? "Cadastrando ..."
            : "Cadastrar com o Google"}
        </Button>
        <span className="my-3">
          Já tem uma conta?{" "}
          <Link to="/entrar" className="text-blue-600">
            Entre aqui
          </Link>{" "}
        </span>
      </div>
    </div>
  );
}

export default Register;
