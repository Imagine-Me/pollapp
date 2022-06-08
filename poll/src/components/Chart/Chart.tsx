import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJs,
  CategoryScale,
  LinearScale,
  ChartOptions,
  ChartData,
  BarElement,
} from "chart.js";

ChartJs.register(CategoryScale, LinearScale, BarElement);

export const options = {
  indexAxis: "y",
  elements: {
    bar: {
      borderWidth: 2,
    },
  },
  responsive: true,
  scales: {
    x: { display: false },
    y: { grid: { display: false } },
  },
} as ChartOptions<"bar">;

const labels = ["A", "B", "C", "D"];

const data = {
  labels,
  datasets: [
    {
      data: [4, 3, 5],
    },
  ],
} as ChartData<"bar">;

const ChartComponent = () => {
  return <Bar options={options} data={data} />;
};

export default ChartComponent;
