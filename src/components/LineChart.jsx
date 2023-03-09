import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import zoomPlugin from "chartjs-plugin-zoom";
import "chartjs-adapter-moment";
Chart.register(zoomPlugin);


const chartConfig = {
  type: "line",
  data: {
    labels: [
      "2021-11-24 12:03:00",
      "2021-11-24 13:03:00",
      "2021-11-24 16:03:00",
      "2021-11-26 16:03:00"
    ],
    datasets: [
      {
        label: "# of Votes",
        data: [12, null, "8", "5"],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)"
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)"
        ],
        spanGaps: false,
        borderWidth: 1
      }
    ]
  },
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

const LineChart = () => {
  const chartContainer = useRef(null);
  const [chartInstance, setChartInstance] = useState(null);

  useEffect(() => {
    if (chartContainer && chartContainer.current) {
      const newChartInstance = new Chart(chartContainer.current, chartConfig);
      setChartInstance(newChartInstance);
      return () => {
        newChartInstance.destroy();
      };
    }
  }, [chartContainer]);

  const updateDataset = (datasetIndex, newData) => {
    chartInstance.data.datasets[datasetIndex].data = newData;
    chartInstance.update();
  };

  return (
    <div>
      <canvas ref={chartContainer} />
    </div>
  );
};

export default LineChart;
