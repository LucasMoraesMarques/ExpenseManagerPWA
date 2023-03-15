import React, { useEffect, useRef, useState } from "react";
import { Line} from "react-chartjs-2";
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


const chartConfig = {
  data:{},
  options: {
    //responsive: true,
    //maintainAspectRatio: false,
    scales: {
      x: {
        type: "time",
        time: {
          unit: "minute",
          displayFormats: {
            minute: "HH:mm"
          }
        },
        ticks: { source: "auto" },
        offset: false,
        grid: {
          //display: false,
          drawBorder: true,
          drawOnChartArea: false,
          drawTicks: true
        },
        font: {
          size: 8
        }
      },
      xAxis2: {
        type: "time",
        time: {
          unit: "day"
        }
      }
      // y: {
      //   ticks: {
      //     fontSize: 8,
      //     beginAtZero: false,
      //     stepSize: 10
      //   }
      // }
    },
    plugins: {
      zoom: {
        zoom: {
          wheel: {
            enabled: true
          },
          // drag:{
          //   enabled:true
          // },
          mode: "x",
          speed: 100
        },
        pan: {
          enabled: true,
          mode: "x",
          speed: 0.5
        }
      }
    }
  }
};

const LineChart = ({data}) => {
  return (
    <Line data={data} className="flex justify-center"/>
  );
};

export default LineChart;
