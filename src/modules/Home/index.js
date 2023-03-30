import { Table } from "antd";
import React, { useEffect } from "react";
import { useState } from "react";

import { EditOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/v2/users?page=1&per_page=100`
      );
      const user = await response.json();
      setUsers(user);
      setLoading(false);
    };

    fetchUser();
  }, []);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Action",
      render: (_, record) => (
        <EditOutlined onClick={() => navigate(`/edit-user/${record.id}`)} />
      ),
    },
  ];
  return (
    <div>
      <Table dataSource={users} columns={columns} loading={loading} />;
    </div>
  );
};

export default Home;
