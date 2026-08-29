import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import { FaBaby, FaFemale, FaHospital, FaChartLine, FaWeight, FaSkull } from 'react-icons/fa';

function DashboardStats({ stats }) {
  const statCards = [
    {
      title: 'Total Births',
      value: stats.totalBirths,
      icon: <FaBaby size={30} />,
      color: 'primary',
      bg: 'bg-primary'
    },
    {
      title: 'Normal Deliveries',
      value: stats.normalDeliveries,
      icon: <FaFemale size={30} />,
      color: 'success',
      bg: 'bg-success'
    },
    {
      title: "Today's Births",
      value: stats.todayBirths,
      icon: <FaHospital size={30} />,
      color: 'info',
      bg: 'bg-info'
    },
    {
      title: 'C-Section Rate',
      value: `${stats.cSectionRate}%`,
      icon: <FaChartLine size={30} />,
      color: 'warning',
      bg: 'bg-warning'
    },
    {
      title: 'Low Birth Weight',
      value: stats.lowBirthWeight,
      icon: <FaWeight size={30} />,
      color: 'danger',
      bg: 'bg-danger'
    },
    {
      title: 'Stillbirths',
      value: stats.stillbirths || 0,
      icon: <FaSkull size={30} />,
      color: 'dark',
      bg: 'bg-dark'
    }
  ];

  return (
    <Row>
      {statCards.map((stat, index) => (
        <Col md={4} lg={2} key={index} className="mb-3">
          <Card className={`${stat.bg} text-white stat-card h-100`}>
            <Card.Body className="text-center">
              <div className="mb-2">{stat.icon}</div>
              <h6 className="text-uppercase small mb-1">{stat.title}</h6>
              <h3 className="stats-number">{stat.value}</h3>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
}

export default DashboardStats;