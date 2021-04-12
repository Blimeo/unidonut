import React from "react";
import styles from "./css/Home.module.css";
import clipart from "./assets/img/donut.jpg";

import { Layout, Typography, Row, Col, Space, Image } from "antd";
const { Content } = Layout;
const { Title, Paragraph } = Typography;

type Props = {
  readonly loggedIn: boolean;
};

export default function Home({ loggedIn }: Props) {
  return (
    <Content style={{ padding: "0 50px" }}>
      <Row style={{ alignItems: "center" }} justify="center">
        <Col md={18}>
          <Row style={{ alignItems: "center" }} justify="center" gutter={10}>
            <Col span={12} style={{height: "100%"}}>
              <div className="site-layout-content" style={{ margin: "16px 0", padding: "24px" }}>
                {loggedIn ? (
                  <Title level={2}>Welcome back, Matthew!</Title>
                ) : (
                  <Title level={2}>Welcome to Unidonut!</Title>
                )}
                <Paragraph>
                  Unidonut is a platform to connect with other university
                  students. Every week, you can opt into pairing for that week,
                  and then you will be paired with someone based on your
                  preferences. This pairing can be completely random or match
                  you based on common interests and other filters!
                </Paragraph>
              </div>
            </Col>
            <Col span={12}>
              <div className="site-layout-content" style={{ margin: "16px 0" }}>
                <Image preview={false} src={clipart} style={{display: "block", marginLeft: "auto", marginRight: "auto"}} />
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </Content>
  );
}
