import React, { useEffect, useState } from "react";
import styles from "./css/Home.module.css";

import {
  Layout,
  Typography,
  Row,
  Col,
  Button,
  Table,
} from "antd";
const { Content } = Layout;
const { Title, Paragraph } = Typography;

type Props = {
  readonly loggedIn: boolean;
};

export default function Connect({ loggedIn }: Props) {
  const [partner, setPartner] = useState("");
  
  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      if (token !== null) {
        const response = await fetch(`/auth/get_partner`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const json = await response.json();
        setPartner(json["second"]);
      }
    };
    fetchData();
  }, []);
  
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
                {partner == "Nobody" ? (
                  <Title level={2}>Since there are an odd number of people, you don't have a partner for the week :(</Title>
                ) : (
                  <Title level={2}>
                    Your partner for this week is {partner}.
                  </Title>
                )}
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </Content>
  );
}
