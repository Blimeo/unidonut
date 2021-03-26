import styles from "./css/HeaderComponent.module.css";
import React from "react";
import { Layout, Menu, Typography } from "antd";
import { Link } from "react-router-dom";
const { Header } = Layout;
const { Title } = Typography;

export default function HeaderComponent() {
  return (
    <Header>
      <div className={styles.headerLogoText}>
        <Title level={2} style={{ color: "#fff" }}>
          Unidonut
        </Title>
      </div>

      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["1"]}>
        <Menu.Item key="1">
          <Link to={"/"}>Home</Link>
        </Menu.Item>

        <Menu.Item key="2">
          <Link to={"/about"}>About</Link>
        </Menu.Item>

        <Menu.Item key="3">
          <Link to={"/connect"}>Connect</Link>
        </Menu.Item>
      </Menu>
    </Header>
  );
}
