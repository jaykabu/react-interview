import React from "react";
import { Modal, Radio, Switch } from "antd";
import { Form, Input } from "antd";

const CreateUserModal = ({ handleOpenModal }) => {
  const [form] = Form.useForm();
  return (
    <Modal
      open={true}
      title="Create a new collection"
      okText="Create"
      cancelText="Cancel"
      onCancel={() => handleOpenModal()}
      onOk={() => {
        form
          .validateFields()
          .then(async (values) => {
            values = {
              ...values,
              status: values.status ? "active" : "inactive",
            };
            const response = await fetch(
              `${process.env.REACT_APP_BACKEND_URL}/v2/users`,
              {
                method: "POST",
                headers: {
                  Authorization:
                    "Bearer 1ee84a42362da08fb9a0e7c38b03c270a1da9e9d8c69a1ac26e00600175fde1a",
                },
                body: JSON.stringify(values),
              }
            );
            const createUser = await response.json();

            console.log(createUser);
          })
          .catch((error) => {
            console.log(error);
          });
      }}
    >
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
        initialValues={{
          modifier: "public",
        }}
      >
        <Form.Item
          name="name"
          label="Name"
          rules={[
            {
              required: true,
              message: "Please input your name",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="email"
          label="Email"
          rules={[
            {
              required: true,
              message: "Please input your email",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="gender"
          label="Gender"
          rules={[
            {
              required: true,
              message: "Please input your gender",
            },
          ]}
        >
          <Radio.Group>
            <Radio value={"male"}>Male</Radio>
            <Radio value={"female"}>Female</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item
          name="status"
          label="Status"
          rules={[
            {
              required: true,
              message: "Please input your status",
            },
          ]}
        >
          <Switch />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateUserModal;
