import React from "react";
import styles from "./css/Home.module.css";
import { Layout, Typography, Row, Col } from "antd";
const { Content } = Layout;
const { Title, Paragraph } = Typography;



export default function Home() {
    return (
      <Content style={{ padding: "0 50px" }}>
        <Row>
          <Col span={6} />
          <Col span={12}>
            <div className="site-layout-content" style={{ margin: "16px 0" }}>
              <Title level={2}>Welcome to Unidonut!</Title>
              <Paragraph>
                Unidonut is a platform to connect with other university
                students. Every week, you can opt into pairing for that week,
                and then you will be paired with someone based on your
                preferences. This pairing can be completely random or match you
                based on common interests and other filters!
              </Paragraph>
            </div>
          </Col>
          <Col span={6} />
        </Row>
      </Content>
    );
}