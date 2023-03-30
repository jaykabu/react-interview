import React, { useEffect, useState } from "react";
import { Button, Form, Input } from "antd";
import { useParams, useNavigate } from "react-router-dom";

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [initialValues, setInitialValues] = useState({});

  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/v2/users/${id}`
      );
      const user = await response.json();

      setInitialValues(user);
      setLoading(false);
    };

    fetchUser();
  }, [id]);

  if (loading) return "Loading ....";

  const onFinish = async (values) => {
    console.log(values);
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/v2/users/${id}`,
      {
        method: "PATCH",
        headers: {
          Authorization:
            "Bearer 1ee84a42362da08fb9a0e7c38b03c270a1da9e9d8c69a1ac26e00600175fde1a",
        },
        body: JSON.stringify(values),
      }
    );

    const updateUser = await response.json();
    navigate("/home");
    console.log(updateUser);
  };

  return (
    <Form
      name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      style={{
        maxWidth: 600,
      }}
      initialValues={initialValues}
      onFinish={onFinish}
      autoComplete="off"
    >
      <Form.Item
        label="Name"
        name="name"
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
        label="Email"
        name="email"
        rules={[
          {
            required: true,
            message: "Please input your password!",
          },
        ]}
      >
        <Input />
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

export default EditUser;
