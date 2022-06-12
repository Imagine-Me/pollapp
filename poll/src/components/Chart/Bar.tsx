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
import { useRecoilValue } from "recoil";
import { data } from "../../recoil/data";

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

const ASCII_START_CODE = 65;

const BarChart = () => {
  const metaData = useRecoilValue(data);
  const poll = metaData.question.poll ?? [];
  const labels = poll.map((_, id) =>
    String.fromCharCode(ASCII_START_CODE + id)
  );
  const chartData = {
    labels,
    datasets: [
      {
        data: poll,
      },
    ],
  } as ChartData<"bar">;
  return <Bar options={options} data={chartData} />;
};

export default BarChart;
