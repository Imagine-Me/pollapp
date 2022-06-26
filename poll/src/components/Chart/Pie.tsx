import React from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJs,
  ChartOptions,
  ChartData,
  ArcElement,
  Tooltip,
} from "chart.js";
import { useRecoilValue } from "recoil";
import { joinUserData } from "../../recoil/join";
import { data } from "../../recoil/data";
import styled from "styled-components";

ChartJs.register(ArcElement, Tooltip);

const Container = styled((props) => <div {...props} />)`
  max-width: 350px;
  margin: auto;
`;

const ASCII_START_CODE = 65;
const BACKGROUND_COLOR = [
  "rgba(54, 162, 235, 0.2)",
  "rgba(255, 99, 132, 0.2)",
  "rgba(255, 206, 86, 0.2)",
  "rgba(153, 102, 255, 0.2)",
  "rgba(255, 159, 64, 0.2)",
  "rgba(75, 192, 192, 0.2)",
];
const BORDER_ERROR = "#ff0000";
const BORDER_SUCCESS = "#00ff00";
const BORDER_INFO = "#785df0";

const PieChart = () => {
  const metaData = useRecoilValue(data);
  const { answer, isPolled } = useRecoilValue(joinUserData);
  const poll = metaData.question.poll ?? [];

  const labels = poll.map((_, id) =>
    String.fromCharCode(ASCII_START_CODE + id)
  );

  const backgroundColor = poll.map((_, id) => BACKGROUND_COLOR[id]);
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
        borderWidth: 5,
      },
    ],
  } as ChartData<"pie">;

  return (
    <Container>
      <Pie data={chartData} />
    </Container>
  );
};

export default PieChart;
