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
function Stats({data}) {
  return (
    <Pie data={data} /> 
  );
}

export default Stats;