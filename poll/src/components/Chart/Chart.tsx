import React, { useState } from "react";
import { Alert, Col, Row, Select } from "antd";
import BarChart from "./Bar";
import Title from "antd/lib/typography/Title";
import { useRecoilValue } from "recoil";
import { data } from "../../recoil/data";
import styled from "styled-components";
import { joinUserData } from "../../recoil/join";

const { Option } = Select;

export type ChartType = "bar" | "pie";

const AlertStyled = styled(Alert)`
  max-width: 300px;
  margin: auto;
`;

const ChartComponent = () => {
  const [chartType, setChartType] = useState<ChartType>("bar");
  const { userCount, question } = useRecoilValue(data);
  const { answer, isPolled } = useRecoilValue(joinUserData);
  const totalPolled = question.poll?.reduce((acc, val) => acc + val, 0);
  let alert = null;
  if (question.answer !== undefined && answer && isPolled) {
    if (question.answer === answer) {
      alert = <AlertStyled message="Correct" type="success" showIcon />;
    } else {
      alert = <AlertStyled message="Wrong" type="error" showIcon />;
    }
  }
  return (
    <Row>
      <Col span={12}>
        <Title level={3} style={{ textAlign: "center" }}>
          {totalPolled && totalPolled > userCount ? userCount : totalPolled}/
          {userCount}
        </Title>
      </Col>
      <Col span={12}>
        <Select style={{ width: "150px", margin: "auto", display: "block" }}>
          <Option>Bar Chart</Option>
          <Option>Pie Chart</Option>
        </Select>
      </Col>
      <Col span={24}>
        <BarChart />
        {alert}
      </Col>
    </Row>
  );
};

export default ChartComponent;
