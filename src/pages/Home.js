import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Spinner } from 'react-bootstrap';
import { FaDatabase, FaCloud, FaShieldAlt, FaClock } from 'react-icons/fa';
import DashboardStats from '../components/DashboardStats';
import BirthList from '../components/BirthList';
import { subscribeToStats } from '../services/firebaseService';

function Home() {
  const [stats, setStats] = useState({
    totalBirths: 0,
    todayBirths: 0,
    normalDeliveries: 0,
    cSections: 0,
    lowBirthWeight: 0,
    stillbirths: 0,
    cSectionRate: 0
  });
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  useEffect(() => {
    const unsubscribe = subscribeToStats((statsData) => {
      setStats(statsData);
      setLoading(false);
      setLastUpdated(new Date());
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" variant="primary" className="mb-3" />
        <p>Loading dashboard...</p>
      </Container>
    );
  }

  return (
    <Container className="fade-in">
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap">
        <h2>📊 Dashboard</h2>
        <div className="text-muted small">
          <FaClock className="me-1" />
          Last updated: {lastUpdated.toLocaleTimeString()}
        </div>
      </div>

      <DashboardStats stats={stats} />

      <Row className="mt-4">
        <Col lg={8}>
          <BirthList />
        </Col>
        <Col lg={4}>
          <Card>
            <Card.Header>🔄 System Status</Card.Header>
            <Card.Body>
              <div className="d-flex align-items-center mb-3">
                <span className="badge bg-success me-2">●</span>
                <span>Firebase Connected</span>
              </div>
              <div className="d-flex align-items-center mb-3">
                <span className="badge bg-primary me-2">●</span>
                <span>Real-time Sync Active</span>
              </div>
              <div className="d-flex align-items-center mb-3">
                <span className="badge bg-info me-2">●</span>
                <span>{stats.totalBirths} Total Records</span>
              </div>
              <hr />
              <div className="small text-muted">
                <p><FaDatabase className="me-1" /> Data stored securely in Firebase Realtime Database</p>
                <p><FaCloud className="me-1" /> Auto-sync to Health Information System</p>
                <p><FaShieldAlt className="me-1" /> Secure data transmission</p>
              </div>
            </Card.Body>
          </Card>

          <Card className="mt-3">
            <Card.Header>📋 Quick Actions</Card.Header>
            <Card.Body>
              <div className="d-grid gap-2">
                <a href="/register" className="btn btn-primary">👶 Register New Birth</a>
                <a href="/records" className="btn btn-outline-primary">📋 View All Records</a>
                <a href="/reports" className="btn btn-outline-secondary">📊 Generate Reports</a>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Home;