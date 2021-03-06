import styles from "../../css/HeaderComponent.module.css";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";

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
import RegisterModal from "./RegisterModal";
const { Header } = Layout;
const { Title } = Typography;

type Props = {
  readonly loggedIn: boolean;
  readonly setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  readonly isAdmin: boolean;
};

export default function HeaderComponent({ loggedIn, setLoggedIn, isAdmin }: Props) {
  const [loginVisible, setLoginVisible] = useState(false);
  const [registerVisible, setRegisterVisible] = useState(false);
  const history = useHistory();

  const handleLogout =  () => {
    setLoggedIn(false);
    history.push("/")
    localStorage.removeItem("token");
    localStorage.removeItem("token_exp");
  }
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

        {loggedIn &&
          (isAdmin ? (
            <Menu.Item key="3">
              <Link to={"/admin"}>Pairings</Link>
            </Menu.Item>
          ) : (
            <Menu.Item key="3">
              <Link to={"/connect"}>My Pairing</Link>
            </Menu.Item>
          ))}

        <div style={{ float: "right" }}>
          {!loggedIn ? (
            <>
              <Button
                type="primary"
                style={{ marginLeft: "5px" }}
                onClick={() => setLoginVisible(true)}
              >
                Login
              </Button>
              <LoginModal
                setLoggedIn={setLoggedIn}
                loginVisible={loginVisible}
                setLoginVisible={setLoginVisible}
              />
              <Button
                type="primary"
                style={{ marginLeft: "5px" }}
                onClick={() => setRegisterVisible(true)}
              >
                Register
              </Button>
              <RegisterModal
                setLoggedIn={setLoggedIn}
                registerVisible={registerVisible}
                setRegisterVisible={setRegisterVisible}
              />
            </>
          ) : (
            <Button
              type="primary"
              style={{ marginLeft: "5px" }}
              onClick={() => handleLogout()}
            >
              Logout
            </Button>
          )}
        </div>
      </Menu>
    </Header>
  );
}
