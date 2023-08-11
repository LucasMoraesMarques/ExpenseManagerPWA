import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import BaseScreen from "./screens/BaseScreen";
import ExpenseEdit from "./screens/ExpenseEdit";
import RegardingEdit from "./screens/RegardingEdit";
import AddMember from "./screens/AddMember";
import GroupEdit from "./screens/GroupEdit";
import RegardingDetail from "./screens/RegardingDetail";
import ExpenseDetail from "./screens/ExpenseDetail";
import ExpenseCreate from "./screens/ExpenseCreate";
import Notifications from "./screens/Notifications";
import Account from "./screens/Account";
import GroupList from "./screens/GroupList";
import GroupDetail from "./screens/GroupDetail";
import PaymentMethodList from "./screens/PaymentMethodList";
import ProfileEdit from "./screens/ProfileEdit";
import Splash from "./screens/Splash";
import Onboarding from "./screens/Onboarding";
import Login from "./screens/Login";
import Register from "./screens/Register";
import RecentActionList from "./screens/RecentActionList";
import RecentActionDetail from "./screens/RecentActionDetail";
import ProtectedRoute from "./components/ProtectedRoute";
import MessageQueue from "./components/MessageQueue";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { setGroups } from "./redux/slices/groupSlice";
import { loadGroups } from "./services/groups";
import { setRegardings } from "./redux/slices/regardingSlice";
import { loadRegardings } from "./services/regardings";
import { loadExpenses } from "./services/expenses";
import { loadNotifications } from "./services/notifications";
import { loadValidations } from "./services/validations";
import { loadUsers } from "./services/user";
import { setExpenses } from "./redux/slices/expenseSlice";
import { setValidations } from "./redux/slices/validationSlice";
import { setNotifications } from "./redux/slices/notificationSlice";
import { setUsers, setCurrentUser } from "./redux/slices/userSlice";
import { loadActions } from "./services/actions";
import { setActions } from "./redux/slices/actionSlice";
import { addMessage } from "./redux/slices/messageSlice";
import { setReload } from "./redux/slices/configSlice";

function App() {
  const userState = useSelector((state) => state.user);
  const configState = useSelector((state) => state.config);
  const [open, setOpen] = useState(false);
  let currentUser = userState.currentUser;
  let apiToken = null;
  if (Object.keys(currentUser).length > 0) {
    apiToken = currentUser.api_token;
  }
  const dispatch = useDispatch();

  const loadResources = async () => {
    if (!apiToken) {
      setOpen(false);
      return false;
    }
    loadGroups(apiToken)
      .then((json) => {
        if("detail" in json && json.detail == "Invalid token."){
          throw Error("Token inválido")
        }
        dispatch(setGroups(json));
      })
      .then(async () => {
        return loadRegardings(apiToken).then((json) => {
          dispatch(setRegardings(json));
        });
      })
      .then(async () => {
        return loadExpenses(apiToken).then((json) => {
          dispatch(setExpenses(json));
        });
      })
      .then(async () => {
        return loadNotifications(apiToken).then((json) => {
          dispatch(setNotifications(json));
        });
      })
      .then(async () => {
        return loadValidations(apiToken).then((json) => {
          dispatch(setValidations(json));
        });
      })
      .then(async () => {
        return loadUsers(apiToken).then((json) => {
          dispatch(setUsers(json));
          let newCurrentUser = json.filter(
            (user) => user.id == currentUser.id
          )[0];
          dispatch(setCurrentUser({ ...newCurrentUser, api_token: apiToken }));
        });
      })
      .then(async () => {
        return loadActions(apiToken).then((json) => {
          dispatch(setActions(json));
        });
      })
      .then(() => {
        setOpen(false);
      })
      .catch((e) => {
        if(e.message == "Token inválido") {
          dispatch(
            addMessage({
              title: "Alerta",
              body: "Sua sessão expirou. Faça login novamente!",
              severity: "warning",
            })
          );
          setTimeout(() => {window.location.url = "/boas-vindas"}, 1000);
        } else {
          dispatch(
            addMessage({
              title: "Erro",
              body: "Erro ao carregar os dados. Tente novamente!",
              severity: "error",
            })
          );
          setTimeout(() => {window.location.url = "/boas-vindas"}, 1000);
        }
      })
      .finally(() => {
        setOpen(false);
        dispatch(setReload(false));
      });
  };

  useEffect(() => {
    dispatch(setReload(true));
    return () => dispatch(setReload(false));
  }, []);

  useEffect(() => {
    let currentPath = window.location.href.replace(process.env.REACT_APP_BASE_DOMAIN, "")
    console.log(process.env.REACT_APP_BASE_DOMAIN, currentPath)
    if (configState.reload && currentPath != '/') {
      setOpen(true);
      loadResources();
    }
  }, [configState]);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index path="/" element={<Splash />} />
          <Route index path="/boas-vindas" element={<Onboarding />} />
          <Route index path="/entrar" element={<Login />} />
          <Route index path="/registrar" element={<Register />} />
          <Route element={<ProtectedRoute user={userState.currentUser} />}>
            <Route path="/inicio" element={<BaseScreen />} />
            <Route path="/criar-despesa" element={<ExpenseCreate />} />
            <Route path="/editar-despesa/:id" element={<ExpenseEdit />} />
            <Route path="/despesa/:id" element={<ExpenseDetail />} />
            <Route path="/criar-referencia" element={<RegardingEdit />} />
            <Route path="/editar-referencia/:id" element={<RegardingEdit />} />
            <Route path="/referencia/:id" element={<RegardingDetail />} />
            <Route path="/criar-grupo" element={<GroupEdit />} />
            <Route path="/editar-grupo/:id" element={<GroupEdit />} />
            <Route path="/grupo/:id/adicionar-membro" element={<AddMember />} />
            <Route path="/grupos" element={<GroupList />} />
            <Route path="/grupo/:id" element={<GroupDetail />} />
            <Route path="/notificacoes" element={<Notifications />} />
            <Route path="/conta" element={<Account />} />
            <Route path="/perfil" element={<ProfileEdit />} />
            <Route
              path="/metodos-de-pagamento"
              element={<PaymentMethodList />}
            />
            <Route path="/historico-de-acoes" element={<RecentActionList />} />
            <Route path="/acao/:id" element={<RecentActionDetail />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <MessageQueue />
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <div className="flex flex-col items-center">
          <CircularProgress color="inherit" />
          <span>Atualizando os dados ...</span>
        </div>
      </Backdrop>
    </>
  );
}

export default App;
