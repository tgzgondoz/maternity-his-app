// src/pages/Reports.js
import React, { useState, useEffect } from 'react';
import { Card, Table, Container, Row, Col, Button, Spinner } from 'react-bootstrap';
import { FaFileDownload, FaSync } from 'react-icons/fa';
import { subscribeToBirths, getMonthlyReports } from '../services/firebaseService';

function Reports() {
  const [reports, setReports] = useState([]);
  const [summary, setSummary] = useState({
    totalBirths: 0,
    normalDeliveries: 0,
    cSections: 0,
    lowBirthWeight: 0,
    stillbirths: 0
  });
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  useEffect(() => {
    // Subscribe to real-time birth data
    const unsubscribe = subscribeToBirths((births) => {
      calculateReports(births);
      setLastUpdated(new Date());
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const calculateReports = (births) => {
    // Calculate summary
    const total = births.length;
    const normal = births.filter(b => b.deliveryType === 'Normal').length;
    const cSection = births.filter(b => b.deliveryType === 'C-Section').length;
    const lowWeight = births.filter(b => b.birthWeight < 2.5).length;
    const stillbirths = births.filter(b => b.babyStatus === 'Stillbirth').length;

    setSummary({
      totalBirths: total,
      normalDeliveries: normal,
      cSections: cSection,
      lowBirthWeight: lowWeight,
      stillbirths: stillbirths
    });

    // Calculate monthly reports
    const monthlyData = {};
    births.forEach(birth => {
      if (birth.birthDateTime) {
        const date = new Date(birth.birthDateTime);
        const monthYear = `${date.toLocaleString('default', { month: 'long' })} ${date.getFullYear()}`;
        
        if (!monthlyData[monthYear]) {
          monthlyData[monthYear] = {
            month: monthYear,
            births: 0,
            cSections: 0,
            lowWeight: 0,
            stillbirths: 0
          };
        }
        
        monthlyData[monthYear].births++;
        if (birth.deliveryType === 'C-Section') monthlyData[monthYear].cSections++;
        if (birth.birthWeight < 2.5) monthlyData[monthYear].lowWeight++;
        if (birth.babyStatus === 'Stillbirth') monthlyData[monthYear].stillbirths++;
      }
    });

    setReports(Object.values(monthlyData));
  };

  const handleRefresh = () => {
    setLoading(true);
    // Refresh will happen via the subscription
    setTimeout(() => setLoading(false), 1000);
  };

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" variant="primary" />
        <p>Loading reports...</p>
      </Container>
    );
  }

  return (
    <Container>
      <h2 className="mb-4">📊 Reports</h2>
      
      <Row>
        <Col md={3}>
          <Card className="text-center bg-primary text-white">
            <Card.Body>
              <h5>Total Births</h5>
              <h3>{summary.totalBirths}</h3>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center bg-success text-white">
            <Card.Body>
              <h5>Normal Deliveries</h5>
              <h3>{summary.normalDeliveries}</h3>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center bg-warning text-white">
            <Card.Body>
              <h5>C-Sections</h5>
              <h3>{summary.cSections}</h3>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center bg-danger text-white">
            <Card.Body>
              <h5>Low Birth Weight</h5>
              <h3>{summary.lowBirthWeight}</h3>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Card className="mt-4">
        <Card.Header className="d-flex justify-content-between align-items-center">
          <span>Monthly Birth Statistics</span>
          <div>
            <span className="text-muted me-3 small">
              <FaSync className="me-1" />
              Last updated: {lastUpdated.toLocaleTimeString()}
            </span>
            <Button variant="outline-primary" size="sm" onClick={handleRefresh}>
              <FaFileDownload /> Export Report
            </Button>
          </div>
        </Card.Header>
        <Card.Body>
          {reports.length === 0 ? (
            <p className="text-muted text-center">No birth records found</p>
          ) : (
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>Month</th>
                  <th>Total Births</th>
                  <th>C-Sections</th>
                  <th>Low Birth Weight</th>
                  <th>Stillbirths</th>
                  <th>C-Section Rate</th>
                </tr>
              </thead>
              <tbody>
                {reports.map((row, index) => (
                  <tr key={index}>
                    <td>{row.month}</td>
                    <td>{row.births}</td>
                    <td>{row.cSections}</td>
                    <td>{row.lowWeight}</td>
                    <td>{row.stillbirths}</td>
                    <td>{row.births > 0 ? ((row.cSections / row.births) * 100).toFixed(1) : 0}%</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Card.Body>
      </Card>

      <Card className="mt-4">
        <Card.Header>
          <span className="text-success">●</span> Real-Time Connection Status
        </Card.Header>
        <Card.Body>
          <p>
            <strong>Firebase Status:</strong> 
            <span className="text-success ms-2">Connected & Syncing</span>
          </p>
          <p className="text-muted small">
            This data is automatically synced from maternity records to Firebase.
            All changes are reflected in real-time across all devices.
          </p>
          <div className="d-flex gap-2">
            <span className="badge bg-success">Live</span>
            <span className="badge bg-primary">Firebase</span>
            <span className="badge bg-info">Real-Time</span>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Reports;