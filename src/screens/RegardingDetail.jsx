import React from "react";
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
import Modal from "@mui/material/Modal";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Grid from "@mui/material/Grid";
import DashItem from "../components/DashItem";
import LineChart from "../components/LineChart";
import PieChart from "../components/PieChart";
import ExpenseList from "./ExpenseList";
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
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}


function RegardingDetail() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const editRegarding = () => {
    setAnchorEl(null);
    navigate("/editar-referencia/5")
  };
  return (
    <div >
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
      <div >
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
            <Tab label="Geral"/>
            <Tab label="Despesas"  />
          </Tabs>
          <TabPanel value={value} index={0} className="text-black">
          <h5 className="font-bold">Nome</h5>
              <span className="ml-[10px] text-sm">Ref name</span> 
              <h5 className="font-bold">Descrição</h5>
              <span className="ml-[10px] text-sm">Ref desc</span>  
              <h5 className="font-bold">Intervalo de duração</h5>
              <span className="ml-[10px] text-sm"> 01/03/2023 - 31-03-2023</span>  
              <h5 className="font-bold">Status</h5>
              <span className="ml-[10px] text-sm">Aberto</span>  
              <h5 className="font-bold">Grupo</h5>
              <span className="ml-[10px] text-sm">nome do grupo</span>  
          
          <h5>Totais e Saldo</h5>
          <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={5}>
            <DashItem title="Total Geral" />
          </Grid>
          <Grid item xs={5}>
            <DashItem title="Total Compartilhado" />
          </Grid>
          <Grid item xs={5}>
            <DashItem title="Total Pessoal" />
          </Grid>
          <Grid item xs={5}>
            <DashItem title="Saldo Compartilhado" />
          </Grid>
          <Box className="w-[95%] mx-auto my-3">
        <h5>Detalhes de Pagamento</h5>
        <Box className="w-[75%] mx-auto my-3">
          <PieChart/>
        </Box>
      </Box>
      <Box className="w-[95%] mx-auto my-3">
        <h5>Compras por dia</h5>
        <Box className="w-[75%] mx-auto my-3">
        <LineChart/>
        </Box>
      </Box>
        </Grid>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <ExpenseList/>
      </TabPanel>
        </AppBar>
      </div>
    </div>
  );
}

export default RegardingDetail;
