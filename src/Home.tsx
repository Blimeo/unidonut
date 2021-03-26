// import { Container, Paper, Typography } from "@material-ui/core";
import React from "react";
import styles from "./css/Home.module.css";
import { Layout, Typography } from "antd";
const { Content } = Layout;
const { Title } = Typography;

export default function Home() {
    return (
      <Content style={{ padding: "0 50px" }}>
        <div className="site-layout-content" style={{ margin: "16px 0" }}>
          <Title level={2} >
            Welcome to Unidonut!
          </Title>
        </div>
      </Content>
    );
}