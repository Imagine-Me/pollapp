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
import { joinUserData } from "../../recoil/join";

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
const BACKGROUND_COLOR = "#1890ff";
const BORDER_ERROR = "#ff0000";
const BORDER_SUCCESS = "#00ff00";
const BORDER_INFO = "#785df0";

const BarChart = () => {
  const metaData = useRecoilValue(data);
  const { answer, isPolled } = useRecoilValue(joinUserData);
  const poll = metaData.question.poll ?? [];
  const labels = poll.map((_, id) =>
    String.fromCharCode(ASCII_START_CODE + id)
  );
  const backgroundColor = poll.map((_) => BACKGROUND_COLOR);
  const borderColor = poll.map((_, id) => {
    if (metaData.question.answer !== undefined) {
      if (id + 1 === metaData.question.answer) {
        return BORDER_SUCCESS;
      } else if (id + 1 === answer && isPolled) {
        return BORDER_ERROR;
      }
    } else if (id + 1 === answer) {
      return BORDER_INFO;
    }
    return `#f0f8ff00`;
  });

  const chartData = {
    labels,
    datasets: [
      {
        data: poll,
        backgroundColor,
        borderColor,
        borderWidth: 5
      },
    ],
  } as ChartData<"bar">;
  return <Bar options={options} data={chartData} />;
};

export default BarChart;
