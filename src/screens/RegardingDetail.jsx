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
import { useNavigate, useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Grid from "@mui/material/Grid";
import DashItem from "../components/DashItem";
import LineChart from "../components/LineChart";
import PieChart from "../components/PieChart";
import ExpenseList from "./ExpenseList";
import { useSelector, useDispatch } from "react-redux";
import BackButton from "../components/BackButton";
import { deleteRegarding } from "../services/regardings";
import ConfirmationModal from "../components/ConfirmationModal";
import CustomModal from "../components/CustomModal";
import DebtItem from "../components/DebtItem";
import { addMessage } from "../redux/slices/messageSlice";
import { useOutletContext } from "react-router-dom";
import NoData from "../components/NoData";
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
      className="bg-white text-black min-h-[calc(100vh-110px)]"
    >
      {value === index && <Box sx={{ p: padding }}>{children}</Box>}
    </div>
  );
}

function RegardingDetail() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [openConfirmationModal, setOpenConfirmationModal] = useState(false);
  let { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [value, setValue] = useState(0);
  const regardingState = useSelector((state) => state.regarding);
  const [regarding, setRegarding] = useState({});
  const { user } = useOutletContext();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const editRegarding = () => {
    setAnchorEl(null);
    navigate(`/editar-referencia/${id}`);
  };

  const handleRemove = async () => {
    deleteRegarding(user.api_token, regarding.id).then((flag) => {
      if (flag) {
        dispatch(
          addMessage({
            severity: "success",
            title: "Sucesso!",
            body: "Referência removida com sucesso!",
          })
        );
        navigate("/inicio");
        dispatch(setReload(true));
      } else {
        dispatch(
          addMessage({
            severity: "error",
            title: "Erro!",
            body: "Tivemos problemas ao deletar a referência. Tente novamente!",
          })
        );
      }
      setOpenConfirmationModal(false);
    });
  };

  useEffect(() => {
    let index = regardingState.userRegardings.findIndex(
      (item) => item.id == id
    );
    if (index != -1) {
      setRegarding({ ...regardingState.userRegardings[index] });
    }
  }, []);
  return (
    <div>
      <AppBar position="sticky">
        <Toolbar>
          <BackButton />
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
                <MenuItem onClick={() => setOpenConfirmationModal(true)}>
                  Deletar
                </MenuItem>
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
          <TabPanel value={value} index={0} padding={2} className="text-black">
            <h5 className="font-bold">Nome </h5>
            <span className="ml-[10px] text-sm">{regarding.name}</span>
            <h5 className="font-bold mt-2">Descrição</h5>
            <span className="ml-[10px] text-sm">{regarding.description}</span>
            <h5 className="font-bold mt-2">Intervalo de duração</h5>
            <span className="ml-[10px] text-sm">
              {" "}
              {regarding.start_date} a {regarding.end_date}
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
                    helpText={"Soma de todas as despesas da referência"}
                  />
                </Grid>
                <Grid item xs={6}>
                  <DashItem
                    title="Total Compartilhado Completo"
                    value={"R$ " + regarding.personal_total.shared}
                    helpText={
                      "Soma dos itens em que todos os membros são consumidores"
                    }
                  />
                </Grid>
                <Grid item xs={6}>
                  <DashItem
                    title="Total Compartilhado Parcial"
                    value={"R$ " + regarding.personal_total.partial_shared}
                    helpText={
                      "Soma dos itens em que alguém dividiu algo com você"
                    }
                  />
                </Grid>
                <Grid item xs={6}>
                  <DashItem
                    title="Total Individual"
                    value={"R$ " + regarding.personal_total.individual}
                    helpText={"Soma dos itens em que você é o único consumidor"}
                  />
                </Grid>
                <Grid item xs={6}>
                  <DashItem
                    title="Saldo Compartilhado"
                    value={"R$ " + regarding.personal_total.balance}
                    helpText={
                      "Saldo relativo ao total pago do valor compartilhado em relação à parcela esperada devido ao peso do membro"
                    }
                  />
                </Grid>
              </Grid>
            )}

            <h5 className="font-bold mt-2">Débitos individuais</h5>
            <List>
              {regarding.has_expenses &&
              Object.keys(regarding.total_member_vs_member).length > 0 ? (
                Object.keys(regarding.total_member_vs_member).map((member1) => {
                  let data = regarding.total_member_vs_member[member1];
                  return Object.keys(data).map((member2) => {
                    let value = data[member2];
                    return (
                      <DebtItem
                        key={member1 + member2}
                        payer={member2}
                        receiver={member1}
                        debt={value}
                      />
                    );
                  });
                })
              ) : (
                <NoData message="Nenhum débito encontrado" />
              )}
            </List>
            <h5 className="font-bold">Detalhes de Pagamento</h5>
            {regarding.has_expenses &&
            Object.keys(regarding.general_total).length > 0 ? (
              <>
                <Box className="w-[95%] mx-auto my-3">
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
                  <Box className="my-3">
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
            ) : (
              <NoData message="Nenhum pagamento encontrado" />
            )}
          </TabPanel>
          <TabPanel value={value} index={1} padding={1}>
            <ExpenseList
              regarding={regarding.id}
              showRegardingName={false}
              showDeleteIcon={!regarding.is_closed}
            />
          </TabPanel>
        </AppBar>
      </div>
      <CustomModal
        open={openConfirmationModal}
        onClose={() => setOpenConfirmationModal(false)}
        children={
          <>
            <ConfirmationModal
              message={`Você realmente deseja deletar essa referência? Todos as despesas também serão deletadas.`}
              onCancel={() => setOpenConfirmationModal(false)}
              onConfirm={handleRemove}
            />
          </>
        }
      />
    </div>
  );
}

export default RegardingDetail;
