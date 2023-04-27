import React from "react";
import { Button, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";

import { loginCredential } from "../../utils/loginCredential";
import { authToken } from "./../../utils/auth";

const { email, password } = loginCredential;

const Login = () => {
  const navigate = useNavigate();

  const onFinish = (values) => {
    if (values.email === email) {
      if (values.password === password) {
        const token = new Date().getTime();
        authToken(token);
        navigate("/home");
      }
    } else {
      return false;
    }
  };

  return (
    <Form name="basic" onFinish={onFinish} autoComplete="off">
      <Form.Item
        label="Email"
        name="email"
        rules={[
          {
            required: true,
            message: "Please input your username!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: "Please input your password!",
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Login;
