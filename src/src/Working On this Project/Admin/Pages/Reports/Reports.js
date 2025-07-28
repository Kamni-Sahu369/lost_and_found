import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Typography, Spin } from 'antd';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, XAxis, YAxis, Bar, Legend } from 'recharts';
import axios from 'axios';

const { Title } = Typography;

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AA336A'];

const ReportDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState({});
  const [monthlyLost, setMonthlyLost] = useState([]);
  const [monthlyFound, setMonthlyFound] = useState([]);
  const [topCategories, setTopCategories] = useState([]);

  const fetchData = async () => {
    try {
      const res = await axios.get('/api/report-summary/', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setSummary(res.data.summary);
      setMonthlyLost(res.data.monthly_lost);
      setMonthlyFound(res.data.monthly_found);
      setTopCategories(res.data.top_categories);
    } catch (err) {
      console.error('Error fetching reports', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const barData = monthlyLost.map((item, idx) => ({
    month: `M${item.month}`,
    lost: item.total,
    found: monthlyFound[idx]?.total || 0,
  }));

  return (
    <div style={{ padding: '24px' }}>
      <Title level={3}>Reports Dashboard</Title>
      {loading ? (
        <Spin />
      ) : (
        <>
          <Row gutter={16}>
            {Object.entries(summary).map(([key, value]) => (
              <Col span={6} key={key}>
                <Card>
                  <Title level={4}>{key.replace('_', ' ').toUpperCase()}</Title>
                  <Title level={2}>{value}</Title>
                </Card>
              </Col>
            ))}
          </Row>

          <Row gutter={24} style={{ marginTop: 24 }}>
            <Col span={12}>
              <Card title="Monthly Lost vs Found">
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={barData}>
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="lost" fill="#ff4d4f" />
                    <Bar dataKey="found" fill="#1890ff" />
                  </BarChart>
                </ResponsiveContainer>
              </Card>
            </Col>

            <Col span={12}>
              <Card title="Top Categories Reported">
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={topCategories}
                      dataKey="total"
                      nameKey="category__name"
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      label
                    >
                      {topCategories.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </Card>
            </Col>
          </Row>
        </>
      )}
    </div>
  );
};

export default ReportDashboard;
