import React, { useState } from 'react';
import { Form, Button, Card, Alert, Row, Col, Spinner } from 'react-bootstrap';
import { saveBirthRecord } from '../services/firebaseService';

function BirthForm({ onSuccess }) {
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
    attendingMidwife: '',
    babyStatus: 'Live birth'
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [recordId, setRecordId] = useState(null);

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
    setLoading(true);

    try {
      const result = await saveBirthRecord(formData);
      
      if (result.success) {
        setRecordId(result.id);
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
          attendingMidwife: '',
          babyStatus: 'Live birth'
        });

        if (onSuccess) onSuccess();
        setTimeout(() => {
          setSubmitted(false);
          setRecordId(null);
        }, 5000);
      } else {
        setError(result.error || 'Failed to save birth record');
      }
    } catch (err) {
      setError('Failed to register birth. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      {submitted && (
        <Alert variant="success" className="fade-in">
          <strong>✅ Birth record successfully saved!</strong>
          <br />
          <span className="text-muted small">
            Record ID: {recordId} • Data synced to Firebase in real-time
          </span>
        </Alert>
      )}
      {error && (
        <Alert variant="danger" onClose={() => setError(null)} dismissible>
          {error}
        </Alert>
      )}

      <h5 className="mb-3">👶 Baby Information</h5>
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
              placeholder="Enter baby's name"
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
            <Form.Label>Apgar Score (0-10)</Form.Label>
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

      <Row>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Baby Status</Form.Label>
            <Form.Select
              name="babyStatus"
              value={formData.babyStatus}
              onChange={handleChange}
            >
              <option value="Live birth">Live birth</option>
              <option value="Stillbirth">Stillbirth</option>
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>

      <h5 className="mt-3 mb-3">👩 Mother Information</h5>
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
              placeholder="Enter mother's full name"
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
              placeholder="Enter midwife's name"
            />
          </Form.Group>
        </Col>
      </Row>

      <Button type="submit" variant="primary" size="lg" disabled={loading} className="w-100">
        {loading ? (
          <>
            <Spinner animation="border" size="sm" className="me-2" />
            Saving...
          </>
        ) : (
          'Register Birth & Sync to HIS'
        )}
      </Button>
    </Form>
  );
}

export default BirthForm;