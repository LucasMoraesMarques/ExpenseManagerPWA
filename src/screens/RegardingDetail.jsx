import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useState, useEffect } from "react";
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
import { Link, useNavigate, useParams } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Grid from "@mui/material/Grid";
import DashItem from "../components/DashItem";
import LineChart from "../components/LineChart";
import PieChart from "../components/PieChart";
import ExpenseList from "./ExpenseList";
import { useSelector } from "react-redux";
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

function RegardingDetail() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  let { id } = useParams();
  const navigate = useNavigate();
  const [value, setValue] = useState(0);
  const regardingState = useSelector((state) => state.regarding);
  const [regarding, setRegarding] = useState({});

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const editRegarding = () => {
    setAnchorEl(null);
    navigate("/editar-referencia/5");
  };

  useEffect(() => {
    let index = regardingState.userRegardings.findIndex(
      (item) => item.id == id
    );
    console.log(id, index);
    if (index != -1) {
      setRegarding({ ...regardingState.userRegardings[index] });
      console.log(regardingState.userRegardings[index]);
    }
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
            Detalhes da Referência
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
                onClose={() => setAnchorEl(null)}
              >
                <MenuItem onClick={editRegarding}>Editar</MenuItem>
                <MenuItem onClick={() => {}}>Deletar</MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
      <div>
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
            <Tab label="Despesas" />
          </Tabs>
          <TabPanel value={value} index={0} className="text-black">
            <h5 className="font-bold">Nome</h5>
            <span className="ml-[10px] text-sm">{regarding.name}</span>
            <h5 className="font-bold mt-2">Descrição</h5>
            <span className="ml-[10px] text-sm">{regarding.description}</span>
            <h5 className="font-bold mt-2">Intervalo de duração</h5>
            <span className="ml-[10px] text-sm">
              {" "}
              {regarding.start_date} - {regarding.end_date}
            </span>
            <h5 className="font-bold mt-2">Status</h5>
            <span className="ml-[10px] text-sm">
              {regarding.is_closed ? "Finalizada" : "Em andamento"}
            </span>
            <h5 className="font-bold mt-2">Grupo</h5>
            <span className="ml-[10px] text-sm">{regarding.group_name}</span>

            <h5 className="font-bold mt-2">Totais e Saldo</h5>
            {"general_total" in regarding && (
              <Grid container rowSpacing={1} direction="column">
                <Grid item xs={6}>
                  <DashItem
                    title="Total Geral"
                    value={"R$ " + regarding.general_total.total_expenses}
                  />
                </Grid>
                <Grid item xs={6}>
                  <DashItem
                    title="Total Compartilhado Completo"
                    value={"R$ " + regarding.consumer_total.shared}
                  />
                </Grid>
                <Grid item xs={6}>
                  <DashItem
                    title="Total Compartilhado Parcial"
                    value={"R$ " + regarding.consumer_total.partial_shared}
                  />
                </Grid>
                <Grid item xs={6}>
                  <DashItem
                    title="Total Individual"
                    value={"R$ " + regarding.consumer_total.individual}
                  />
                </Grid>
                <Grid item xs={6}>
                  <DashItem
                    title="Saldo Compartilhado"
                    value={"R$ " + regarding.consumer_total.balance}
                  />
                </Grid>
              </Grid>
            )}
            {"general_total" in regarding && (
              <>
                <Box className="w-[95%] mx-auto my-3">
                  <h5 className="font-bold">Detalhes de Pagamento</h5>
                  <Box className="w-[75%] mx-auto my-3">
                    <PieChart
                      data={{
                        labels: [
                          "EM VALIDAÇÃO",
                          "AGUARDANDO",
                          "PAGO",
                          "VENCIDO",
                        ],
                        datasets: [
                          {
                            label: "Valor R$",
                            data: [
                              regarding.general_total.total_validation,
                              regarding.general_total.total_open,
                              regarding.general_total.total_paid,
                              regarding.general_total.total_overdue,
                            ],
                            backgroundColor: [
                              "#fb923c",
                              "#facc15",
                              "#65a30d",
                              "#ef4444",
                            ],
                            borderColor: [
                              "#fb923c",
                              "#facc15",
                              "#365314",
                              "#b91c1c",
                            ],
                            borderWidth: 1,
                          },
                        ],
                      }}
                    />
                  </Box>
                </Box>
                <Box className="w-[95%] mx-auto my-3">
                  <h5 className="font-bold">Compras por dia</h5>
                  <Box className="w-[75%] mx-auto my-3">
                    <LineChart
                      data={{
                        labels: Object.keys(regarding.total_by_day),
                        datasets: [
                          {
                            label: "Valor R$",
                            data: Object.values(regarding.total_by_day),
                            backgroundColor: [
                              "rgba(255, 99, 132, 0.2)",
                              "rgba(54, 162, 235, 0.2)",
                              "rgba(255, 206, 86, 0.2)",
                              "rgba(75, 192, 192, 0.2)",
                              "rgba(153, 102, 255, 0.2)",
                              "rgba(255, 159, 64, 0.2)",
                            ],
                            borderColor: [
                              "rgba(255, 99, 132, 1)",
                              "rgba(54, 162, 235, 1)",
                              "rgba(255, 206, 86, 1)",
                              "rgba(75, 192, 192, 1)",
                              "rgba(153, 102, 255, 1)",
                              "rgba(255, 159, 64, 1)",
                            ],
                            spanGaps: false,
                            borderWidth: 1,
                          },
                        ],
                      }}
                    />
                  </Box>
                </Box>
              </>
            )}
          </TabPanel>
          <TabPanel value={value} index={1}>
            <ExpenseList regarding={regarding.id}/>
          </TabPanel>
        </AppBar>
      </div>
    </div>
  );
}

export default RegardingDetail;
