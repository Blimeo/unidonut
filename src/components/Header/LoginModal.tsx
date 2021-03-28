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
const { Header } = Layout;
const { Title } = Typography;

type Props = {
  readonly setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  readonly loginVisible: boolean;
  readonly setLoginVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function LoginModal({
  setLoggedIn,
  loginVisible,
  setLoginVisible,
}: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = () => {
    setLoginVisible(false); //temporary, this will become login logic
  };
  const handleClose = () => {
    setLoginVisible(false);
    setEmail("");
    setPassword("");
  };
  return (
    <Modal
      title="Login"
      visible={loginVisible}
      onOk={handleLogin}
      onCancel={handleClose}
      footer={[
        <Button key="back" onClick={handleClose}>
          Close
        </Button>,
        <Button key="submit" type="primary" onClick={handleLogin}>
          Login
        </Button>,
      ]}
    >
      <b>Email</b>
      <Input
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        type="email"
      />
      <b>Password</b>
      <Input.Password
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        // type="password"
      />
    </Modal>
  );
}
