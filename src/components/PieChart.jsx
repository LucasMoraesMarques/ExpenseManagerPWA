import React from "react";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';
import { Pie } from "react-chartjs-2";


export const data = {
  labels: ["EM VALIDAÇÃO", "AGUARDANDO", "PAGO", "VENCIDO"],
  datasets: [
    {
      label: "# of Votes",
      data: [20, 10, 60, 10],
      backgroundColor: ["#fb923c", "#facc15", "#65a30d", "#ef4444"],
      borderColor: ["#fb923c", "#facc15", "#365314", "#b91c1c"],
      borderWidth: 1,
    },
  ],
};

export const options = {

  scales: {
    x: {
      min: 1,
      max: 5, 
      ticks: {
        color: "rgba( 0, 0, 1)"
      },
      grid: {
        color: "rgba(0, 0, 0, 1)"
      }
    },
    y: {
      min: 1,
      max: 20,
      ticks: {
        color: "rgba(0, 0, 0, 1)"
      },
      grid: {
        color: "rgba(0, 0, 0, 1)"
      }
    }
  },
  
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Chart.js Line Chart',
    },
    zoom: {
      pan: {
        enabled:true,
        mode: 'x',
        speed: 0.5
      },
      zoom: {
        enabled: true
      }
    }
  },
};


ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);
function Stats() {
  return (
    <Pie data={data} /> 
  );
}

export default Stats;