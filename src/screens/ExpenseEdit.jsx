import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import InputAdornment from "@mui/material/InputAdornment";
import List from "@mui/material/List";
import Item from "../components/Item";
import { useNavigate, useParams } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import CustomModal from "../components/CustomModal";
import BackButton from "../components/BackButton";
import { useSelector, useDispatch } from "react-redux";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { loadExpenses, editExpense } from "../services/expenses";
import { loadRegardings } from "../services/regardings";
import { setExpenses } from "../redux/slices/expenseSlice";
import { setRegardings } from "../redux/slices/regardingSlice";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import PaymentItem from "../components/PaymentItem";
import { loadActions } from "../services/actions";
import { setActions } from "../redux/slices/actionSlice";
import {
  validateTextField,
  validateCurrency,
  moneyMask,
  calculateTotalValueOfArray,
} from "../services/utils";
import NoData from "../components/NoData";
import { addMessage } from "../redux/slices/messageSlice";
import { loadValidations } from '../services/validations';
import { setValidations } from '../redux/slices/validationSlice';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { useOutletContext } from "react-router-dom";


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
      className="bg-white text-black grow"
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function ExpenseEdit() {
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();
  let { id = null } = useParams();
  const expenseState = useSelector((state) => state.expense);
  const regardingState = useSelector((state) => state.regarding);
  const groupState = useSelector((state) => state.group);
  const userState = useSelector((state) => state.user);
  const [expense, setExpense] = useState({});
  const [inputStates, setInputStates] = useState({
    name: "",
    description: "",
    date: "",
    cost: "0,00",
    regarding: "",
    items: [],
    payments: [],
    validators: [],
    revalidate: false
  });
  const [inputValidation, setInputValidation] = useState({
    name: "",
    description: "",
    date: "",
    cost: "",
    regarding: "",
    items: [],
    payments: [],
    validators: [],
  });
  const [userOptions, setUserOptions] = useState([]);
  const [validatorOptions, setValidatorOptions] = useState([]);
  const [consumerOptions, setConsumerOptions] = useState([]);
  const [paymentMethodOptions, setPaymentMethodOptions] = useState([]);
  const [fieldsValid, setFieldsValid] = useState(false);
  const [item, setItem] = useState({
    name: "",
    price: "0,00",
    expense: "",
    consumers: [],
    create: true,
  });
  const [payment, setPayment] = useState({
    payer: "",
    payment_method: "",
    value: "0,00",
    expense: "",
    create: true,
  });
  const dispatch = useDispatch();
  const [value, setValue] = useState(0);
  const [saving, setSaving] = useState(false);
  const {user} = useOutletContext()

  const handleChangeName = (e) => {
    setInputStates({ ...inputStates, name: e.target.value });
  };

  const handleChangeDescription = (e) => {
    setInputStates({ ...inputStates, description: e.target.value });
  };

  const handleChangeDate = (value) => {
    console.log(value);
    setInputStates({ ...inputStates, date: dayjs(value.$d) });
  };

  const handleChangeCost = (e) => {
    setInputStates({ ...inputStates, cost: moneyMask(e.target.value) });
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleRevalidate = (e) => {
    setInputStates({...inputStates, revalidate:e.target.checked})
  }

  const handleChangeRegarding = (e, value) => {
    if (Object.keys(value).length > 0) {
      let regardingID = value.id;
      let selectedRegarding = regardingState.userRegardings.find(
        (item) => item.id == regardingID
      );
      console.log(selectedRegarding);
      if (selectedRegarding && Object.keys(selectedRegarding).length > 0) {
        let groupId = selectedRegarding.expense_group;
        console.log(selectedRegarding);
        let selectedGroup = groupState.userGroups.find(
          (item) => item.id == groupId
        );
        if (selectedGroup && Object.keys(selectedGroup).length > 0) {
          console.log(selectedGroup);
          let options = selectedGroup.members.map((item) => ({
            id: item.id,
            name: item.first_name + " " + item.last_name,
          }));
          setUserOptions(options);
          setValidatorOptions([...options, { id: 0, name: "Todos" }]);
          setConsumerOptions([...options, { id: 0, name: "Todos" }]);
        }
      }
    }
    setInputStates({ ...inputStates, regarding: value });
  };

  const handleChangeValidators = (e, value) => {
    console.log(value);
    let newValidators = [];
    if (value.length > 0) {
      if (value.some((item) => item.id == 0)) {
        newValidators = [...userOptions];
      } else {
        newValidators = [...value];
      }
    }
    let options = [...userOptions, { id: 0, name: "Todos" }];
    console.log(options);
    setInputStates({ ...inputStates, validators: newValidators });
    setValidatorOptions(
      options.filter((item) => !newValidators.includes(item))
    );
  };

  const handleAddItem = () => {
    setInputStates({ ...inputStates, items: [...inputStates.items, item] });
    setOpenModal(false);
    setItem({
      name: "",
      price: "0,00",
      expense: "",
      consumers: [],
      create: true,
      consumer_names: "",
    });
    let options = [...userOptions, { id: 0, name: "Todos" }];
    setConsumerOptions(options);
  };

  const handleDeleteItem = (instance) => {
    let newItems = [...inputStates.items];
    newItems = newItems.filter((item) => !(instance.id == item.id));
    setInputStates({ ...inputStates, items: newItems });
  };

  const handleAddPayment = () => {
    let lastId = 0;
    for (let { id } of inputStates.payments) {
      if (id >= lastId) {
        lastId = id + 1;
      }
    }
    let payer = userState.users.find((item) => item.id == payment.payer.id);
    console.log(payment);
    console.log(paymentMethodOptions);
    let newPayment = {
      id: lastId,
      ...payment,
      payment_status: "AWAITING",
      payment_method: paymentMethodOptions.find(
        (item) => item.id == payment.payment_method.id
      ),
      payer: payer,
      payer_name: payer.full_name,
    };
    if(['DEBIT', 'CASH'].includes(newPayment.payment_method.type)){
      newPayment.payment_status = 'PAID'
    } 
    console.log("new payment", newPayment);
    setInputStates({
      ...inputStates,
      payments: [...inputStates.payments, newPayment],
    });
    setOpenModal(false);
    setPayment({
      payer: "",
      payment_method: "",
      value: "0,00",
      expense: "",
    });
  };

  const handleDeletePayment = (instance) => {
    let newPayments = [...inputStates.payments];
    newPayments = newPayments.filter((item) => !(instance.id == item.id));
    setInputStates({ ...inputStates, payments: newPayments });
  };

  const handleChangeConsumers = (e, value) => {
    console.log(value);
    let newConsumers = [];
    if (value.some((item) => item.id == 0)) {
      newConsumers = [...userOptions];
    } else {
      newConsumers = [...value];
    }
    let lastId = 0;
    for (let { id } of inputStates.items) {
      if (id >= lastId) {
        lastId = id + 1;
      }
    }
    setItem({
      ...item,
      consumers: newConsumers,
      id: lastId,
      consumers_names: newConsumers.map(({ name }) => name).join(", "),
    });
    let options = [...userOptions, { id: 0, name: "Todos" }];
    setConsumerOptions(options.filter((item) => !newConsumers.includes(item)));
  };

  const handleChangePayer = (e, value) => {
    console.log(value);
    if (value) {
      let payer = userState.users.find((item) => item.id == value.id);
      console.log(payer);
      setPayment({
        payer: value,
        payment_method: "",
        value: "",
        expense: "",
      });
      if (payer.wallet) {
        setPaymentMethodOptions(
          payer.wallet.payment_methods.map((item) => ({
            name: item.type + " " + item.description,
            ...item,
          }))
        );
      } else {
        setPaymentMethodOptions([]);
      }
    }
  };

  const handleChangePaymentMethod = (e, value) => {
    setPayment({ ...payment, payment_method: value });
  };

  const handleSaveExpense = () => {
    setSaving(true);
    let data = {
      ...inputStates,
      date: `${inputStates.date.$y}-${(inputStates.date.$M + 1)
        .toString()
        .padStart(2, 0)}-${inputStates.date.$D.toString().padStart(2, 0)}`,
      regarding: inputStates.regarding.id,
      validators: []
    };
    console.log(data);
    editExpense(user.api_token, id, data).then(({ flag, data }) => {
      console.log(flag, data);
      if (flag) {
        let newExpense = {
          ...data,
          date: `${data.date.slice(8, 10)}-${data.date.slice(
            5,
            7
          )}-${data.date.slice(0, 4)}`,
        };
        setExpense({ ...inputStates, ...newExpense });
        loadRegardings(user.api_token).then((newRegardings) =>
          dispatch(setRegardings(newRegardings))
        );
        loadExpenses(user.api_token).then((newExpenses) =>
          dispatch(setExpenses(newExpenses))
        );
        loadValidations(user.api_token).then((json) => {
          dispatch(setValidations(json))
        })
        dispatch(
          addMessage({
            severity: "success",
            title: "Sucesso!",
            body: "Despesa editada com sucesso!",
          })
        );
        navigate(`/inicio/`);
      } else {
        dispatch(
          addMessage({
            severity: "error",
            title: "Erro!",
            body: "Tivemos problemas ao atualizar os dados. Tente novamente!",
          })
        );
      }
      loadActions("").then((json) => {
        dispatch(setActions(json));
      });
      setSaving(false);
    });
  };

  useEffect(() => {
    let index = expenseState.userExpenses.findIndex((item) => item.id == id);
    console.log(id, index, expenseState.userExpenses);
    if (index != -1) {
      let data = expenseState.userExpenses[index];
      console.log(data);
      let regarding = regardingState.userRegardings.find(
        (item) => item.id == data.regarding
      );
      if (regarding.is_closed) {
        dispatch(
          addMessage({
            severity: "error",
            title: "Erro!",
            body: "A referência dessa despesa está finalizada. Para editar, mude o status da referência!",
          })
        );
        navigate("/inicio/")
      }
      setExpense({ ...data });
      setInputStates({
        name: data.name,
        description: data.description,
        date: dayjs(
          `${data.date.slice(3, 5)}-${data.date.slice(0, 2)}-${data.date.slice(
            6,
            10
          )}`
        ),
        cost: data.cost,
        regarding: { id: regarding.id, label: regarding.name },
        items: data.items,
        payments: data.payments,
        validators: data.validations.map(({validator}) => ({id:validator.id, name:validator.full_name})),
        revalidate: false
      });
      let groupId = regarding.expense_group;
      let selectedGroup = groupState.userGroups.find(
        (item) => item.id == groupId
      );
      if (selectedGroup && Object.keys(selectedGroup).length > 0) {
        let options = selectedGroup.members.map((item) => ({
          id: item.id,
          name: item.first_name + " " + item.last_name,
        }));
        setUserOptions(options);
        setValidatorOptions([...options, { id: 0, name: "Todos" }]);
        setConsumerOptions([...options, { id: 0, name: "Todos" }]);
      }
    }
  }, []);

  useEffect(() => {
    console.log(inputStates);
    let expenseCost = parseFloat(
      inputStates.cost.replace(".", "").replace(",", ".")
    );
    let validations = {
      name: validateTextField(inputStates.name, true),
      description: validateTextField(inputStates.description),
      cost: validateCurrency(inputStates.cost),
      date: inputStates.date || null,
      regarding: inputStates.regarding || null,
      items:
        inputStates.items.length > 0 &&
        calculateTotalValueOfArray(
          inputStates.items.map(({ price }) => price)
        ) == expenseCost,
      payments:
        inputStates.payments.length > 0 &&
        calculateTotalValueOfArray(
          inputStates.payments.map(({ value }) => value)
        ) == expenseCost,
      validators: true,
    };
    setInputValidation(validations);
    console.log(validations);
    setFieldsValid(Object.values(validations).every((item) => item));
  }, [inputStates]);

  useEffect(() => {
    console.log(payment);
  }, [payment]);
  return (
    <div id="expenseEdit" className="grow">
      <AppBar position="sticky">
        <Toolbar>
          <BackButton />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Editar Despesa
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
                onClick={handleSaveExpense}
                disabled={!fieldsValid || saving}
              >
                Salvar
              </Button>
            </div>
          )}
        </Toolbar>
      </AppBar>
      <div className="w-screen">
        <div className="inputs w-[90%] mx-auto my-2">
          <TextField
            id="outlined-basic"
            label="Nome"
            variant="outlined"
            size="medium"
            error={!inputValidation.name ? true : false}
            helperText={!inputValidation.name ? "Não pode ser vazio" : ""}
            value={inputStates.name}
            onChange={handleChangeName}
            fullWidth
            sx={{ margin: "10px 0px" }}
            required
          />
          <TextField
            id="outlined-basic"
            label="Descrição"
            variant="outlined"
            multiline
            rows={3}
            error={!inputValidation.description ? true : false}
            helperText={
              !inputValidation.description ? "Não pode ser vazio" : ""
            }
            value={inputStates.description}
            onChange={handleChangeDescription}
            size="medium"
            fullWidth
            sx={{ margin: "10px 0px" }}
          />
          <DatePicker
            className="w-full"
            label="Data *"
            value={inputStates.date}
            onChange={(value) => handleChangeDate(value)}
            required
          />
          <TextField
            id="outlined-basic"
            label="Valor"
            variant="outlined"
            size="medium"
            fullWidth
            value={inputStates.cost}
            onChange={handleChangeCost}
            sx={{ margin: "10px 0px" }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">R$</InputAdornment>
              ),
            }}
            required
          />
          {/*<Autocomplete
            disablePortal
            id="combo-box-demo"
            options={regardingState.userRegardings
              .filter((item) => !item.is_closed)
              .map((item) => ({
                id: item.id,
                label: item.name,
              }))}
            renderInput={(params) => (
              <TextField {...params} label="Referência" required />
            )}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            size="medium"
            value={inputStates.regarding}
            onChange={handleChangeRegarding}
            sx={{ margin: "10px 0px" }}
            required
            />*/}
            <FormControlLabel required control={<Checkbox checked={inputStates.revalidate || false}
  onChange={handleRevalidate}
  inputProps={{ 'aria-label': 'controlled' }}/>} label="Revalidar despesa após alterações" />

          {/*<Autocomplete
            multiple
            id="tags-standard"
            options={validatorOptions}
            onChange={handleChangeValidators}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            getOptionLabel={(option) => option.name}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Validantes"
                placeholder="Selecione quem deve validar"
                variant="outlined"
              />
            )}
          />
          <IconButton
          color="primary"
          aria-label="upload picture"
          component="label"
          sx={{ margin: "10px 0px" }}
          className="w-full"
        >
          <input hidden accept="image/*" type="file" />
          <AttachmentIcon className="-rotate-45" />
          <Typography variant="p" component="span">
            Adicionar Arquivos
          </Typography>
        </IconButton>*/}
        </div>

        <Tabs
          value={value}
          onChange={handleChange}
          className="bg-[#e2e2e2] text-[#000]"
          textColor="inherit"
          indicatorColor="primary"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label="Items" />
          <Tab label="Pagamentos" />
        </Tabs>
        <TabPanel value={value} index={0} className="text-black">
          <div className="flex flex-row justify-between w-full items-center">
            <span className="font-bold text-xl">Lista de Items</span>
            <span className="rounded-[50%] bg-slate-300 align-middle">
              <IconButton onClick={() => setOpenModal(true)}>
                <AddIcon />
              </IconButton>
            </span>
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
                  Adicionar Item
                </Typography>
                <span className="text-sm">
                  Selecione a referência para ver as opções
                </span>

                <TextField
                  id="outlined-basic"
                  label="Nome"
                  variant="outlined"
                  size="medium"
                  value={item.name}
                  onChange={(e) => setItem({ ...item, name: e.target.value })}
                  fullWidth
                  sx={{ margin: "10px 0px" }}
                  required
                />
                <TextField
                  id="outlined-basic"
                  label="Preço"
                  value={item.price}
                  onChange={(e) =>
                    setItem({ ...item, price: moneyMask(e.target.value) })
                  }
                  variant="outlined"
                  size="medium"
                  fullWidth
                  sx={{ margin: "10px 0px" }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">R$</InputAdornment>
                    ),
                  }}
                  required
                />
                <Autocomplete
                  multiple
                  id="tags-standard"
                  options={consumerOptions}
                  onChange={handleChangeConsumers}
                  isOptionEqualToValue={(option, value) =>
                    option.id === value.id
                  }
                  getOptionLabel={(option) => option.name}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Consumidores"
                      placeholder="Selecione os consumidores do item"
                      variant="outlined"
                    />
                  )}
                  required
                />
                <Box className="flex flex-row justify-between mt-[10px]">
                  <Button
                    variant="outlined"
                    onClick={() => setOpenModal(false)}
                  >
                    Cancelar
                  </Button>
                  <Button
                    variant="contained"
                    onClick={handleAddItem}
                    disabled={
                      item.name && item.price && item.consumers.length > 0
                        ? false
                        : true
                    }
                  >
                    Adicionar
                  </Button>
                </Box>
              </>
            }
          />

          {"items" in inputStates && inputStates.items.length > 0 ? (
            <>
              {inputValidation.items ? (
                ""
              ) : (
                <span className="text-[red] text-sm">
                  A soma dos itens deve ser igual ao valor da despesa
                </span>
              )}
              <List>
                {inputStates.items.map((item) => (
                  <Item
                    key={item.id}
                    item={item}
                    edit={true}
                    onDelete={handleDeleteItem}
                  />
                ))}
              </List>
            </>
          ) : (
            <NoData message="Nenhum item adicionado" />
          )}
        </TabPanel>
        <TabPanel value={value} index={1}>
          <div className="flex flex-row justify-between w-full items-center">
            <span className="font-bold text-xl">Lista de Pagamentos</span>
            <span className="rounded-[50%] bg-slate-300 align-middle">
              <IconButton onClick={() => setOpenModal(true)}>
                <AddIcon />
              </IconButton>
            </span>
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
                  Adicionar Pagamento
                </Typography>
                <span className="text-sm">
                  Selecione a referência para ver as opções
                </span>
                <Autocomplete
                  id="tags-standard"
                  options={userOptions.map((item) => ({
                    id: item.id,
                    label: item.name,
                  }))}
                  value={payment.payer}
                  onChange={handleChangePayer}
                  sx={{ margin: "10px 0px" }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Pagador"
                      placeholder="Selecione o pagador dessa despesa"
                      variant="outlined"
                    />
                  )}
                />

                <Autocomplete
                  id="tags-standard"
                  options={paymentMethodOptions.map((item) => ({
                    id: item.id,
                    label: item.name,
                  }))}
                  value={payment.payment_method}
                  onChange={handleChangePaymentMethod}
                  sx={{ margin: "10px 0px" }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Método de Pagamento"
                      placeholder="Selecione o método de pagamento"
                      variant="outlined"
                    />
                  )}
                />
                <TextField
                  id="outlined-basic"
                  label="Preço"
                  value={payment.value}
                  onChange={(e) =>
                    setPayment({ ...payment, value: moneyMask(e.target.value) })
                  }
                  variant="outlined"
                  size="medium"
                  fullWidth
                  sx={{ margin: "10px 0px" }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">R$</InputAdornment>
                    ),
                  }}
                />

                <Box className="flex flex-row justify-between mt-[10px]">
                  <Button
                    variant="outlined"
                    onClick={() => setOpenModal(false)}
                  >
                    Cancelar
                  </Button>
                  <Button
                    variant="contained"
                    onClick={handleAddPayment}
                    disabled={
                      payment.payer && payment.payment_method && payment.value
                        ? false
                        : true
                    }
                  >
                    Adicionar
                  </Button>
                </Box>
              </>
            }
          />
          {"payments" in inputStates && inputStates.payments.length > 0 ? (
            <>
              {inputValidation.payments ? (
                ""
              ) : (
                <span className="text-[red] text-sm">
                  A soma dos pagamentos deve ser igual ao valor da despesa
                </span>
              )}
              <List>
                {inputStates.payments.map((item) => (
                  <PaymentItem
                    key={item.id}
                    payment={item}
                    edit={true}
                    onDelete={handleDeletePayment}
                  />
                ))}
              </List>
            </>
          ) : (
            <NoData message="Nenhum item adicionado" />
          )}
        </TabPanel>
      </div>
    </div>
  );
}

export default ExpenseEdit;
