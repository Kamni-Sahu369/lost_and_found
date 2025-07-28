
import React, { useEffect, useState, useRef } from "react";
import { Table, Spin, Input, Button, Space } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { getPracticeList } from "../../../Api/Service";
import "./Profile.css";

function UsersTable() {
  const [practiceList, setPracticeList] = useState(null);
  const [loading, setLoading] = useState(false);
  const searchInput = useRef(null);
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');

  useEffect(() => {
    fetchUserStats();
  }, []);

  const fetchUserStats = async () => {
    setLoading(true);
    try {
      const data = await getPracticeList(localStorage.getItem('user_id'));
      setPracticeList(data);
    } catch (err) {
      console.error("Failed to fetch user stats", err);
    } finally {
      setLoading(false);
    }
  };

  // Column search functionality
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value, record) =>
      record[dataIndex]?.toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: visible => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
  });

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = clearFilters => {
    clearFilters();
    setSearchText('');
  };

  const columns = [
    { title: "ID", dataIndex: "id", key: "id" },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      ...getColumnSearchProps('name'),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      ...getColumnSearchProps('email'),
    },
    { title: "Country", dataIndex: "country", key: "country" },
    { title: "Phone", dataIndex: "phone", key: "phone" },
  ];

  return (
    <div className="user-table-container">
      <h2 className="table-title">All Registered Users</h2>
      {loading ? (
        <div className="loader-container">
          <Spin tip="Loading..." />
        </div>
      ) : (
        <div className="table-wrapper">
          <Table
            dataSource={practiceList || []}
            columns={columns}
            rowKey="id"
            bordered
            pagination={{ pageSize: 8 }} // Increased size to avoid scroll
          />
        </div>
      )}
    </div>
  );
}

export default UsersTable;
