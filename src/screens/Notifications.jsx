import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useState, useEffect } from "react";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import NotificationItem from "../components/NotificationItem";
import ValidationItem from "../components/ValidationItem";
import CustomModal from "../components/CustomModal";
import { useDispatch, useSelector } from "react-redux";
import BackButton from "../components/BackButton";
import Badge from "@mui/material/Badge";
import { editNotifications } from "../services/notifications";
import { setNotifications } from "../redux/slices/notificationSlice";
import { editValidation } from "../services/validations";
import { setValidations } from "../redux/slices/validationSlice";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import NoData from "../components/NoData";
import { useOutletContext } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import { setReload } from "../redux/slices/configSlice";
import SwipeableViews from "react-swipeable-views";
import AskNotificationPermission from "../components/AskNotificationPermission";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
      className="bg-white text-black min-h-[calc(100vh-110px)]"
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function Notifications() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [value, setValue] = useState(0);
  const notificationState = useSelector((state) => state.notification);
  const validationState = useSelector((state) => state.validation);
  const [notificationDetail, setNotificationDetail] = useState({});
  const [selectedChip, setSelectedChip] = useState("Abertas");
  const [filteredValidations, setFilteredValidations] = useState([]);
  const { user } = useOutletContext();
  const [validationPage, setValidationPage] = useState(1);
  const [validationSliceRange, setValidationSliceRange] = useState({
    start: 0,
    end: 50,
  });
  const [notificationPage, setNotificationPage] = useState(1);
  const [notificationSliceRange, setNotificationSliceRange] = useState({
    start: 0,
    end: 50,
  });

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const deactivateNotification = (notification) => {
    setOpenModal(true);
    setNotificationDetail(notification);
    editNotifications(user.api_token, notification.id, {
      is_active: false,
    }).then(({ flag, data }) => {
      if (flag) {
        let index = notificationState.userNotifications.findIndex(
          (item) => item.id == notification.id
        );
        let newNotifications = [...notificationState.userNotifications];
        newNotifications[index] = { ...data };
        dispatch(setNotifications(newNotifications));
      } else {
      }
    });
  };

  const deactivateValidation = (validation, rejected = false) => {
    let newValidation = {
      ...validation,
      is_active: false,
      validator: validation.validator.id,
      expense: validation.expense.id,
    };
    if (!rejected) {
      newValidation.validated_at = new Date()
        .toLocaleDateString("zh-Hans-CN")
        .replaceAll("/", "-");
    }
    editValidation(user.api_token, validation.id, newValidation).then(
      ({ flag, data }) => {
        if (flag) {
          let index = validationState.userValidations.findIndex(
            (item) => item.id == validation.id
          );
          let newValidations = [...validationState.userValidations];
          newValidations[index] = {
            ...validation,
            is_active: data.is_active,
            validated_at: data.validated_at
              ? `${data.validated_at.slice(0, 4)}/${data.validated_at.slice(
                  5,
                  7
                )}/${data.validated_at.slice(8, 10)}`
              : "",
          };
          dispatch(setValidations(newValidations));
          dispatch(setReload(true));
        } else {
        }
      }
    );
  };

  const handleSelectChip = (label) => {
    setSelectedChip(label);
    setFilteredValidations([
      ...validationState.userValidations.filter((item) => {
        if (label == "Abertas") {
          return item.is_active;
        } else if (label == "Validadas") {
          return item.validated_at;
        } else if (label == "Rejeitadas") {
          return !item.validated_at && !item.is_active;
        } else {
          return true;
        }
      }),
    ]);
  };

  const handleValidationPagination = (e, value) => {
    setValidationPage(value);
    let start = 50 * (value - 1);
    let end = 50 * value;
    if (end > filteredValidations.length) {
      end = filteredValidations.length;
    }
    setValidationSliceRange({
      start: start,
      end: end,
    });
  };

  const handleNotificationPagination = (e, value) => {
    setNotificationPage(value);
    let start = 50 * (value - 1);
    let end = 50 * value;
    if (end > notificationState.userNotifications.length) {
      end = notificationState.userNotifications.length;
    }
    setNotificationSliceRange({
      start: start,
      end: end,
    });
  };

  useEffect(() => {
    setFilteredValidations([...validationState.userValidations]);
    handleSelectChip(selectedChip);
  }, [validationState]);

  useEffect(() => {
    handleValidationPagination(null, 1);
  }, [filteredValidations]);

  useEffect(() => {
    handleNotificationPagination(null, 1);
  }, [notificationState.userNotifications]);

  useEffect(() => {
    handleValidationPagination(null, 1);
    handleNotificationPagination(null, 1);
  }, []);

  return (
    <div className="h-screen">
      <AppBar position="sticky">
        <Toolbar>
        <IconButton
      size="large"
      edge="start"
      color="inherit"
      aria-label="menu"
      sx={{ mr: 2 }}
      onClick={() => navigate('inicio')}
    >
      <ArrowBackIcon />
    </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Notificações
          </Typography>
          {false && (
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
                <MenuItem onClick={() => {}}>Deletar todas</MenuItem>
                {value == 0 ? (
                  <MenuItem onClick={() => {}}>
                    Marcar todas como lidas
                  </MenuItem>
                ) : (
                  <MenuItem onClick={() => {}}>Validar todas</MenuItem>
                )}
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
      <div id="notifications">
        <div>
          <Badge
            badgeContent={
              validationState.userValidations.filter((item) => item.is_active)
                .length
            }
            color="error"
            className="absolute top-[80px] left-[calc(100vw-30px)]"
            sx={{ position: "absolute" }}
          />
          <Badge
            badgeContent={
              notificationState.userNotifications.filter(
                (item) => item.is_active
              ).length
            }
            color="error"
            className="absolute top-[80px] left-[calc((100vw/2)-40px)]"
            sx={{ position: "absolute" }}
          />
        </div>
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
            <Tab label="Geral" />
            <Tab label="Validações" />
          </Tabs>
        </AppBar>
        <SwipeableViews index={value} onChangeIndex={handleChangeIndex}>
          <TabPanel value={value} index={0} className="text-black">
            {Notification.permission !== "granted" &&
            Notification.permission !== "denied" ? (
              <AskNotificationPermission />
            ) : (
              <></>
            )}
            <span className="text-sm">
              Mostrando{" "}
              {notificationSliceRange.end != 0
                ? notificationSliceRange.start + 1
                : 0}{" "}
              a {notificationSliceRange.end} de{" "}
              {notificationState.userNotifications.length} notificações
            </span>
            {notificationState.userNotifications.length > 50 ? (
              <Pagination
                count={Math.ceil(
                  notificationState.userNotifications.length / 50
                )}
                page={notificationPage}
                onChange={handleNotificationPagination}
              />
            ) : (
              <></>
            )}
            <div className="overflow-y-scroll max-h-[calc(100vh-140px)]">
              {notificationState.userNotifications.length > 0 ? (
                <List>
                  {notificationState.userNotifications.map((item) => {
                    return (
                      <NotificationItem
                        id={item.id}
                        notification={item}
                        onClick={deactivateNotification}
                      />
                    );
                  })}
                </List>
              ) : (
                <NoData message="Nenhuma notificação encontrada" />
              )}
            </div>
          </TabPanel>

          <TabPanel value={value} index={1}>
            {Notification.permission !== "granted" &&
            Notification.permission !== "denied" ? (
              <AskNotificationPermission />
            ) : (
              <></>
            )}
            <Stack direction="row" spacing={1} sx={{ marginTop: "10px" }}>
              <Chip
                label="Todas"
                color="primary"
                variant={selectedChip == "Todas" ? "contained" : "outlined"}
                onClick={() => handleSelectChip("Todas")}
              />
              <Chip
                label="Abertas"
                color="primary"
                variant={selectedChip == "Abertas" ? "contained" : "outlined"}
                onClick={() => handleSelectChip("Abertas")}
              />

              <Chip
                label="Validadas"
                color="primary"
                variant={selectedChip == "Validadas" ? "contained" : "outlined"}
                onClick={() => handleSelectChip("Validadas")}
              />
              <Chip
                label="Rejeitadas"
                color="primary"
                variant={
                  selectedChip == "Rejeitadas" ? "contained" : "outlined"
                }
                onClick={() => handleSelectChip("Rejeitadas")}
              />
            </Stack>
            <span className="text-sm">
              Mostrando{" "}
              {validationSliceRange.end != 0
                ? validationSliceRange.start + 1
                : 0}{" "}
              a {validationSliceRange.end} de {filteredValidations.length}{" "}
              validações
            </span>
            {filteredValidations.length > 50 ? (
              <Pagination
                count={Math.ceil(filteredValidations.length / 50)}
                page={validationPage}
                onChange={handleValidationPagination}
              />
            ) : (
              <></>
            )}

            <div className="overflow-y-scroll max-h-[calc(100vh-150px)]">
              <List>
                {filteredValidations.length > 0 ? (
                  filteredValidations
                    .slice(validationSliceRange.start, validationSliceRange.end)
                    .map((item) => {
                      return (
                        <ValidationItem
                          key={item.id}
                          validation={item}
                          onClick={deactivateValidation}
                        />
                      );
                    })
                ) : (
                  <NoData message="Nenhuma validação encontrada" />
                )}
              </List>
            </div>
          </TabPanel>
        </SwipeableViews>
      </div>
      <CustomModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        children={
          <>
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              sx={{ fontWeight: "bold" }}
            >
              Detalhes da Notificação
            </Typography>
            <span>{notificationDetail.body}</span>

            <Box className="flex flex-row justify-end mt-[10px]">
              <Button
                variant="outlined"
                onClick={() => {
                  setOpenModal(false);
                  setNotificationDetail({});
                }}
              >
                Fechar
              </Button>
            </Box>
          </>
        }
      />
    </div>
  );
}

export default Notifications;
