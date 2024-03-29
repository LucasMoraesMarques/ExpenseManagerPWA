import React from "react";
import IconButton from "@mui/material/IconButton";
import { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import InputAdornment from "@mui/material/InputAdornment";
import List from "@mui/material/List";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import SearchIcon from "@mui/icons-material/Search";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import CloseIcon from "@mui/icons-material/Close";
import CustomModal from "../components/CustomModal";
import { useSelector } from "react-redux";
import NoData from "../components/NoData";
import RecentAction from "../components/RecentAction";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import BackButton from "../components/BackButton";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Pagination from "@mui/material/Pagination";

const groups = [
  { label: "Group 1", id: 1 },
  { label: "Group 2", id: 2 },
];

function RecentActionList() {
  const [openModal, setOpenModal] = useState(false);
  const actionState = useSelector((state) => state.action);
  const [filteredActions, setFilteredActions] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedChip, setSelectedChip] = useState("Todas");
  const [actionPage, setActionPage] = useState(1);
  const [actionSliceRange, setActionSliceRange] = useState({
    start: 0,
    end: 50,
  });

  const filterActions = () => {
    let upperValue = search ? search.toUpperCase() : "";
    let words = upperValue.split(" ");
    let newActions = actionState.groupsActions.filter((item) => {
      for (let word of words) {
        word = word.trim();
        let condition =
          item.user.full_name.toUpperCase().includes(word) ||
          item.description.toUpperCase().includes(upperValue) ||
          item.type.toUpperCase().includes(upperValue);
        if (condition) {
          return true;
        }
      }
    });

    newActions = newActions.filter((item) => {
      if (selectedChip == "Criação") {
        return item.type == "CREATE";
      } else if (selectedChip == "Atualização") {
        return item.type == "UPDATE";
      } else if (selectedChip == "Exclusão") {
        return item.type == "DELETE";
      } else {
        return true;
      }
    });
    setFilteredActions([...newActions]);
  };

  useEffect(() => {
    setFilteredActions([...actionState.groupsActions]);
  }, [actionState.groupsActions]);

  useEffect(() => {
    filterActions();
  }, [selectedChip, search]);

  const handleActionPagination = (e, value) => {
    setActionPage(value);
    let start = 50 * (value - 1);
    let end = 50 * value;
    if (end > filteredActions.length) {
      end = filteredActions.length;
    }
    setActionSliceRange({
      start: start,
      end: end,
    });
  };

  useEffect(() => {
    handleActionPagination(null, 1);
  }, [filteredActions]);

  return (
    <div>
      <AppBar position="sticky">
        <Toolbar>
          <BackButton />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Histórico de ações
          </Typography>
        </Toolbar>
      </AppBar>
      <div className="w-[95vw] mx-auto">
        <div className="">
          <TextField
            id="outlined-basic"
            label="Pesquisa"
            placeholder="Filtre as ações aqui"
            variant="outlined"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
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
          {/*<IconButton onClick={() => setOpenModal(true)}><FilterListIcon/></IconButton>*/}
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
                  options={groups}
                  filterSelectedOptions
                  getOptionLabel={(option) => option.label}
                  size="medium"
                  fullWidth
                  sx={{ margin: "10px 0px" }}
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
                  <DatePicker className="w-[45%]" label="Data Inicial" />
                  <DatePicker className="w-[45%] p-1" label="Data Final" />
                </div>

                <Autocomplete
                  multiple
                  id="tags-standard"
                  options={groups}
                  filterSelectedOptions
                  getOptionLabel={(option) => option.label}
                  size="medium"
                  fullWidth
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
                <Box className="flex flex-row justify-between mt-[10px] w-full">
                  <Button
                    variant="outlined"
                    onClick={() => setOpenModal(false)}
                  >
                    Limpar
                  </Button>
                  <Button variant="contained">Filtrar</Button>
                </Box>
              </div>
            }
          />
        </div>

        <Stack direction="row" spacing={1}>
          <Chip
            label="Todas"
            color="primary"
            variant={selectedChip == "Todas" ? "contained" : "outlined"}
            onClick={() => setSelectedChip("Todas")}
          />
          <Chip
            label="Criação"
            color="primary"
            variant={selectedChip == "Criação" ? "contained" : "outlined"}
            onClick={() => setSelectedChip("Criação")}
          />

          <Chip
            label="Atualização"
            color="primary"
            variant={selectedChip == "Atualização" ? "contained" : "outlined"}
            onClick={() => setSelectedChip("Atualização")}
          />
          <Chip
            label="Exclusão"
            color="primary"
            variant={selectedChip == "Exclusão" ? "contained" : "outlined"}
            onClick={() => setSelectedChip("Exclusão")}
          />
        </Stack>
        <div className="flex flex-col py-2">
          <span className="font-bold text-lg">
            {search ? `Resultados de "${search}"` : ""}
          </span>
          <span className="text-sm">
            Mostrando{" "}
            {actionSliceRange.end != 0 ? actionSliceRange.start + 1 : 0} a{" "}
            {actionSliceRange.end} de {filteredActions.length} ações
          </span>
          {filteredActions.length > 50 ? (
            <Pagination
              count={Math.ceil(filteredActions.length / 50)}
              page={actionPage}
              onChange={handleActionPagination}
            />
          ) : (
            <></>
          )}
        </div>

        <div className="overflow-y-scroll max-h-[calc(100vh-200px)]">
          <List>
            {filteredActions.length > 0 ? (
              filteredActions
                .slice(actionSliceRange.start, actionSliceRange.end)
                .map((item) => {
                  return <RecentAction key={item.id} action={item} />;
                })
            ) : (
              <NoData message="Nenhuma ação encontrada" />
            )}
          </List>
        </div>
      </div>
    </div>
  );
}

export default RecentActionList;
