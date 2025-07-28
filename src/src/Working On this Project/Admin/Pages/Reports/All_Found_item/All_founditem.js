
import React, { useEffect, useState } from "react";
import { Card, Row, Col, Empty, Spin } from "antd";


const All_founditem = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchFoundItems = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/found-items/");
      if (!response.ok) throw new Error("Failed to fetch found items");
      const data = await response.json();
      setItems(data);
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFoundItems();
  }, []);

  return (
    <div style={{ padding: "24px" }}>
      <h2>📦 Found Items</h2>

      {loading ? (
        <Spin tip="Loading..." />
      ) : items.length === 0 ? (
        <Empty description="No found items yet." />
      ) : (
        <Row gutter={[16, 16]}>
          {items.map((item) => (
            <Col xs={24} sm={12} md={8} lg={6} key={item.id}>
              <Card
                hoverable
                title={item.name}
                cover={
                  <img
                    alt={item.name}
                    src={`http://localhost:8000${item.item_image}`}
                    style={{ height: 180, objectFit: "cover", borderRadius: 4 }}
                  />
                }
              >
                <p><strong>Category:</strong> {item.category}</p>
                <p><strong>Date:</strong> {item.date}</p>
                <p><strong>Time:</strong> {item.time}</p>
                <p><strong>Location:</strong> {item.location}</p>
                <p><strong>Description:</strong> {item.description || "N/A"}</p>
                <p><strong>Status:</strong> {item.status ? "Active" : "Inactive"}</p>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
};

export default All_founditem;
