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
import PaymentItem from "../components/PaymentItem";
import Item from "../components/Item";
import FilterListIcon from "@mui/icons-material/FilterList";
import SearchIcon from "@mui/icons-material/Search";
import { useSelector } from "react-redux";
import BackButton from "../components/BackButton";

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
      className="bg-white text-black min-h-[calc(100vh-105px)]"
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function ExpenseDetail() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();
  const [value, setValue] = useState(0);
  let { id } = useParams();
  const expenseState = useSelector((state) => state.expense);
  const [expense, setExpense] = useState({});
  const [filteredItems, setFilteredItems] = useState([]);
  const [search, setSearch] = useState("");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const editExpense = () => {
    setAnchorEl(null);
    navigate(`/editar-despesa/${expense.id}`);
  };

  const handleChangeSearch = (e) => {
    let value = e.target.value;
    setSearch(value);
    let upperValue = value ? value.toUpperCase() : "";
    let words = upperValue.split(" ");
    let newItems = expense.items.filter((item) => {
      for (let word of words) {
        word = word.trim();
        let condition = item.name.toUpperCase().includes(word);
        if (condition) {
          return true;
        }
      }
    });
    setFilteredItems([...newItems]);
  };

  useEffect(() => {
    let index = expenseState.userExpenses.findIndex((item) => item.id == id);
    console.log(id, index);
    if (index != -1) {
      setExpense({ ...expenseState.userExpenses[index] });
      setFilteredItems([...expenseState.userExpenses[index].items]);
      console.log(expenseState.userExpenses[index]);
    }
  }, []);
  return (
    <div>
      <AppBar position="sticky">
        <Toolbar>
          <BackButton/>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Detalhes da Despesa
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
                <MenuItem onClick={editExpense}>Editar</MenuItem>
                <MenuItem onClick={() => {}}>Deletar</MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
      <div className="">
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
            <Tab label="Items" />
          </Tabs>
          <TabPanel value={value} index={0} className="text-black">
            <h5 className="font-bold">Nome</h5>
            <span className="ml-[10px] text-sm">{expense.name}</span>
            <h5 className="font-bold">Descrição</h5>
            <span className="ml-[10px] text-sm">
              {expense.description ? expense.description : "Sem descrição"}
            </span>
            <h5 className="font-bold">Referência</h5>
            <span className="ml-[10px] text-sm">{expense.regarding_name}</span>
            <h5 className="font-bold">Data de Criação</h5>
            <span className="ml-[10px] text-sm">{expense.date}</span>
            <h5 className="font-bold">É válida?</h5>
            <span className="ml-[10px] text-sm">
              {expense.is_validated ? "Sim" : "Não"}
            </span>
            <h5 className="font-bold">Status de Pagamento</h5>
            <span className="ml-[10px] text-sm">{expense.payment_status}</span>
            <h5 className="font-bold">Total Compartilhado</h5>
            <span className="ml-[10px] text-sm">R$ {expense.shared_total}</span>
            <h5 className="font-bold">Total Individual</h5>
            <span className="ml-[10px] text-sm">
              R$ {expense.individual_total}
            </span>
            <h5 className="font-bold">Valor</h5>
            <span className="ml-[10px] text-sm">R$ {expense.cost}</span>
            <h5 className="font-bold">Pagamentos</h5>
            <List>
              {"payments" in expense &&
                expense.payments.map((item) => {
                  return <PaymentItem payment={item} />;
                })}
            </List>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <div className="flex flex-row justify-between">
              <TextField
                id="outlined-basic"
                label="Pesquisa"
                placeholder="Filtre os itens por nome"
                variant="outlined"
                value={search}
                onChange={handleChangeSearch}
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
            </div>
            <List>
              {filteredItems.length > 0 &&
                filteredItems.map((item) => {
                  return <Item key={item.id} item={item} />;
                })}
            </List>
          </TabPanel>
        </AppBar>
      </div>
    </div>
  );
}

export default ExpenseDetail;
