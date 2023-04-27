import { Button, Layout, Menu, theme } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";

import ContentRoute from "./../Routes/ContentRoute";

const items1 = ["1", "2", "3"].map((key) => ({
  key,
  label: `nav ${key}`,
}));
const { Header, Content } = Layout;
const Layouts = () => {
  const navigate = useNavigate();
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout>
      <Header className="header">
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            onClick={() => {
              localStorage.clear("token");
              navigate("/");
            }}
          >
            Logout
          </Button>
        </div>
        <Menu mode="horizontal" defaultSelectedKeys={["2"]} items={items1} />
      </Header>
      <Layout>
        <Content
          style={{
            padding: 24,
            margin: 0,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          <ContentRoute />
        </Content>
      </Layout>
    </Layout>
  );
};

export default Layouts;
