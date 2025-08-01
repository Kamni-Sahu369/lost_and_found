
import React, { useEffect, useState } from "react";
import {
  Table,
  Spin,
  Button,
  Tooltip,
  Popconfirm,
  message,
  Modal,
  Form,
  Input,
} from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import {
  getPracticeListAll,
  Mp_reg_delete,
  Mp_reg_update,
} from "../../../Api/Service";
import "./Profile.css";

function UsersTable() {
  const [practiceList, setPracticeList] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchUserStats();
  }, []);

  const fetchUserStats = async () => {
    setLoading(true);
    try {
      const data = await getPracticeListAll();
      setPracticeList(data);
    } catch (err) {
      console.error("Failed to fetch user stats", err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = (record) => {
    setEditingUser(record);
    setIsModalVisible(true);
  };

  useEffect(() => {
    if (isModalVisible && editingUser) {
      form.setFieldsValue(editingUser);
    }
  }, [isModalVisible, editingUser, form]);

  const handleDelete = async (id) => {
    try {
      await Mp_reg_delete(id);
      message.success("User deleted successfully");
      fetchUserStats();
    } catch (error) {
      console.error("Delete failed", error);
      message.error("Failed to delete user");
    }
  };

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();
      await Mp_reg_update(editingUser.id, values);
      message.success("User updated successfully");
      setIsModalVisible(false);
      setEditingUser(null);
      form.resetFields();
      fetchUserStats();
    } catch (error) {
      console.error("Update failed:", error);
      message.error("Failed to update user");
    }
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
    setEditingUser(null);
    form.resetFields();
  };

  const columns = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Country", dataIndex: "country", key: "country" },
    { title: "Phone", dataIndex: "phone", key: "phone" },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
          <Tooltip title="Edit">
            <Button
              icon={<EditOutlined />}
              onClick={() => handleUpdate(record)}
              type="default"
              style={{ color: "#1890ff", fontSize: "18px" }}
            />
          </Tooltip>
          <Tooltip title="Delete">
            <Popconfirm
              title="Are you sure to delete this user?"
              onConfirm={() => handleDelete(record.id)}
              okText="Yes"
              cancelText="No"
            >
              <Button
                icon={<DeleteOutlined />}
                type="default"
                style={{ color: "#ff4d4f", fontSize: "18px" }}
              />
            </Popconfirm>
          </Tooltip>
        </div>
      ),
    },
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
            dataSource={practiceList?.users || []}
            columns={columns}
            rowKey="id"
            bordered
            pagination={{ pageSize: 5 }}
          />
        </div>
      )}

      <Modal
        title="Edit User"
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        okText="Update"
      >
        <Form form={form} layout="vertical">
          <Form.Item name="name" label="Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="email" label="Email" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="country" label="Country">
            <Input />
          </Form.Item>
          <Form.Item name="phone" label="Phone">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default UsersTable;
