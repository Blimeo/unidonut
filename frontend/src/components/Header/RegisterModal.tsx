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
  readonly registerVisible: boolean;
  readonly setRegisterVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};


export default function RegisterModal({
  setLoggedIn,
  registerVisible,
  setRegisterVisible,
}: Props) {
  const [registerError, setRegisterError] = useState(false);
  const handleRegister = async (values: any) => {
      console.log("Success:", values);

    const response = await fetch(
      `/register`,
      {
        method: "POST",
        body: JSON.stringify(values),
      }
    );
    if (response.ok) {
      setRegisterVisible(false);
      setLoggedIn(true);
    } else {
      setRegisterError(true);
    }
    
  };
  const handleClose = () => {
    setRegisterVisible(false);
    setRegisterError(false);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <Modal
      title="Register"
      visible={registerVisible}
      onOk={handleRegister}
      onCancel={handleClose}
      footer={[]}
    >
      <Form
        {...layout}
        name="basic"
        initialValues={{ remember: true }}
        onFinish={handleRegister}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="First Name"
          name="firstName"
          rules={[{ required: true, message: "Please input your first name!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Last Name"
          name="lastName"
          rules={[{ required: true, message: "Please input your last name!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
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
      {registerError && (
        <Typography style={{ color: "red" }}>
          There was an error signing you up :(
        </Typography>
      )}
    </Modal>
  );
}
