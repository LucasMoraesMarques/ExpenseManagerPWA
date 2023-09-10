import React from "react";
import IconButton from "@mui/material/IconButton";
import { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import InputAdornment from "@mui/material/InputAdornment";
import List from "@mui/material/List";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import ExpenseItem from "../components/ExpenseItem";
import CustomModal from "../components/CustomModal";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import CloseIcon from "@mui/icons-material/Close";
import NoData from "../components/NoData";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import { deleteExpenses } from "../services/expenses";
import { setExpenses } from "../redux/slices/expenseSlice";
import ConfirmationModal from "../components/ConfirmationModal";
import { addMessage } from "../redux/slices/messageSlice";
import { useOutletContext } from "react-router-dom";
import dayjs from "dayjs";
import { dateInRange, moneyMask, priceInRange } from "../services/utils";
import { Badge } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import { setReload } from "../redux/slices/configSlice";

const allPaymentStatus = [
  { name: "Em validação", id: 1 },
  { name: "Aguardando", id: 2 },
  { name: "Pago", id: 3 },
  { name: "Vencido", id: 4 },
];

const allValidationStatus = [
  { name: "Pendente", id: 1 },
  { name: "Validada", id: 2 },
  { name: "Rejeitada", id: 3 },
];

function ExpenseList({
  regarding = null,
  showRegardingName = true,
  showDeleteIcon = true,
}) {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const [openConfirmationModal, setOpenConfirmationModal] = useState(false);
  const dispatch = useDispatch();
  const expenseState = useSelector((state) => state.expense);
  const regardingState = useSelector((state) => state.regarding);
  const groupState = useSelector((state) => state.group);
  const userState = useSelector((state) => state.user);
  const [filteredExpenses, setFilteredExpenses] = useState([]);
  const [search, setSearch] = useState("");
  const [edit, setEdit] = useState(false);
  const [deleteIds, setDeleteIds] = useState([]);
  const { user } = useOutletContext();
  const [filterStates, setFilterStates] = useState({
    groups: [{ id: 0, name: "Todos" }],
    regardings: [{ id: 0, name: "Todas" }],
    startDate: "",
    endDate: "",
    startPrice: "",
    endPrice: "",
    paymentStatus: "",
    validationStatus: "",
    payers: [{ id: 0, name: "Todos" }],
  });
  const [groupOptions, setGroupOptions] = useState([]);
  const [regardingsOptions, setRegardingsOptions] = useState([]);
  const [paymentStatusOptions, setPaymentStatusOptions] = useState([]);
  const [validationStatusOptions, setValidationStatusOptions] = useState([]);
  const [payersOptions, setPayersOptions] = useState([]);
  const [filtersValid, setFiltersValid] = useState(false);
  const [fieldsValidation, setFieldsValidation] = useState({
    startDate: true,
    endDate: true,
    startPrice: true,
    endPrice: true,
  });
  const [filtersFilled, setFiltersFilled] = useState(false);
  const [page, setPage] = useState(1);
  const [sliceRange, setSliceRange] = useState({ start: 0, end: 50 });

  const handleChangeSearch = (value) => {
    setSearch(value);
  };

  const handleChangeGroups = (e, value) => {
    let newGroups = [];
    let allUserGroups = groupState.userGroups.map((item) => ({
      id: item.id,
      name: item.name,
    }));
    if (value.length > 0) {
      if (value.some((item) => item.id == 0)) {
        newGroups = [...allUserGroups];
      } else {
        newGroups = [...value];
      }
    }
    let groupsIds = newGroups.map((item) => item.id);

    let options = [...allUserGroups];
    if (!(newGroups.length == allUserGroups.length)) {
      options.push({ id: 0, name: "Todos" });
    }
    let regardingsInGroups = regardingState.userRegardings.filter((item) => {
      return groupsIds.includes(item.expense_group);
    });
    let regardings = regardingsInGroups.map((item) => ({
      id: item.id,
      name: item.name,
    }));
    regardings.push({ id: 0, name: "Todas" });
    setFilterStates({ ...filterStates, groups: newGroups });
    setGroupOptions(options.filter((item) => !newGroups.includes(item)));
    setRegardingsOptions(regardings);
  };

  const handleChangeRegardings = (e, value) => {
    let newRegardings = [];
    let groupsIds = filterStates.groups.map((item) => item.id);
    if (filterStates.groups.some((item) => item.id == 0)) {
      groupsIds = groupState.userGroups.map((item) => item.id);
    }
    let regardingsInGroups = regardingState.userRegardings.filter((item) => {
      return groupsIds.includes(item.expense_group);
    });
    let regardings = regardingsInGroups.map((item) => ({
      id: item.id,
      name: item.name,
    }));
      if (value.some((item) => item.id == 0)) {
        newRegardings = [...regardings];
      } else {
        newRegardings = [...value];
      }
    let options = [...regardings];
    if (!(newRegardings.length == regardings.length)) {
      options.push({ id: 0, name: "Todas" });
    }
    setFilterStates({ ...filterStates, regardings: newRegardings });
    setRegardingsOptions(
      options.filter((item) => !newRegardings.includes(item))
    );
  };

  const handleChangeDate = (value, type) => {
    if (type == "start") {
      setFilterStates({ ...filterStates, startDate: dayjs(value.$d) });
    } else if (type == "end") {
      setFilterStates({ ...filterStates, endDate: dayjs(value.$d) });
    }
  };

  const handleChangePaymentStatus = (e, value) => {
    if (value) {
      let options = [...allPaymentStatus, { id: 0, name: "Todos" }];
      setFilterStates({ ...filterStates, paymentStatus: value });
      setPaymentStatusOptions(options.filter((item) => item.id != value.id));
    }
  };

  const handleChangeValidationStatus = (e, value) => {
    if (value) {
      let options = [...allValidationStatus, { id: 0, name: "Todos" }];
      setFilterStates({ ...filterStates, validationStatus: value });
      setValidationStatusOptions(options.filter((item) => item.id != value.id));
    }
  };

  const filterExpenseDateInRange = (expense) => {
    let { date } = expense;
    date = dayjs(
      `${date.slice(3, 5)}-${date.slice(0, 2)}-${date.slice(6, 10)}`
    );
    let range = [filterStates.startDate.$d, filterStates.endDate.$d];
    return dateInRange(date.$d, ...range);
  };

  const filterExpensePriceInRange = (expense) => {
    let { cost } = expense;
    cost = parseFloat(cost.replace(".", "").replace(",", "."));
    let start = parseFloat(
      filterStates.startPrice.replace(".", "").replace(",", ".")
    );
    let end = parseFloat(
      filterStates.endPrice.replace(".", "").replace(",", ".")
    );
    let range = [start, end];
    return priceInRange(cost, ...range);
  };

  const applyFilters = (flag = true) => {
    let newExpenses = [...expenseState.userExpenses];

    if (flag) {
      if (
        filterStates.paymentStatus &&
        filterStates.paymentStatus.name != "Todos"
      ) {
        let value = filterStates.paymentStatus.name;
        newExpenses = newExpenses.filter(
          (expense) =>
            expense.payment_status.toUpperCase() == value.toUpperCase()
        );
      }
      if (
        filterStates.validationStatus &&
        filterStates.validationStatus.name != "Todos"
      ) {
        let value = filterStates.validationStatus.name;
        newExpenses = newExpenses.filter(
          (expense) =>
            expense.validation_status.toUpperCase() == value.toUpperCase()
        );
      }
      if (filterStates.groups.length > 0) {
        let groupsIds = filterStates.groups
          .map((group) => group.id)
          .filter((item) => item != 0);
        if (groupsIds.length > 0) {
          newExpenses = newExpenses.filter((expense) =>
            groupsIds.includes(expense.expense_group)
          );
        }
      }
      if (filterStates.regardings.length > 0) {
        let regardingsIds = filterStates.regardings
          .map((regarding) => regarding.id)
          .filter((item) => item != 0);
        if (regardingsIds.length > 0) {
          newExpenses = newExpenses.filter((expense) =>
            regardingsIds.includes(expense.regarding)
          );
        }
      }
      if (filterStates.payers.length > 0) {
        let payersIds = filterStates.payers
          .map((payer) => payer.id)
          .filter((item) => item != 0);
        if (payersIds.length > 0) {
          newExpenses = newExpenses.filter((expense) => {
            let payers = expense.payments.map((payment) => payment.payer.id);
            for (let payer of payers) {
              if (!payersIds.includes(payer)) {
                return false;
              }
            }
            return true;
          });
        }
      }
      if (filterStates.startDate && filterStates.endDate) {
        newExpenses = newExpenses.filter((expense) =>
          filterExpenseDateInRange(expense)
        );
      }
      if (
        filterStates.startPrice &&
        filterStates.endPrice &&
        filterStates.endPrice != "0,00"
      ) {
        newExpenses = newExpenses.filter((expense) =>
          filterExpensePriceInRange(expense)
        );
      }
      newExpenses = newExpenses.filter(
        (regarding) => regarding.has_expenses == filterStates.hasExpenses
      );
    }
    newExpenses = filterBySearch(search, newExpenses);
    setFilteredExpenses([...newExpenses]);
    handlePagination(null, 1);
  };

  const getMembersOfGroups = (groups) => {
    let groupsIds = groups.map((group) => group.id).filter((item) => item != 0);
    let newGroups = groupState.userGroups.filter((group) =>
      groupsIds.includes(group.id)
    );
    let membersIds = [];
    newGroups.map((group) =>
      membersIds.push(...group.members.map((member) => member.id))
    );
    let members = userState.users.filter((user) =>
      membersIds.includes(user.id)
    );
    return members;
  };

  const handleChangePayers = (e, value) => {
    let newPayers = [];
    let members = [];
    if (filterStates.groups.filter((group) => group.id == 0).length > 0) {
      members = getMembersOfGroups(groupState.userGroups);
    } else {
      members = getMembersOfGroups(filterStates.groups);
    }
    let allGroupsMembers = members.map((item) => ({
      id: item.id,
      name: item.full_name,
    }));
    if (value.length > 0) {
      if (value.some((item) => item.id == 0)) {
        newPayers = [...allGroupsMembers];
      } else {
        newPayers = [...value];
      }
    }

    let options = [...allGroupsMembers];
    if (!(newPayers.length == allGroupsMembers.length)) {
      options.push({ id: 0, name: "Todos" });
    }

    setFilterStates({ ...filterStates, payers: newPayers });
    setPayersOptions(options.filter((item) => !newPayers.includes(item)));
  };

  const resetOptions = () => {
    let groups = groupState.userGroups.map((item) => ({
      id: item.id,
      name: item.name,
    }));
    let regardings = regardingState.userRegardings.map((item) => ({
      id: item.id,
      name: item.name,
    }));
    let members = getMembersOfGroups(groups);
    let payers = members.map((item) => ({
      id: item.id,
      name: item.full_name,
    }));
    let paymentStatuses = [...allPaymentStatus, { id: 5, name: "Todos" }];
    let validationStatuses = [...allValidationStatus, { id: 4, name: "Todos" }];
    setGroupOptions([...groups, { id: 0, name: "Todos" }]);
    setRegardingsOptions([...regardings, { id: 0, name: "Todas" }]);
    setPaymentStatusOptions([...paymentStatuses]);
    setValidationStatusOptions([...validationStatuses]);
    setPayersOptions([...payers, { id: 0, name: "Todos" }]);
  };

  const resetFilters = () => {
    setFilterStates({
      groups: [{ id: 0, name: "Todos" }],
      regardings: [{ id: 0, name: "Todas" }],
      startDate: "",
      endDate: "",
      startPrice: "",
      endPrice: "",
      paymentStatus: "",
      validationStatus: "",
      payers: [{ id: 0, name: "Todos" }],
    });
    applyFilters(false);
    resetOptions();
    setFiltersFilled(false);
    setOpenModal(false);
    handlePagination(null, 1);
  };

  const onFilter = () => {
    setFiltersFilled(true);
    applyFilters();
    setOpenModal(false);
  };

  useEffect(() => {
    setFilteredExpenses([...expenseState.userExpenses]);
    resetOptions();
  }, []);

  useEffect(() => {
    let startPriceParsed =
      parseFloat(filterStates.startPrice.replace(".", "").replace(",", ".")) ||
      "";
    let endPriceParsed =
      parseFloat(filterStates.endPrice.replace(".", "").replace(",", ".")) ||
      "";
    let newValidations = {
      startDate:
        (!filterStates.startDate && !filterStates.endDate) ||
        filterStates.startDate.$d instanceof Date,
      endDate:
        (!filterStates.startDate && !filterStates.endDate) ||
        (filterStates.endDate.$d instanceof Date &&
          filterStates.endDate.$d > filterStates.startDate.$d) ||
        (!filterStates.startDate && filterStates.endDate.$d instanceof Date),
      startPrice:
        (startPriceParsed.length == 0 && endPriceParsed.length == 0) ||
        startPriceParsed >= 0,
      endPrice:
        (startPriceParsed.length == 0 && endPriceParsed.length == 0) ||
        (endPriceParsed > 0 && endPriceParsed > startPriceParsed),
    };
    setFieldsValidation(newValidations);
    setFiltersValid(Object.values(newValidations).every((item) => item));
  }, [filterStates]);

  useEffect(() => {
    applyFilters();
  }, [search]);

  const handlePagination = (e, value) => {
    setPage(value);
    let start = 50 * (value - 1);
    let end = 50 * value;
    if (end > filteredExpenses.length) {
      end = filteredExpenses.length;
    }
    setSliceRange({
      start: start,
      end: end,
    });
  };

  const handleCheckbox = (id) => {
    let index = deleteIds.indexOf(id);
    if (index != -1) {
      setDeleteIds(deleteIds.filter((item) => item != id));
    } else {
      let newIds = [...deleteIds];
      newIds.push(id);
      setDeleteIds([...newIds]);
    }
  };

  const handleRemoveSelected = async () => {
    deleteExpenses(user.api_token, deleteIds).then((flag) => {
      if (flag) {
        let newExpenses = expenseState.userExpenses.filter(
          (item) => !deleteIds.includes(item.id)
        );
        setDeleteIds([]);
        setEdit(false);
        dispatch(setExpenses([...newExpenses]));
        dispatch(
          addMessage({
            severity: "success",
            title: "Sucesso!",
            body: "Despesas removidas com sucesso!",
          })
        );
        dispatch(setReload(true));
      } else {
        dispatch(
          addMessage({
            severity: "error",
            title: "Erro!",
            body: "Tivemos problemas ao deletar as despesas. Tente novamente!",
          })
        );
      }
      setOpenConfirmationModal(false);
    });
  };

  const filterBySearch = (value, expenses) => {
    let upperValue = value ? value.toUpperCase() : "";
    let words = upperValue.split(" ");
    let newExpenses = expenses.filter((item) => {
      let condition1 = true;
      if (regarding) {
        condition1 = item.regarding == regarding;
      }
      for (let word of words) {
        word = word.trim();
        let condition2 =
          item.name.toUpperCase().includes(word) ||
          item.description.toUpperCase().includes(upperValue) ||
          item.regarding_name.toUpperCase().includes(upperValue) ||
          item.payment_status.toUpperCase().includes(upperValue) ||
          item.validation_status.toUpperCase().includes(upperValue);
        if (condition1 && condition2) {
          return true;
        }
      }
    });
    return newExpenses;
  };

  useEffect(() => {
    let expenses = expenseState.userExpenses;
    if (regarding) {
      expenses = expenses.filter((item) => item.regarding == regarding);
    }
    setFilteredExpenses(expenses);
  }, [expenseState]);

  useEffect(() => {
    handlePagination(null, 1);
  }, [filteredExpenses]);

  return (
    <div className="">
      <div>
        <div className="flex flex-row items-center justify-center mt-[10px]">
          <TextField
            id="outlined-basic"
            label="Pesquisa"
            placeholder="Filtre as despesas por nome"
            variant="outlined"
            value={search}
            onChange={(e) => handleChangeSearch(e.target.value)}
            size="medium"
            fullWidth
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
          <IconButton onClick={() => setOpenModal(true)}>
            {filtersFilled ? (
              <Badge color="error" variant="dot">
                <FilterListIcon />
              </Badge>
            ) : (
              <FilterListIcon />
            )}
          </IconButton>
        </div>

        <CustomModal
          open={openModal}
          onClose={() => setOpenModal(false)}
          children={
            <div className="flex flex-col items-center w-[95%] mx-auto">
              <div className="flex flex-row justify-between w-full items-center">
                <Typography
                  id="modal-modal-title"
                  variant="h6"
                  component="h2"
                  sx={{ fontWeight: "bold" }}
                >
                  Filtrar despesas
                </Typography>
                <IconButton onClick={() => setOpenModal(false)}>
                  <CloseIcon />
                </IconButton>
              </div>
              <Autocomplete
                multiple
                id="tags-standard"
                options={groupOptions}
                filterSelectedOptions
                getOptionLabel={(option) => option.name}
                size="medium"
                fullWidth
                sx={{ margin: "10px 0px" }}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                value={filterStates.groups || [{ id: 0, name: "Todos" }]}
                onChange={handleChangeGroups}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Grupos"
                    placeholder="Selecione os grupos"
                    variant="outlined"
                  />
                )}
              />
              <Autocomplete
                multiple
                id="tags-standard"
                options={regardingsOptions}
                filterSelectedOptions
                getOptionLabel={(option) => option.name}
                size="medium"
                fullWidth
                sx={{ margin: "10px 0px" }}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                value={filterStates.regardings || [{ id: 0, name: "Todas" }]}
                onChange={handleChangeRegardings}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Referências"
                    placeholder="Selecione as referências"
                    variant="outlined"
                  />
                )}
                renderOption={(props, option) => {
                  return (
                    <li {...props} key={option.id}>
                      {option.name}
                    </li>
                  );
                }}
              />
              <div className="flex flex-row justify-between my-[10px]">
                <DatePicker
                  className="w-[45%]"
                  label="Data Inicial"
                  value={filterStates.startDate}
                  onChange={(value) => handleChangeDate(value, "start")}
                  slotProps={{
                    textField: {
                      helperText: !fieldsValidation.startDate
                        ? "Início inválido"
                        : "",
                      error: !fieldsValidation.startDate,
                    },
                  }}
                />
                <DatePicker
                  className="w-[45%] p-1"
                  label="Data Final"
                  value={filterStates.endDate}
                  onChange={(value) => handleChangeDate(value, "end")}
                  slotProps={{
                    textField: {
                      helperText: !fieldsValidation.endDate
                        ? "Fim inválido"
                        : "",
                      error: !fieldsValidation.endDate,
                    },
                  }}
                />
              </div>
              <div className="flex flex-row justify-between my-[10px]">
                <TextField
                  id="outlined-basic"
                  label="Valor Inicial"
                  variant="outlined"
                  size="medium"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">R$</InputAdornment>
                    ),
                  }}
                  className="w-[45%]"
                  value={filterStates.startPrice}
                  onChange={(e) =>
                    setFilterStates({
                      ...filterStates,
                      startPrice: moneyMask(e.target.value),
                    })
                  }
                  helperText={
                    !fieldsValidation.startPrice ? "Início inválido" : ""
                  }
                  error={!fieldsValidation.startPrice}
                />
                <TextField
                  id="outlined-basic"
                  label="Valor Final"
                  variant="outlined"
                  size="medium"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">R$</InputAdornment>
                    ),
                  }}
                  value={filterStates.endPrice}
                  onChange={(e) =>
                    setFilterStates({
                      ...filterStates,
                      endPrice: moneyMask(e.target.value),
                    })
                  }
                  className="w-[45%]"
                  helperText={!fieldsValidation.endPrice ? "Fim inválido" : ""}
                  error={!fieldsValidation.endPrice}
                />
              </div>
              <Autocomplete
                id="tags-standard"
                options={paymentStatusOptions}
                filterSelectedOptions
                getOptionLabel={(option) => option.name}
                size="medium"
                fullWidth
                isOptionEqualToValue={(option, value) => option.id === value.id}
                onChange={handleChangePaymentStatus}
                value={filterStates.paymentStatus || { id: 0, name: "Todos" }}
                sx={{ margin: "10px 0px" }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Status de Pagamento"
                    placeholder="Selecione os status"
                    variant="outlined"
                  />
                )}
              />
              <Autocomplete
                id="tags-standard"
                options={validationStatusOptions}
                filterSelectedOptions
                getOptionLabel={(option) => option.name}
                size="medium"
                fullWidth
                isOptionEqualToValue={(option, value) => option.id === value.id}
                onChange={handleChangeValidationStatus}
                value={
                  filterStates.validationStatus || { id: 0, name: "Todos" }
                }
                sx={{ margin: "10px 0px" }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Validação"
                    placeholder="Selecione a validação"
                    variant="outlined"
                  />
                )}
              />
              <Autocomplete
                multiple
                id="tags-standard"
                filterSelectedOptions
                size="medium"
                fullWidth
                options={payersOptions}
                onChange={handleChangePayers}
                value={filterStates.payers || [{ id: 0, name: "Todos" }]}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                getOptionLabel={(option) => option.name}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Pagantes"
                    placeholder="Selecione os pagantes"
                    variant="outlined"
                  />
                )}
                renderOption={(props, option) => {
                  return (
                    <li {...props} key={option.id}>
                      {option.name}
                    </li>
                  );
                }}
              />

              <Box className="flex flex-row justify-between mt-[10px] w-full">
                <Button variant="outlined" onClick={resetFilters}>
                  Limpar
                </Button>
                <Button
                  variant="contained"
                  onClick={onFilter}
                  disabled={!filtersValid}
                >
                  Filtrar
                </Button>
              </Box>
            </div>
          }
        />
        <span className="font-bold text-lg">
          {search ? `Resultados de "${search}"` : ""}
        </span>
        <div className="flex flew-row justify-between items-center">
          <span className="text-sm">
            Mostrando {sliceRange.end != 0 ? sliceRange.start + 1 : 0} a{" "}
            {sliceRange.end} de {filteredExpenses.length} despesas
          </span>
          {edit ? (
            <div className="flex">
              <Button
                onClick={() => {
                  setEdit(false);
                  setDeleteIds([]);
                }}
                size="small"
              >
                Cancelar
              </Button>
              <Button
                onClick={() => setOpenConfirmationModal(true)}
                size="small"
              >
                Remover
              </Button>
            </div>
          ) : (
            filteredExpenses.length > 0 &&
            showDeleteIcon && (
              <IconButton onClick={() => setEdit(true)}>
                <DeleteIcon sx={{ color: "red" }} />
              </IconButton>
            )
          )}
        </div>
      </div>
      {filteredExpenses.length > 50 ? (
        <Pagination
          count={Math.ceil(filteredExpenses.length / 50)}
          page={page}
          onChange={handlePagination}
        />
      ) : (
        <></>
      )}
      <div className="overflow-y-scroll max-h-[calc(100vh-240px)]">
        <List>
          {filteredExpenses.length > 0 ? (
            filteredExpenses
              .slice(sliceRange.start, sliceRange.end)
              .map((item) => {
                return (
                  <ExpenseItem
                    key={item.id}
                    expense={item}
                    edit={edit}
                    onCheck={() => handleCheckbox(item.id)}
                    isChecked={deleteIds.includes(item.id)}
                    showRegardingName={showRegardingName}
                  />
                );
              })
          ) : (
            <NoData message="Nenhuma despesa encontrada" />
          )}
        </List>
      </div>

      <CustomModal
        open={openConfirmationModal}
        onClose={() => setOpenConfirmationModal(false)}
        children={
          <>
            <ConfirmationModal
              message={`Você realmente deseja deletar as despesas selecionadas? Todos items, pagamentos e validações também serão deletados.`}
              onCancel={() => setOpenConfirmationModal(false)}
              onConfirm={handleRemoveSelected}
            />
          </>
        }
      />
    </div>
  );
}

export default ExpenseList;
