import React from "react";
import Carousel from "react-material-ui-carousel";
import { ReactComponent as GroupsSVG } from "../assets/img/carousel_groups.svg";
import { ReactComponent as RegardingSVG } from "../assets/img/carousel_regarding.svg";
import { ReactComponent as ExpenseSVG } from "../assets/img/carousel_expense.svg";
import CarouselItem from "../components/CarouselItem";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router";

var carouselItems = [
  {
    title: "Gerenciamento em Grupo",
    description:
      "Crie grupos de despesas para gerenciar as finanças compartilhadas! Esqueça as planilhas e aproveite.",
    image: <GroupsSVG className="w-[200px] h-[250px]" />,
  },
  {
    title: "Referências",
    description:
      "Crie referências para agrupar suas despesas. Elas podem ser mensais ou por intervalo.",
    image: <RegardingSVG className="w-[200px] h-[250px]" />,
  },
  {
    title: "Despesas",
    description:
      "Cadastre e mantenha suas despesas em um só lugar. Os insights serão poderosos!",
    image: <ExpenseSVG className="w-[200px] h-[250px]" />,
  },
];
function Onboarding() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col w-[90%] mx-auto justify-center h-screen">
      <h5 className="text-center text-bold text-3xl">Expense Manager</h5>
      <Carousel>
        {carouselItems.map((item, i) => (
          <CarouselItem {...item} key={i} />
        ))}
      </Carousel>
      <div className="flex flex-col my-3 h-[90px] justify-between">
        <Button variant="contained" onClick={() => navigate("/entrar")}>
          Entrar
        </Button>
        <Button variant="outlined" onClick={() => navigate("/registrar")}>
          Registrar-se
        </Button>
      </div>
    </div>
  );
}

export default Onboarding;
