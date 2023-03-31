import { Button, Input, Space, Table } from "antd";
import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { EditOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import CreateUserModal from "../../Components/Users/CreateUserModal";

const genderFilter = [
  { text: "MALE", value: "male" },
  { text: "FEMALE", value: "female" },
];

const Home = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(undefined);
  const [filteredInfo, setFilteredInfo] = useState({});

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

  const handleSearch = (value, confirm, fileName) => {
    value = typeof value === "object" ? value[0] : value;
    confirm();
  };

  function handleReset(clearFilters, filedName) {
    clearFilters();
  }

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => handleReset(clearFilters, dataIndex)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1890ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
  });

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.length - b.name.length,
      ...getColumnSearchProps("name"),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      sorter: (a, b) => a.name.length - b.name.length,
      ...getColumnSearchProps("email"),
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
      sorter: (a, b) => a.name.length - b.name.length,
      filters: genderFilter,
      filteredValue: filteredInfo.gender || null,
      onFilter: (value, record) => record.gender.includes(value),
      ellipsis: true,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      sorter: (a, b) => a.name.length - b.name.length,
    },
    {
      title: "Action",
      render: (_, record) => (
        <EditOutlined onClick={() => navigate(`/edit-user/${record.id}`)} />
      ),
    },
  ];

  const handleOpenModal = () => {
    setShow(!show);
  };

  const handleTableChange = (pagination, filters, sorter) => {
    if (filters.gender) {
      setFilteredInfo(filters);
    } else {
      setFilteredInfo({});
    }
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <Button onClick={() => handleOpenModal()}>Create User</Button>
      </div>
      <Table
        dataSource={users}
        columns={columns}
        loading={loading}
        onChange={handleTableChange}
      />
      ;{!!show && <CreateUserModal handleOpenModal={handleOpenModal} />}
    </div>
  );
};

export default Home;
