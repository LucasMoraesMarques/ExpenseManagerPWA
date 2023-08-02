import React from "react";
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
import { Link, useNavigate, Location } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import SearchIcon from "@mui/icons-material/Search";
import RegardingItem from "../components/RegardingItem";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import FilterListIcon from "@mui/icons-material/FilterList";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import CloseIcon from "@mui/icons-material/Close";
import CustomModal from "../components/CustomModal";
import { useDispatch, useSelector } from "react-redux";
import NoData from "../components/NoData";
import dayjs, { Dayjs } from "dayjs";
import { dateInRange } from "../services/utils";
import { Badge, Checkbox, FormControlLabel } from "@mui/material";
import Pagination from '@mui/material/Pagination';

const allStatus = [
  { name: "Em andamento", id: 1 },
  { name: "Finalizada", id: 2 },
];

function RegardingList() {
  const [openModal, setOpenModal] = useState(false);
  const dispatch = useDispatch();
  const regardingState = useSelector((state) => state.regarding);
  const groupState = useSelector((state) => state.group);

  const [filteredRegardings, setFilteredRegardings] = useState([]);
  const [search, setSearch] = useState("");
  const [filterStates, setFilterStates] = useState({
    groups: [],
    startDate: "",
    endDate: "",
    status: "",
    hasExpenses: true,
  });
  const [groupOptions, setGroupOptions] = useState([]);
  const [groupStatusOptions, setGroupStatusOptions] = useState([]);
  const [filtersValid, setFiltersValid] = useState(false);
  const [filtersFilled, setFiltersFilled] = useState(false);
  const [page, setPage] = useState(1)
  const [sliceRange, setSliceRange] = useState({start:0, end:50})

  const handleChangeSearch = (value) => {
    setSearch(value);
  };

  const handleChangeGroups = (e, value) => {
    console.log(value);
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
    let options = [...allUserGroups];
    if (!(newGroups.length == allUserGroups.length)) {
      options.push({ id: 0, name: "Todos" });
    }
    console.log(options);
    setFilterStates({ ...filterStates, groups: newGroups });
    setGroupOptions(options.filter((item) => !newGroups.includes(item)));
  };

  const handleChangeDate = (value, type) => {
    console.log(value, type);
    if (type == "start") {
      setFilterStates({ ...filterStates, startDate: dayjs(value.$d) });
    } else if (type == "end") {
      setFilterStates({ ...filterStates, endDate: dayjs(value.$d) });
    }
  };

  const handleChangeGroupStatus = (e, value) => {
    console.log(value);
    if (value) {
      let options = [...allStatus, { id: 3, name: "Todos" }];
      console.log(options);
      setFilterStates({ ...filterStates, status: value });
      setGroupStatusOptions(options.filter((item) => item.id != value.id));
    }
  };

  const filterRegardingInRange = (regarding) => {
    let { start_date, end_date } = regarding;

    start_date = dayjs(
      `${start_date.slice(3, 5)}-${start_date.slice(0, 2)}-${start_date.slice(
        6,
        10
      )}`
    );
    end_date = dayjs(
      `${end_date.slice(3, 5)}-${end_date.slice(0, 2)}-${end_date.slice(6, 10)}`
    );
    let range = [filterStates.startDate.$d, filterStates.endDate.$d];
    return (
      dateInRange(start_date.$d, ...range) && dateInRange(end_date.$d, ...range)
    );
  };

  const filterBySearch = (value, regardings) => {
    let upperValue = value ? value.toUpperCase() : "";
    let words = upperValue.split(" ");
    let newRegardings = regardings.filter((item) => {
      for (let word of words) {
        word = word.trim();
        let condition =
          item.name.toUpperCase().includes(word) ||
          item.description.toUpperCase().includes(upperValue) ||
          item.group_name.toUpperCase().includes(upperValue);
        if (condition) {
          return true;
        }
      }
    });
    return newRegardings;
  };

  const applyFilters = (flag = true) => {
    console.log(filteredRegardings);
    let newRegardings = [...regardingState.userRegardings];
    if (flag) {
      if (filterStates.status && filterStates.status.name != "Todos") {
        let isClosed = filterStates.status.name == "Finalizada";
        newRegardings = newRegardings.filter(
          (regarding) => regarding.is_closed == isClosed
        );
      }
      if (filterStates.groups.length > 0) {
        let groupsIds = filterStates.groups.map((group) => group.id);
        newRegardings = newRegardings.filter((regarding) =>
          groupsIds.includes(regarding.expense_group)
        );
      }
      if (filterStates.startDate && filterStates.endDate) {
        newRegardings = newRegardings.filter((regarding) =>
          filterRegardingInRange(regarding)
        );
      }
      newRegardings = newRegardings.filter(
        (regarding) => regarding.has_expenses == filterStates.hasExpenses
      );
    }
    newRegardings = filterBySearch(search, newRegardings);
    setFilteredRegardings([...newRegardings]);
  };

  const handleChangeHasExpenses = (e) => {
    setFilterStates({ ...filterStates, hasExpenses: e.target.checked });
  };

  const resetOptions = () => {
    let groups = groupState.userGroups.map((item) => ({
      id: item.id,
      name: item.name,
    }));
    let statuses = [...allStatus, { id: 3, name: "Todos" }];
    setGroupOptions([...groups, { id: 0, name: "Todos" }]);
    setGroupStatusOptions([...statuses]);
  };

  const resetFilters = () => {
    setFilterStates({
      groups: [],
      startDate: "",
      endDate: "",
      status: "",
      hasExpenses: true,
    });
    applyFilters(false);
    resetOptions();
    setFiltersFilled(false);
    setOpenModal(false);
  };

  const onFilter = () => {
    setFiltersFilled(true);
    applyFilters();
    setOpenModal(false);
  };

  const handlePagination = (e, value) => {
    setPage(value)
    let start = 50 * (value - 1)
    let end = 50 * (value)
    if( end > filteredRegardings.length){
      end = filteredRegardings.length
    }
    setSliceRange({
      start: start,
      end: end
    })

  }

  useEffect(() => {
    setFilteredRegardings([...regardingState.userRegardings]);
    console.log(regardingState.userRegardings);
    resetOptions();
  }, []);

  useEffect(() => {
    console.log(filterStates);
    setFiltersValid(
      (filterStates.startDate && filterStates.endDate) ||
        (!filterStates.startDate && !filterStates.endDate)
    );
  }, [filterStates]);

  useEffect(() => {
    applyFilters();
  }, [search]);

  useEffect(() => {
    handlePagination(null, 1)
  }, [filteredRegardings])

  return (
    <div className="w-[95vw] mx-auto grow">
      <div>
        <div className="flex flex-row items-center justify-center mt-[10px]">
          <TextField
            id="outlined-basic"
            label="Pesquisa"
            placeholder="Filtre as referências por nome"
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
                  Filtrar Referências
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
                value={filterStates.groups || { id: 3, name: "Todos" }}
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
              <div className="my-3 flex flex-row justify-between">
                <DatePicker
                  className="w-[45%]"
                  label="Data Inicial"
                  value={filterStates.startDate}
                  onChange={(value) => handleChangeDate(value, "start")}
                  slotProps={{
                    textField: {
                      helperText:
                        !filterStates.startDate && filterStates.endDate
                          ? "Preencha o início"
                          : "",
                      error:
                        !filterStates.startDate instanceof Date &&
                        filterStates.endDate instanceof Date,
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
                      helperText:
                        filterStates.startDate.$d && !filterStates.endDate.$d
                          ? "Preencha o fim"
                          : "",
                      error:
                        filterStates.startDate.$d instanceof Date &&
                        !(filterStates.endDate.$d instanceof Date),
                    },
                  }}
                />
              </div>

              <Autocomplete
                id="tags-standard"
                options={groupStatusOptions}
                filterSelectedOptions
                getOptionLabel={(option) => option.name}
                size="medium"
                fullWidth
                isOptionEqualToValue={(option, value) => option.id === value.id}
                onChange={handleChangeGroupStatus}
                value={filterStates.status || { id: 0, name: "Todos" }}
                sx={{ margin: "10px 0px" }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Situação"
                    placeholder="Selecione os status"
                    variant="outlined"
                  />
                )}
              />
              <FormControlLabel
                required
                control={
                  <Checkbox
                    checked={filterStates.hasExpenses}
                    onChange={handleChangeHasExpenses}
                    inputProps={{ "aria-label": "controlled" }}
                  />
                }
                label="Possui despesas"
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
          Mostrando {sliceRange.end != 0 ? sliceRange.start+1 : 0} a {sliceRange.end} de {filteredRegardings.length} referências
        </span>
        
        </div>
        {filteredRegardings.length > 50 ? 
      <Pagination count={Math.ceil(filteredRegardings.length / 50)} page={page} onChange={handlePagination} />
      : <></>}
      </div>
      <div className="overflow-y-scroll max-h-[calc(100vh-220px)]">
        <List>
          {filteredRegardings.length > 0 ? (
            filteredRegardings.map((item) => {
              return <RegardingItem key={item.id} regarding={item} />;
            })
          ) : (
            <NoData message="Nenhuma referência encontrada" />
          )}
        </List>
      </div>
    </div>
  );
}

export default RegardingList;
