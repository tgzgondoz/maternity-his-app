// src/pages/Home.js
import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Container } from 'react-bootstrap';
import { FaBaby, FaFemale, FaHospital, FaChartLine } from 'react-icons/fa';
// REMOVE: import axios from 'axios';

function Home() {
  const [stats, setStats] = useState({
    totalBirths: 0,
    totalMothers: 0,
    todayBirths: 0,
    cSectionRate: 0
  });

  useEffect(() => {
    // Simulated API call - replace with actual API
    setStats({
      totalBirths: 1245,
      totalMothers: 1120,
      todayBirths: 8,
      cSectionRate: 28
    });
  }, []);

  return (
    <Container>
      <h2 className="mb-4">Dashboard</h2>
      <Row>
        <Col md={3}>
          <Card className="text-center mb-3">
            <Card.Body>
              <FaBaby size={40} className="text-primary" />
              <h5>Total Births</h5>
              <h3>{stats.totalBirths}</h3>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center mb-3">
            <Card.Body>
              <FaFemale size={40} className="text-success" />
              <h5>Total Mothers</h5>
              <h3>{stats.totalMothers}</h3>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center mb-3">
            <Card.Body>
              <FaHospital size={40} className="text-info" />
              <h5>Today's Births</h5>
              <h3>{stats.todayBirths}</h3>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center mb-3">
            <Card.Body>
              <FaChartLine size={40} className="text-warning" />
              <h5>C-Section Rate</h5>
              <h3>{stats.cSectionRate}%</h3>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Card className="mt-4">
        <Card.Header>System Overview</Card.Header>
        <Card.Body>
          <p><strong>Maternity-HIS Birth Records Integration</strong></p>
          <p>This system captures birth data at the point of delivery and syncs to the Health Information System.</p>
          <ul>
            <li>✅ Birth records captured once, used for patient care and reporting</li>
            <li>✅ Reduces data duplication and improves accuracy</li>
            <li>✅ Real-time tracking of maternal and newborn health indicators</li>
          </ul>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Home;