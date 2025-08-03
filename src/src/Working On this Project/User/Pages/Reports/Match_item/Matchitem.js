import React, { useState, useEffect } from "react";
import { Table, Input, Button, Image } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { getAllMatchedItems } from "../../../../Api/Service";

const MatchFoundItem = () => {
  const [data, setData] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    getAllMatchedItems().then((matchedItems) => {
      const formatted = matchedItems.map((item, index) => ({
        key: index,
        name: item.name,
        match: `${item.match_score}%`,
        status: "Matched",
        category: item.category,
        date: item.date,
        time: item.time,
        location: item.location,
        image: item.item_image,
        lostName: item.lost_item_name,
      }));
      setData(formatted);
      setOriginalData(formatted);
    });
  }, []);

  const handleSearch = () => {
    const filteredData = originalData.filter((item) =>
      item.name.toLowerCase().includes(searchText.toLowerCase())
    );
    setData(filteredData);
  };

  const columns = [
    {
      title: "Lost Item",
      dataIndex: "lostName",
      key: "lostName",
    },
    {
      title: "Found Item",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Match",
      dataIndex: "match",
      key: "match",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Time",
      dataIndex: "time",
      key: "time",
    },
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (text) => <Image src={text} width={60} />,
    },
  ];

  return (
    <div className="container mt-4">
      <div className="search-bar" style={{ marginBottom: "16px" }}>
        <Input
          placeholder="Search by found item name..."
          prefix={<SearchOutlined />}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          style={{ width: 300, marginRight: 10 }}
        />
        <Button type="primary" onClick={handleSearch}>
          Search
        </Button>
      </div>
      <Table columns={columns} dataSource={data} />
    </div>
  );
};

export default MatchFoundItem;
