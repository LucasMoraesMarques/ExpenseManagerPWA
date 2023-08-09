import React, { useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import { useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import { Link, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { ReactComponent as LoginSVG } from "../assets/img/login.svg";
import { signInWithGoogle } from "../services/firebase";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentUser } from "../redux/slices/userSlice";
import { addMessage } from "../redux/slices/messageSlice";
import CircularProgress from "@mui/material/CircularProgress";
import { persistor } from "../redux/store";

function Login() {
  const [showPassword, setShowPassword] = React.useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formFilled, setFormFilled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loginWithGoogle, setLoginWithGoogle] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const login = async (userInfo) => {
    setLoading(true);
    let idToken = "";
    if (Object.keys(userInfo).length != 0) {
      idToken = userInfo.id;
    }
    try {
      const response = await fetch(
        process.env.REACT_APP_API_ROOT_URL + "login/",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: idToken ? userInfo.email : email,
            password: password,
            accountId: idToken ? userInfo.id : "",
          }),
        }
      );
      const json = await response.json();
      if (response.status == 200) {
        try {
          dispatch(setCurrentUser({ ...json.user, api_token: json.api_token }));
          dispatch(
            addMessage({
              title: "Alerta",
              body: "Login realizado com sucesso!",
              severity: "success",
            })
          );
          setTimeout(() => navigate("/"), 3000);
        } catch (error) {
          setLoading(false);
          setLoginWithGoogle(false);
          //Sentry.captureException(error);
        }
      } else {
        setLoading(false);
        setLoginWithGoogle(false);
        dispatch(
          addMessage({
            title: "Alerta",
            body: json.detail,
            severity: "warning",
          })
        );
      }
    } catch (error) {
      setLoading(false);
      setLoginWithGoogle(false);
      //Sentry.captureException(error);
    } finally {
    }
  };

  useEffect(() => {
    setFormFilled((password.length > 0) & (email.length > 0));
  }, [password, email]);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSignInWithGoogle = async () => {
    try {
      setLoading(true);
      setLoginWithGoogle(true);
      const result = await signInWithGoogle();
      const userInfo = result.additionalUserInfo.profile;
      let data = {
        email: userInfo.email,
        password: "",
        picture: userInfo.picture,
        google_id: userInfo.id,
      };
      await login(userInfo);
    } catch (error) {
    }
  };

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
            Login
          </Typography>
        </Toolbar>
      </AppBar>
      <div className="w-[90vw] mx-auto my-3 flex flex-col justify-start items-center">
        <LoginSVG className="w-[180px] h-[180px] my-4" />
        <TextField
          label="Email"
          variant="outlined"
          size="medium"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          sx={{ margin: "10px 0px" }}
        />
        <TextField
          label="Senha"
          variant="outlined"
          size="medium"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          sx={{ margin: "10px 0px" }}
          type={showPassword ? "text" : "password"}
          InputProps={{
            endAdornment: (
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
            ),
          }}
        />
        <Button
          variant="contained"
          className="w-full"
          disabled={!formFilled}
          onClick={() => login({})}
        >
          {loading && !loginWithGoogle ? (
            <span>
              <CircularProgress size={20} sx={{ color: "white" }} /> Entrando
              ...
            </span>
          ) : (
            <span>Entrar</span>
          )}
        </Button>
        <span className="my-3">Ou</span>
        <Button
          variant="contained"
          className="w-full"
          color="success"
          onClick={handleSignInWithGoogle}
        >
          {loading && loginWithGoogle ? (
            <CircularProgress size={20} sx={{ color: "white" }} />
          ) : (
            <></>
          )}
          {loading && loginWithGoogle ? "Entrando ..." : "Entrar com o Google"}
        </Button>
        <span className="my-3">
          Ainda não tem uma conta?{" "}
          <Link to="/registrar" className="text-blue-600">
            Registre-se aqui
          </Link>{" "}
        </span>
      </div>
    </div>
  );
}

export default Login;
