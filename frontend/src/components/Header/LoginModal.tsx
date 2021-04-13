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
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

export default function LoginModal({
  setLoggedIn,
  loginVisible,
  setLoginVisible,
}: Props) {
  const [loginError, setLoginError] = useState(false);
  const [errorText, setErrorText] = useState("");
  const handleLogin = async (values: any) => {
    console.log("Success:", values);

    const response = await fetch(`/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });
    if (response.ok) {
      setLoginVisible(false);
      setLoggedIn(true);
      const json = await response.json();
      localStorage.setItem("token", json.token);
      localStorage.setItem("token_exp", json.expire);
    } else {
      setLoginError(true);
      if (response.status === 401) {
        setErrorText("Invalid username or password");
      }
    }
    
  };
  const handleClose = () => {
    setLoginVisible(false);
    setLoginError(false);
  };
  return (
    <Modal
      title="Login"
      visible={loginVisible}
      onOk={handleLogin}
      onCancel={handleClose}
      footer={[]}
    >
      <Form
        {...layout}
        name="basic"
        initialValues={{ remember: true }}
        onFinish={handleLogin}
        onFinishFailed={handleClose}
      >
        <Form.Item
          label="Email"
          name="username"
          rules={[{ required: true, message: "Please input your email!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
      {loginError && 
      <Typography style={{color: "red"}}>{errorText}</Typography> }
    </Modal>
  );
}
