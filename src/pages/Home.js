// src/pages/Home.js
import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Container, Spinner } from 'react-bootstrap';
import { FaBaby, FaFemale, FaHospital, FaChartLine } from 'react-icons/fa';
import { subscribeToStats } from '../services/firebaseService';

function Home() {
  const [stats, setStats] = useState({
    totalBirths: 0,
    totalMothers: 0,
    todayBirths: 0,
    cSectionRate: 0,
    normalDeliveries: 0,
    lowBirthWeight: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Subscribe to real-time stats
    const unsubscribe = subscribeToStats((statsData) => {
      setStats({
        ...statsData,
        totalMothers: statsData.totalBirths // Simplified - in real app, get unique mothers
      });
      setLoading(false);
    });

    // Cleanup subscription
    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" variant="primary" />
        <p>Loading dashboard...</p>
      </Container>
    );
  }

  return (
    <Container>
      <h2 className="mb-4">Dashboard</h2>
      <Row>
        <Col md={3}>
          <Card className="text-center mb-3 bg-primary text-white">
            <Card.Body>
              <FaBaby size={40} />
              <h5>Total Births</h5>
              <h3>{stats.totalBirths}</h3>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center mb-3 bg-success text-white">
            <Card.Body>
              <FaFemale size={40} />
              <h5>Normal Deliveries</h5>
              <h3>{stats.normalDeliveries}</h3>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center mb-3 bg-info text-white">
            <Card.Body>
              <FaHospital size={40} />
              <h5>Today's Births</h5>
              <h3>{stats.todayBirths}</h3>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center mb-3 bg-warning text-white">
            <Card.Body>
              <FaChartLine size={40} />
              <h5>C-Section Rate</h5>
              <h3>{stats.cSectionRate}%</h3>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col md={6}>
          <Card className="mt-3">
            <Card.Header>📊 Quick Stats</Card.Header>
            <Card.Body>
              <ul className="list-unstyled">
                <li><strong>Low Birth Weight (&lt; 2.5kg):</strong> {stats.lowBirthWeight}</li>
                <li><strong>Stillbirths:</strong> {stats.stillbirths || 0}</li>
                <li><strong>Total Births:</strong> {stats.totalBirths}</li>
              </ul>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card className="mt-3">
            <Card.Header>🔄 Real-Time Sync</Card.Header>
            <Card.Body>
              <p className="text-success">✅ Connected to Firebase</p>
              <p className="text-muted small">
                Data is updated in real-time. All changes reflect immediately.
              </p>
              <div className="d-flex gap-2">
                <span className="badge bg-success">Live</span>
                <span className="badge bg-primary">Synced to HIS</span>
              </div>
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
            <li>✅ Data stored securely in Firebase Realtime Database</li>
          </ul>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Home;