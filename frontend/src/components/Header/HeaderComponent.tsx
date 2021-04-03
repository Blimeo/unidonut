import styles from "../../css/HeaderComponent.module.css";
import React, { useState } from "react";
import {
  Layout,
  Menu,
  Typography,
  Button,
  Modal,
  Form,
  Input,
  Checkbox,
} from "antd";
import { Link } from "react-router-dom";
import LoginModal from "./LoginModal";
const { Header } = Layout;
const { Title } = Typography;

type Props = {
  readonly loggedIn: boolean;
  readonly setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function HeaderComponent({ loggedIn, setLoggedIn }: Props) {
  const [loginVisible, setLoginVisible] = useState(false);

  
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

        {!loggedIn && (
          <>
            <Button
              type="primary"
              style={{ marginLeft: "5px" }}
              onClick={() => setLoginVisible(true)}
            >
              Login
            </Button>
            <LoginModal setLoggedIn={setLoggedIn} loginVisible={loginVisible} setLoginVisible={setLoginVisible}/>
          </>
        )}
      </Menu>
    </Header>
  );
}