import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import BirthForm from '../components/BirthForm';

function RegisterBirth() {
  return (
    <Container className="fade-in">
      <h2 className="mb-4">👶 Register New Birth</h2>
      
      <Row>
        <Col lg={8}>
          <Card>
            <Card.Header>
              <span className="text-success">●</span> Birth Registration Form
              <span className="float-end text-muted small">
                Fields with * are required
              </span>
            </Card.Header>
            <Card.Body>
              <BirthForm />
            </Card.Body>
          </Card>
        </Col>

        <Col lg={4}>
          <Card>
            <Card.Header>📋 Data Flow</Card.Header>
            <Card.Body>
              <p><strong>Maternity → Firebase → HIS</strong></p>
              <ol className="small">
                <li className="mb-2">Midwife captures birth data</li>
                <li className="mb-2">Data saved to Firebase Realtime Database</li>
                <li className="mb-2">Real-time sync to all connected clients</li>
                <li className="mb-2">Reports generated automatically</li>
                <li>Data available for national reporting</li>
              </ol>
              <hr />
              <div className="mt-3">
                <p className="text-success small mb-1">
                  <strong>✅ Status:</strong> Connected to Firebase
                </p>
                <span className="badge bg-success">Real-time</span>
                <span className="badge bg-primary ms-1">Secure</span>
                <span className="badge bg-info ms-1">Live</span>
              </div>
            </Card.Body>
          </Card>

          <Card className="mt-3">
            <Card.Header>💡 Tips</Card.Header>
            <Card.Body className="small">
              <ul className="list-unstyled">
                <li className="mb-2">🔹 Use mother's ID to prevent duplicates</li>
                <li className="mb-2">🔹 Ensure birth weight is in kilograms</li>
                <li className="mb-2">🔹 Apgar score should be between 0-10</li>
                <li>🔹 All data syncs automatically to HIS</li>
              </ul>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default RegisterBirth;