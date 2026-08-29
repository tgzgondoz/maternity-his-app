// src/pages/Reports.js
import React, { useState, useEffect } from 'react';
import { Card, Table, Container, Row, Col, Button } from 'react-bootstrap';
import { FaFileDownload } from 'react-icons/fa'; // REMOVED FaChartBar

function Reports() {
  const [reports, setReports] = useState({
    monthly: [],
    summary: {
      totalBirths: 0,
      normalDeliveries: 0,
      cSections: 0,
      lowBirthWeight: 0,
      stillbirths: 0
    }
  });

  useEffect(() => {
    setReports({
      monthly: [
        { month: 'January', births: 102, cSections: 28, lowWeight: 8, stillbirths: 2 },
        { month: 'February', births: 95, cSections: 22, lowWeight: 6, stillbirths: 1 },
        { month: 'March', births: 110, cSections: 32, lowWeight: 10, stillbirths: 3 }
      ],
      summary: {
        totalBirths: 1245,
        normalDeliveries: 896,
        cSections: 349,
        lowBirthWeight: 87,
        stillbirths: 23
      }
    });
  }, []);

  return (
    <Container>
      <h2 className="mb-4">📊 Reports</h2>
      
      <Row>
        <Col md={3}>
          <Card className="text-center bg-primary text-white">
            <Card.Body>
              <h5>Total Births</h5>
              <h3>{reports.summary.totalBirths}</h3>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center bg-success text-white">
            <Card.Body>
              <h5>Normal Deliveries</h5>
              <h3>{reports.summary.normalDeliveries}</h3>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center bg-warning text-white">
            <Card.Body>
              <h5>C-Sections</h5>
              <h3>{reports.summary.cSections}</h3>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center bg-danger text-white">
            <Card.Body>
              <h5>Low Birth Weight</h5>
              <h3>{reports.summary.lowBirthWeight}</h3>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Card className="mt-4">
        <Card.Header className="d-flex justify-content-between align-items-center">
          <span>Monthly Birth Statistics</span>
          <Button variant="outline-primary" size="sm">
            <FaFileDownload /> Export Report
          </Button>
        </Card.Header>
        <Card.Body>
          <Table striped bordered hover>
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
              {reports.monthly.map((row, index) => (
                <tr key={index}>
                  <td>{row.month}</td>
                  <td>{row.births}</td>
                  <td>{row.cSections}</td>
                  <td>{row.lowWeight}</td>
                  <td>{row.stillbirths}</td>
                  <td>{((row.cSections / row.births) * 100).toFixed(1)}%</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      <Card className="mt-4">
        <Card.Header>📌 Note</Card.Header>
        <Card.Body>
          <p className="text-muted">
            This data is automatically synced from maternity records to the 
            Health Information System (HIS). District and national offices 
            can access this information for decision making.
          </p>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Reports;