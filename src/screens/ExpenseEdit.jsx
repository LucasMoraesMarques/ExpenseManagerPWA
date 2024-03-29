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
import { createExpense, editExpense } from "../services/expenses";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import PaymentItem from "../components/PaymentItem";
import {
  validateTextField,
  validateCurrency,
  moneyMask,
  calculateTotalValueOfArray,
} from "../services/utils";
import NoData from "../components/NoData";
import { addMessage } from "../redux/slices/messageSlice";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { useOutletContext } from "react-router-dom";
import { setReload } from "../redux/slices/configSlice";
import SwipeableViews from "react-swipeable-views";
import ConfirmationModal from "../components/ConfirmationModal";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import CollectionsIcon from "@mui/icons-material/Collections";
import Camera from "../components/Camera";
import Gallery from "../components/Gallery";
import { CircularProgress } from "@mui/material";

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
  const [openConfirmationModal, setOpenConfirmationModal] = useState(false);
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
    revalidate: false,
    gallery: null,
    validation_status: "",
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
  const [fieldsChanged, setFieldsChanged] = useState(false);
  const [item, setItem] = useState({
    name: "",
    price: "0,00",
    expense: "",
    consumers: [],
  });
  const [payment, setPayment] = useState({
    payer: null,
    payment_method: null,
    value: "0,00",
    expense: "",
    create: true,
  });
  const dispatch = useDispatch();
  const [value, setValue] = useState(0);
  const [saving, setSaving] = useState(false);
  const [itemEdition, setItemEdition] = useState(false);
  const [paymentEdition, setPaymentEdition] = useState(false);
  const [openCamera, setOpenCamera] = useState(false);
  const { user } = useOutletContext();
  const [fileInput, setFiletInput] = useState(false);

  const handleChangeName = (e) => {
    setInputStates({ ...inputStates, name: e.target.value });
    setFieldsChanged(true);
  };

  const handleChangeDescription = (e) => {
    setInputStates({ ...inputStates, description: e.target.value });
    setFieldsChanged(true);
  };

  const handleChangeDate = (value) => {
    setInputStates({ ...inputStates, date: dayjs(value.$d) });
    setFieldsChanged(true);
  };

  const handleChangeCost = (e) => {
    setInputStates({ ...inputStates, cost: moneyMask(e.target.value) });
    setFieldsChanged(true);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  const handleRevalidate = (e) => {
    setInputStates({ ...inputStates, revalidate: e.target.checked });
    setFieldsChanged(true);
  };

  const handleChangeRegarding = (e, value) => {
    if (Object.keys(value).length > 0) {
      let regardingID = value.id;
      let selectedRegarding = regardingState.userRegardings.find(
        (item) => item.id == regardingID
      );
      if (selectedRegarding && Object.keys(selectedRegarding).length > 0) {
        let groupId = selectedRegarding.expense_group;
        let selectedGroup = groupState.userGroups.find(
          (item) => item.id == groupId
        );
        if (selectedGroup && Object.keys(selectedGroup).length > 0) {
          let options = selectedGroup.members.map((item) => ({
            id: item.id,
            name: item.first_name + " " + item.last_name,
          }));
          setUserOptions(options);
          setValidatorOptions([
            ...options.filter((item) => item.id != user.id),
            { id: 0, name: "Todos" },
          ]);
          setConsumerOptions([...options, { id: 0, name: "Todos" }]);
        }
      }
    }
    setInputStates({ ...inputStates, regarding: value });
    setFieldsChanged(true);
  };

  const handleChangeValidators = (e, value) => {
    let newValidators = [];
    if (value.length > 0) {
      if (value.some((item) => item.id == 0)) {
        newValidators = [...userOptions];
      } else {
        newValidators = [...value];
      }
    }
    setInputStates({ ...inputStates, validators: newValidators });
    setFieldsChanged(true);
  };

  const handleAddItem = () => {
    let newItem = {
      ...item,
    };
    let newItems = [...inputStates.items];
    let lastId = 0;
    console.log(newItem, item, newItems);
    let itemIndex = inputStates.items.findIndex(
      (item) => item.id == newItem.id
    );
    if (itemIndex == -1) {
      for (let { id } of inputStates.items) {
        if (id >= lastId) {
          lastId = id + 1;
        }
      }
      newItem.id = lastId;
      newItem.create = true;
      newItems.push(newItem);
    } else {
      newItems[itemIndex] = { ...newItem };
      if ("created_at" in newItem) {
        newItems[itemIndex].edited = true;
      }
      console.log(itemIndex, inputStates.items);
    }
    setInputStates({ ...inputStates, items: newItems });
    setOpenModal(false);
    setItem({
      name: "",
      price: "0,00",
      expense: "",
      consumers: [],
      consumer_names: "",
    });
    let options = [...userOptions, { id: 0, name: "Todos" }];
    setConsumerOptions(options);
    setFieldsChanged(true);
    setItemEdition(false);
  };

  const handleDeleteItem = (instance) => {
    let newItems = [...inputStates.items];
    newItems = newItems.filter((item) => !(instance.id == item.id));
    setInputStates({ ...inputStates, items: newItems });
    setFieldsChanged(true);
  };

  const handleClickItem = (item) => {
    setItem(item);
    setOpenModal(true);
    setItemEdition(true);
  };

  const handleClickPayment = (payment) => {
    console.log(payment);
    let newPayment = {
      ...payment,
      payer: { id: payment.payer.id, name: payment.payer_name },
      payment_method: paymentMethodOptions.find(
        (item) => item.id == payment.payment_method.id
      ),
    };
    setPayment(newPayment);
    setOpenModal(true);
    setPaymentEdition(true);
  };

  const handleAddPayment = () => {
    let payer = userState.users.find((item) => item.id == payment.payer.id);
    let newPayments = [...inputStates.payments];
    let lastId = 0;
    let paymentIndex = inputStates.payments.findIndex(
      (item) => item.id == payment.id
    );
    if (paymentIndex == -1) {
      for (let { id } of inputStates.payments) {
        if (id >= lastId) {
          lastId = id + 1;
        }
      }
      let newPayment = {
        id: lastId,
        ...payment,
        payment_status: "VALIDATION",
        payment_method: payer.wallet.payment_methods.find(
          (item) => item.id == payment.payment_method.id
        ),
        payer: payer,
        payer_name: payer.full_name,
        create: true,
      };    
      newPayments.push(newPayment);
    } else {
      let newPayment = {
        ...newPayments[paymentIndex],
        payment_method: payer.wallet.payment_methods.find(
          (item) => item.id == payment.payment_method.id
        ),
        value: payment.value,
        payment_status: "VALIDATION",
      };
      newPayments[paymentIndex] = { ...newPayment };
      if ("created_at" in newPayment) {
        newPayments[paymentIndex].edited = true;
      }
    }
    setInputStates({ ...inputStates, payments: newPayments });
    setOpenModal(false);
    setPayment({
      payer: { id: payer.id, name: payer.full_name },
      payment_method: null,
      value: "0,00",
      expense: "",
    });
    setPaymentMethodOptions(
      payer.wallet.payment_methods.map((item) => ({
        name: item.type + " " + item.description,
        id: item.id,
      }))
    );
    setFieldsChanged(true);
    setPaymentEdition(false);
  };

  const handleDeletePayment = (instance) => {
    let newPayments = [...inputStates.payments];
    newPayments = newPayments.filter((item) => !(instance.id == item.id));
    setInputStates({ ...inputStates, payments: newPayments });
    setFieldsChanged(true);
  };

  const handleChangeConsumers = (e, value) => {
    let newConsumers = [];
    if (value.some((item) => item.id == 0)) {
      newConsumers = [...userOptions];
    } else {
      newConsumers = [...value];
    }
    setItem({
      ...item,
      consumers: newConsumers,
      consumers_names: newConsumers.map(({ name }) => name).join(", "),
    });
    setFieldsChanged(true);
  };

  const handleChangePayer = (e, value) => {
    if (value) {
      let payer = userState.users.find((item) => item.id == value.id);
      setPayment({
        payer: { id: payer.id, name: payer.full_name },
        payment_method: null,
        value: "0,00",
        expense: "",
      });
      if (payer.wallet) {
        setPaymentMethodOptions(
          payer.wallet.payment_methods.map((item) => ({
            name: item.type + " " + item.description,
            id: item.id,
          }))
        );
      } else {
        setPaymentMethodOptions([]);
      }
    }
    setFieldsChanged(true);
  };

  const handleChangePaymentMethod = (e, value) => {
    setPayment({ ...payment, payment_method: value });
  };

  const updatePaymentsStatus = () => {
    let expenseAwaitingValidation = id ? (expense.validation_status != "Validada" || inputStates.revalidate) : inputStates.validators.length != 0
    let newPayments = [...inputStates.payments]
    for(let paymentIndex in newPayments){
      let newPayment = {...newPayments[paymentIndex]}
      if(expenseAwaitingValidation){
        newPayment.payment_status = "VALIDATION"
      }else {
        if (["DEBIT", "CASH"].includes(newPayment.payment_method.type)) {
          newPayment.payment_status = "PAID";
        } else {
          newPayment.payment_status = "AWAITING";
        }
      }
      newPayments[paymentIndex] = newPayment
    }
    setInputStates({...inputStates, payments: newPayments})
  }

  const handleSaveExpense = () => {
    window.onpopstate = {};
    window.onbeforeunload = {};
    setSaving(true);
    let data = {
      ...inputStates,
      date: `${inputStates.date.$y}-${(inputStates.date.$M + 1)
        .toString()
        .padStart(2, 0)}-${inputStates.date.$D.toString().padStart(2, 0)}`,
      regarding: inputStates.regarding.id,
      cost: inputStates.cost.replace(".", "").replace(",", "."),
      gallery: inputStates.gallery,
    };
    if (id) {
      editExpense(user.api_token, id, data).then(({ flag, data }) => {
        if (flag) {
          dispatch(
            addMessage({
              severity: "success",
              title: "Sucesso!",
              body: "Despesa editada com sucesso!",
            })
          );
          navigate(`/inicio/`);
          dispatch(setReload(true));
        } else {
          dispatch(
            addMessage({
              severity: "error",
              title: "Erro!",
              body: "Tivemos problemas ao atualizar os dados. Tente novamente!",
            })
          );
        }
        setSaving(false);
      });
    } else {
      setSaving(true);
      data.created_by = user.id;
      createExpense(user.api_token, data).then(({ flag, data }) => {
        if (flag) {
          dispatch(
            addMessage({
              severity: "success",
              title: "Sucesso!",
              body: "Despesa adicionada com sucesso!",
            })
          );
          navigate("/inicio");
          dispatch(setReload(true));
        } else {
          dispatch(
            addMessage({
              severity: "error",
              title: "Erro!",
              body: "Tivemos problemas ao criar a despesa. Tente novamente!",
            })
          );
        }
        setSaving(false);
      });
    }
  };

  useEffect(() => {
    let index = expenseState.userExpenses.findIndex((item) => item.id == id);
    if (index != -1) {
      let data = expenseState.userExpenses[index];
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
        navigate("/inicio/");
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
        validators: data.validations.map(({ validator }) => ({
          id: validator.id,
          name: validator.full_name,
        })),
        revalidate: false,
        gallery: data.gallery,
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
        setValidatorOptions([
          ...options.filter((item) => item.id != user.id),
          { id: 0, name: "Todos" },
        ]);
        setConsumerOptions([...options, { id: 0, name: "Todos" }]);
        let payer = userState.users.find(
          (item) => item.id == data.payments[0].payer.id
        );
        setPayment({
          payer: { id: payer.id, name: payer.full_name },
          payment_method: null,
          value: "0,00",
          expense: "",
        });
        setPaymentMethodOptions(
          payer.wallet.payment_methods.map((item) => ({
            name: item.type + " " + item.description,
            id: item.id,
          }))
        );
      }
    }
  }, []);

  useEffect(() => {
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
    setFieldsValid(Object.values(validations).every((item) => item));
  }, [inputStates]);

  const handleLeaveForm = () => {
    if (fieldsChanged) {
      setOpenConfirmationModal(true);
    } else {
      window.history.back();
    }
  };

  const leaveWithoutSaving = () => {
    window.onpopstate = {};
    window.onbeforeunload = {};
    navigate(`/inicio`);
  };

  const handleDismissModal = () => {
    setOpenModal(false);
    setItemEdition(false);
    setPaymentEdition(false);
    setItem({
      name: "",
      price: "0,00",
      expense: "",
      consumers: [],
      consumer_names: "",
    });
    let payer = userState.users.find(
      (item) => item.id == inputStates.payments[0].payer.id
    );
    setPayment({
      payer: { id: payer.id, name: payer.full_name },
      payment_method: null,
      value: "0,00",
      expense: "",
    });
  };

  useEffect(() => {
    if (fieldsChanged) {
      window.history.pushState(null, null, window.location.href);
      window.onpopstate = function (event) {
        window.history.go(1);
        setOpenConfirmationModal(true);
      };
      window.onbeforeunload = () => false;
    }
  }, [fieldsChanged]);

  const testCamera = () => {
    setOpenCamera(true);
  };

  const savePhotoToGallery = (photoSrc) => {
    let lastId = 0;
    let newGallery = { photos: [] };
    console.log(inputStates.gallery);

    if (inputStates.gallery && inputStates.gallery.photos.length > 0) {
      for (let { id } of inputStates.gallery.photos) {
        if (id >= lastId) {
          lastId = id + 1;
        }
      }
      newGallery = { ...inputStates.gallery };
    }

    let newPhoto = { id: lastId, src: photoSrc, create: true };
    console.log(newGallery);
    newGallery.photos = [...newGallery.photos, newPhoto];
    setInputStates({ ...inputStates, gallery: newGallery });
    setFieldsChanged(true);
  };

  const deleteGalleryPhoto = (imageId) => {
    let newGallery = { ...inputStates.gallery };
    console.log(imageId);
    newGallery.photos = newGallery.photos.filter(
      (photo) => !(photo.id == imageId)
    );
    setInputStates({ ...inputStates, gallery: newGallery });
    setFieldsChanged(true);
  };

  function getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }

  const handleChangeFileInput = async (e) => {
    getBase64(e.target.files[0]).then((data) => savePhotoToGallery(data));
    setFiletInput(value);
  };

  useEffect(() => {
    if(fieldsChanged){
      updatePaymentsStatus()
    }
  }, [inputStates.validators, inputStates.revalidate, inputStates.payments])

  return (
    <div id="expenseEdit" className="grow">
      <AppBar position="sticky">
        <Toolbar>
          <BackButton callback={handleLeaveForm} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {id ? "Editar Despesa" : "Adicionar Despesa"}
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
                disabled={!fieldsValid || saving || !fieldsChanged}
              >
                {saving ? (
                  <CircularProgress sx={{ color: "white" }} size={20} />
                ) : (
                  "Salvar"
                )}
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
            sx={{ margin: "10px 0px" }}
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
          {id ? (
            <FormControlLabel
              required
              control={
                <Checkbox
                  checked={inputStates.revalidate || false}
                  onChange={handleRevalidate}
                  inputProps={{ "aria-label": "controlled" }}
                />
              }
              label="Revalidar despesa após alterações"
            />
          ) : (
            <>
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={regardingState.userRegardings
                  .filter((item) => !item.is_closed)
                  .map((item) => ({
                    id: item.id,
                    label: item.name,
                  }))}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Referência"
                    required
                    sx={{ margin: "10px 0px" }}
                  />
                )}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                size="medium"
                value={inputStates.regarding}
                onChange={handleChangeRegarding}
              />
              <Autocomplete
                multiple
                id="tags-standard"
                options={validatorOptions}
                value={inputStates.validators}
                onChange={handleChangeValidators}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                getOptionLabel={(option) => option.name}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Validantes"
                    placeholder="Selecione quem deve validar"
                    variant="outlined"
                    sx={{ margin: "10px 0px" }}
                  />
                )}
              />
            </>
          )}
          {/*<Camera
            opened={openCamera}
            onClose={() => {
              setOpenCamera(false);
            }}
            onCapture={savePhotoToGallery}
          />*/}
          {inputStates.gallery &&
          "photos" in inputStates.gallery &&
          inputStates.gallery.photos.length > 0 ? (
            <Gallery
              gallery={inputStates.gallery.photos}
              onDelete={deleteGalleryPhoto}
              edit={true}
            />
          ) : (
            ""
          )}
          <div className="flex flex-row justify-center">
            {/*<IconButton
              color="primary"
              aria-label="take picture"
              component="label"
              sx={{ margin: "10px 0px" }}
              onClick={testCamera}
            >
              <CameraAltIcon />
          </IconButton>*/}
            <IconButton
              color="primary"
              aria-label="upload picture"
              component="label"
              sx={{ margin: "10px 0px" }}
            >
              <input
                id="fileInput"
                hidden
                accept="image/*"
                type="file"
                onChange={handleChangeFileInput}
              />
              <CollectionsIcon />
            </IconButton>
          </div>
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
        <SwipeableViews index={value} onChangeIndex={handleChangeIndex}>
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
                    {itemEdition ? "Editar Item" : "Adicionar Item"}
                  </Typography>
                  <span className="text-sm">
                    Selecione a referência para ver as opções de contribuintes
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
                    value={item.consumers}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Contribuintes"
                        placeholder="Selecione os contribuintes do item"
                        variant="outlined"
                        helperText="Adicione todos que compartilham esse item"
                      />
                    )}
                    required
                  />
                  <Box className="flex flex-row justify-between mt-[10px]">
                    <Button variant="outlined" onClick={handleDismissModal}>
                      Cancelar
                    </Button>
                    <Button
                      variant="contained"
                      onClick={handleAddItem}
                      disabled={
                        item.name &&
                        item.price != "0,00" &&
                        item.consumers.length > 0
                          ? false
                          : true
                      }
                    >
                      {itemEdition ? "Alterar" : "Adicionar"}
                    </Button>
                  </Box>
                </>
              }
            />
            {inputValidation.items ? (
              ""
            ) : (
              <span className="text-[red] text-sm">
                A soma dos itens deve ser igual ao valor da despesa
              </span>
            )}
            {"items" in inputStates && inputStates.items.length > 0 ? (
              <>
                <List>
                  {inputStates.items.map((item) => (
                    <Item
                      key={item.id}
                      item={item}
                      edit={true}
                      onDelete={handleDeleteItem}
                      onClick={() => handleClickItem(item)}
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
                    {paymentEdition
                      ? "Editar Pagamento"
                      : "Adicionar Pagamento"}
                  </Typography>
                  <span className="text-sm">
                    Selecione a referência para ver as opções de pagador
                  </span>
                  <Autocomplete
                    id="tags-standard"
                    options={userOptions}
                    isOptionEqualToValue={(option, value) =>
                      option.id === value.id
                    }
                    getOptionLabel={(option) => option.name}
                    value={payment.payer}
                    onChange={handleChangePayer}
                    disabled={inputStates.payments.length != 0}
                    sx={{ margin: "10px 0px" }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Pagador"
                        placeholder="Selecione o pagador dessa despesa"
                        variant="outlined"
                        helperText={
                          inputStates.payments.length != 0
                            ? "Múltiplos pagamentos são restritos a um mesmo pagador"
                            : ""
                        }
                      />
                    )}
                  />

                  <Autocomplete
                    id="tags-standard"
                    options={paymentMethodOptions}
                    isOptionEqualToValue={(option, value) =>
                      option.id === value.id
                    }
                    getOptionLabel={(option) => option.name}
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
                      setPayment({
                        ...payment,
                        value: moneyMask(e.target.value),
                      })
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
                    <Button variant="outlined" onClick={handleDismissModal}>
                      Cancelar
                    </Button>
                    <Button
                      variant="contained"
                      onClick={handleAddPayment}
                      disabled={
                        payment.payer &&
                        payment.payment_method &&
                        payment.value != "0,00"
                          ? false
                          : true
                      }
                    >
                      {paymentEdition ? "Alterar" : "Adicionar"}
                    </Button>
                  </Box>
                </>
              }
            />
            {inputValidation.payments ? (
              ""
            ) : (
              <span className="text-[red] text-sm">
                A soma dos pagamentos deve ser igual ao valor da despesa
              </span>
            )}
            {"payments" in inputStates && inputStates.payments.length > 0 ? (
              <>
                <List>
                  {inputStates.payments.map((item) => (
                    <PaymentItem
                      key={item.id}
                      payment={item}
                      edit={true}
                      onDelete={handleDeletePayment}
                      onClick={() => handleClickPayment(item)}
                    />
                  ))}
                </List>
              </>
            ) : (
              <NoData message="Nenhum pagamento adicionado" />
            )}
          </TabPanel>
        </SwipeableViews>
      </div>
      <CustomModal
        open={openConfirmationModal}
        onClose={() => setOpenConfirmationModal(false)}
        children={
          <ConfirmationModal
            onCancel={() => setOpenConfirmationModal(false)}
            onConfirm={() => leaveWithoutSaving()}
            title="Confirmação de ação"
            message="Você deseja sair sem salvar as modificações?"
          />
        }
      />
    </div>
  );
}

export default ExpenseEdit;
