// src/pages/RegisterBirth.js
import React, { useState } from 'react';
import { Form, Button, Card, Alert, Row, Col, Container } from 'react-bootstrap';
// REMOVE: import axios from 'axios';

function RegisterBirth() {
  const [formData, setFormData] = useState({
    babyName: '',
    sex: 'Male',
    birthDateTime: '',
    birthWeight: '',
    apgarScore: '',
    motherName: '',
    motherId: '',
    deliveryType: 'Normal',
    facility: '',
    attendingMidwife: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSubmitted(false);

    try {
      // Simulate API call
      console.log('Birth record submitted:', formData);
      setSubmitted(true);
      setFormData({
        babyName: '',
        sex: 'Male',
        birthDateTime: '',
        birthWeight: '',
        apgarScore: '',
        motherName: '',
        motherId: '',
        deliveryType: 'Normal',
        facility: '',
        attendingMidwife: ''
      });
      setTimeout(() => setSubmitted(false), 5000);
    } catch (err) {
      setError('Failed to register birth. Please try again.');
    }
  };

  return (
    <Container>
      <h2 className="mb-4">👶 Register New Birth</h2>
      
      <Row>
        <Col lg={8}>
          <Card>
            <Card.Body>
              {submitted && (
                <Alert variant="success">
                  ✅ Birth record successfully saved and synced to HIS!
                </Alert>
              )}
              {error && (
                <Alert variant="danger">{error}</Alert>
              )}

              <Form onSubmit={handleSubmit}>
                <h5>Baby Information</h5>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Baby Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="babyName"
                        value={formData.babyName}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Sex</Form.Label>
                      <Form.Select
                        name="sex"
                        value={formData.sex}
                        onChange={handleChange}
                        required
                      >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Date/Time of Birth</Form.Label>
                      <Form.Control
                        type="datetime-local"
                        name="birthDateTime"
                        value={formData.birthDateTime}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Birth Weight (kg)</Form.Label>
                      <Form.Control
                        type="number"
                        step="0.1"
                        name="birthWeight"
                        value={formData.birthWeight}
                        onChange={handleChange}
                        placeholder="e.g., 3.2"
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Apgar Score</Form.Label>
                      <Form.Control
                        type="number"
                        name="apgarScore"
                        value={formData.apgarScore}
                        onChange={handleChange}
                        placeholder="0-10"
                        min="0"
                        max="10"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Delivery Type</Form.Label>
                      <Form.Select
                        name="deliveryType"
                        value={formData.deliveryType}
                        onChange={handleChange}
                        required
                      >
                        <option value="Normal">Normal</option>
                        <option value="C-Section">C-Section</option>
                        <option value="Assisted">Assisted</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>

                <h5 className="mt-3">Mother Information</h5>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Mother's Full Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="motherName"
                        value={formData.motherName}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Mother's ID / Hospital Number</Form.Label>
                      <Form.Control
                        type="text"
                        name="motherId"
                        value={formData.motherId}
                        onChange={handleChange}
                        required
                        placeholder="National ID or Hospital No."
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Facility</Form.Label>
                      <Form.Control
                        type="text"
                        name="facility"
                        value={formData.facility}
                        onChange={handleChange}
                        placeholder="e.g., Harare Hospital"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Attending Midwife</Form.Label>
                      <Form.Control
                        type="text"
                        name="attendingMidwife"
                        value={formData.attendingMidwife}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Button type="submit" variant="primary" size="lg">
                  Register Birth & Sync to HIS
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={4}>
          <Card>
            <Card.Header>📋 Data Flow</Card.Header>
            <Card.Body>
              <p><strong>Maternity → HIS Integration</strong></p>
              <ol className="small">
                <li>Midwife captures birth data</li>
                <li>Data entered into maternity system</li>
                <li>Auto-sync to DHIS2/HIS</li>
                <li>Reports generated at district level</li>
              </ol>
              <hr />
              <p className="text-muted small">
                <strong>Note:</strong> Mother's ID links baby to antenatal records.
                Prevents duplicate entries.
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default RegisterBirth;