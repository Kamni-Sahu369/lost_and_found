import React, { useState } from "react";
import "./View.css";
import {
  Descriptions,
  Button,
  Modal,
  Form,
  Input,
  Upload,
  message,
} from "antd";
import { InboxOutlined } from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";

function View() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);
  const [form] = Form.useForm();
  const location = useLocation();
  const navigate = useNavigate();
  const item = location.state?.item;

  if (!item) {
    return <div>No item selected</div>;
  }

  const showModal = () => {
    const user = localStorage.getItem("user_id");
    if (!user) {
      alert("Please login to claim this item.");
      navigate("/login")
      return;
    }
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleFinish = (values) => {
    console.log("Claim Form Data:", values);
    setIsModalOpen(false); // Close modal on successful submit
    // TODO: API call can be made here
  };

  return (
    <div>
      <div className="view_main">
        <div className="section_1"></div>

        <div className="section_2">
          <div className="side_img"></div>

          <div className="main_img">
            <img
              src={`http://localhost:8000${item.item_image}`}
              alt={item.name}
              className="view-image"
            />
          </div>

          <div className="img_info">
            <Descriptions
              title="Item Details"
              bordered
              column={1}
              size="middle"
              layout="horizontal"
            >
              <Descriptions.Item label="Name">{item.name}</Descriptions.Item>
              <Descriptions.Item label="Category">
                {item.category}
              </Descriptions.Item>
              <Descriptions.Item label="Date">{item.date}</Descriptions.Item>
              <Descriptions.Item label="Time">{item.time}</Descriptions.Item>
              <Descriptions.Item label="Location">
                {item.location}
              </Descriptions.Item>
              <Descriptions.Item label="Description">
                {item.description}
              </Descriptions.Item>
            </Descriptions>

            <div style={{ marginTop: "1rem" }}>
              <Button type="primary" onClick={showModal}>
                Claim
              </Button>

              <Modal
                title="Claim Item"
                closable={false} // hides default 'X'
                open={isModalOpen}
                onCancel={handleCancel}
                footer={null} // removes default footer buttons
              >
                <Form form={form} layout="vertical" onFinish={handleFinish}>
                  <Form.Item
                    label="Describe the Item"
                    name="description"
                    rules={[
                      { required: true, message: "Please describe the item" },
                    ]}
                  >
                    <Input.TextArea
                      rows={3}
                      placeholder="Color, brand, any marks..."
                    />
                  </Form.Item>

                  <Form.Item
                    label="Where & When did you lose/find it?"
                    name="location_info"
                    rules={[
                      {
                        required: true,
                        message: "Location and time info is required",
                      },
                    ]}
                  >
                    <Input placeholder="E.g., Near Bus Stand, 9th June, morning" />
                  </Form.Item>

                  <Form.Item
                    label="Receipt / Bill (optional proof)"
                    name="receipt_bill"
                    valuePropName="fileList"
                    getValueFromEvent={(e) =>
                      Array.isArray(e) ? e : e?.fileList
                    }
                  >
                    <Upload.Dragger
                      name="files"
                      beforeUpload={() => false}
                      maxCount={1}
                    >
                      <p className="ant-upload-drag-icon">
                        <InboxOutlined />
                      </p>
                      <p className="ant-upload-text">
                        Click or drag file to upload
                      </p>
                      <p className="ant-upload-hint">
                        Upload bill, receipt, or any proof (optional)
                      </p>
                    </Upload.Dragger>
                  </Form.Item>

                  <Form.Item>
                    <Button type="primary" htmlType="submit">
                      Submit Claim
                    </Button>
                  </Form.Item>
                </Form>
              </Modal>
            </div>
          </div>

          <div className="cart">
            <button>Add to Cart</button>
            <button className="buy-now">Buy Now</button>
          </div>
        </div>

        <div className="section_3">
          {/* Add anything extra here like recommendations or ads */}
        </div>
      </div>
    </div>
  );
}

export default View;
