import React, { useEffect, useState } from "react";
import styles from "./css/Home.module.css";
import clipart from "./assets/img/donut.jpg";

import { Layout, Typography, Row, Col, Space, Image, Button, Table } from "antd";
const { Content } = Layout;
const { Title, Paragraph } = Typography;

type Props = {
  readonly loggedIn: boolean;
};

export default function Admin({ loggedIn }: Props) {
  const [pairings, setPairings] = useState([]);
  const columns = [
    {
      title: "User",
      dataIndex: "first",
      key: "first",
    },
    {
      title: "Pair",
      dataIndex: "second",
      key: "second",
    },
  ];
  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      if (token !== null) {
        const response = await fetch(`/auth/get_pairings`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const json = await response.json();
        setPairings(json);
      }
    };
    fetchData();
  }, []);
  const generatePairings = async (e: any) => {
    const token = localStorage.getItem("token");
    if (token !== null) {
      const response = await fetch(`/auth/generate_new_pairings`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const json = await response.json();
      setPairings(json);
      console.log(pairings);
    }
  }
  return (
    <Content style={{ padding: "0 50px" }}>
      <Row style={{ alignItems: "center" }} justify="center">
        <Col md={18}>
          <Row style={{ alignItems: "center" }} justify="center" gutter={10}>
            <Col span={12} style={{ height: "100%" }}>
              <div
                className="site-layout-content"
                style={{ margin: "16px 0", padding: "24px" }}
              >
                <Button type="primary" onClick={generatePairings}>
                  Generate Pairings
                </Button>
                <Table dataSource={pairings} columns={columns} />;
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </Content>
  );
}
