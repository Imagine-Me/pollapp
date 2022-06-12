import React, { useState } from "react";
import { Col, Row, Select } from "antd";
import BarChart from "./Bar";
import Title from "antd/lib/typography/Title";
import { useRecoilValue } from "recoil";
import { data } from "../../recoil/data";

const { Option } = Select;

export type ChartType = "bar" | "pie";

const ChartComponent = () => {
  const [chartType, setChartType] = useState<ChartType>("bar");
  const { userCount, question } = useRecoilValue(data);
  console.log(question.poll);
  const totalPolled = question.poll?.reduce((acc, val) => acc + val, 0);
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
      </Col>
    </Row>
  );
};

export default ChartComponent;
