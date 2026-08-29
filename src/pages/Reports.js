import React, { useState, useEffect } from 'react';
import { Card, Table, Container, Row, Col, Button, Spinner, Alert } from 'react-bootstrap';
import { FaFileDownload, FaSync, FaClock } from 'react-icons/fa';
import { subscribeToBirths, getMonthlyReports } from '../services/firebaseService';
import DashboardStats from '../components/DashboardStats';

function Reports() {
  const [reports, setReports] = useState([]);
  const [summary, setSummary] = useState({
    totalBirths: 0,
    normalDeliveries: 0,
    cSections: 0,
    lowBirthWeight: 0,
    stillbirths: 0,
    cSectionRate: 0,
    todayBirths: 0
  });
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [error, setError] = useState(null);

  useEffect(() => {
    const unsubscribe = subscribeToBirths(async (births) => {
      try {
        calculateReports(births);
        const monthlyData = await getMonthlyReports();
        setReports(monthlyData);
        setLastUpdated(new Date());
        setLoading(false);
      } catch (err) {
        setError('Failed to load reports');
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const calculateReports = (births) => {
    const total = births.length;
    const normal = births.filter(b => b.deliveryType === 'Normal').length;
    const cSection = births.filter(b => b.deliveryType === 'C-Section').length;
    const lowWeight = births.filter(b => b.birthWeight < 2.5).length;
    const stillbirths = births.filter(b => b.babyStatus === 'Stillbirth').length;
    
    const today = new Date().toDateString();
    const todayBirths = births.filter(b => 
      b.birthDateTime && new Date(b.birthDateTime).toDateString() === today
    ).length;

    setSummary({
      totalBirths: total,
      normalDeliveries: normal,
      cSections: cSection,
      lowBirthWeight: lowWeight,
      stillbirths: stillbirths,
      cSectionRate: total > 0 ? ((cSection / total) * 100).toFixed(1) : 0,
      todayBirths: todayBirths
    });
  };

  const exportData = () => {
    const headers = ['Month', 'Total Births', 'C-Sections', 'Low Birth Weight', 'Stillbirths', 'C-Section Rate'];
    const rows = reports.map(r => [
      r.month,
      r.births,
      r.cSections,
      r.lowWeight,
      r.stillbirths,
      r.births > 0 ? ((r.cSections / r.births) * 100).toFixed(1) + '%' : '0%'
    ]);
    
    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `maternity_report_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" variant="primary" className="mb-3" />
        <p>Loading reports...</p>
      </Container>
    );
  }

  return (
    <Container className="fade-in">
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap">
        <h2>📊 Reports & Analytics</h2>
        <div className="d-flex gap-2 align-items-center">
          <span className="text-muted small">
            <FaClock className="me-1" />
            Updated: {lastUpdated.toLocaleTimeString()}
          </span>
          <Button variant="primary" onClick={exportData} size="sm">
            <FaFileDownload /> Export CSV
          </Button>
        </div>
      </div>

      {error && <Alert variant="danger">{error}</Alert>}

      <DashboardStats stats={summary} />

      <Card className="mt-4">
        <Card.Header className="d-flex justify-content-between align-items-center">
          <span>Monthly Birth Statistics</span>
          <span className="badge bg-success">
            <FaSync className="me-1" /> Live
          </span>
        </Card.Header>
        <Card.Body>
          {reports.length === 0 ? (
            <p className="text-muted text-center py-4">No data available for reports</p>
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
                    <td className="fw-bold">{row.month}</td>
                    <td>{row.births}</td>
                    <td>
                      <span className={row.cSections > 0 ? 'text-warning' : ''}>
                        {row.cSections}
                      </span>
                    </td>
                    <td>
                      <span className={row.lowWeight > 0 ? 'text-danger' : ''}>
                        {row.lowWeight}
                      </span>
                    </td>
                    <td>
                      <span className={row.stillbirths > 0 ? 'text-danger' : ''}>
                        {row.stillbirths}
                      </span>
                    </td>
                    <td>
                      <strong>
                        {row.births > 0 ? ((row.cSections / row.births) * 100).toFixed(1) : 0}%
                      </strong>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Card.Body>
      </Card>

      <Row className="mt-4">
        <Col md={6}>
          <Card>
            <Card.Header>📈 Key Insights</Card.Header>
            <Card.Body className="small">
              <ul className="list-unstyled">
                <li className="mb-2">
                  <strong>Total Births:</strong> {summary.totalBirths}
                </li>
                <li className="mb-2">
                  <strong>C-Section Rate:</strong> {summary.cSectionRate}%
                  {summary.cSectionRate > 25 && ' ⚠️ Above WHO recommendation'}
                </li>
                <li className="mb-2">
                  <strong>Low Birth Weight:</strong> {summary.lowBirthWeight} 
                  ({summary.totalBirths > 0 ? ((summary.lowBirthWeight / summary.totalBirths) * 100).toFixed(1) : 0}%)
                </li>
                <li>
                  <strong>Stillbirth Rate:</strong> {summary.stillbirths}
                  ({summary.totalBirths > 0 ? ((summary.stillbirths / summary.totalBirths) * 100).toFixed(1) : 0}%)
                </li>
              </ul>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card>
            <Card.Header>📌 System Information</Card.Header>
            <Card.Body className="small">
              <p><strong>Data Source:</strong> Firebase Realtime Database</p>
              <p><strong>Sync Status:</strong> <span className="text-success">● Connected</span></p>
              <p><strong>Records:</strong> {summary.totalBirths} birth records</p>
              <p><strong>Last Updated:</strong> {lastUpdated.toLocaleString()}</p>
              <hr />
              <div className="d-flex gap-2">
                <span className="badge bg-success">Live</span>
                <span className="badge bg-primary">Firebase</span>
                <span className="badge bg-info">Real-Time</span>
                <span className="badge bg-dark">HIS Ready</span>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Reports;