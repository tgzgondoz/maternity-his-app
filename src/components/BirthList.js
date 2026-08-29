// src/components/BirthList.js
import React, { useState, useEffect } from 'react';
import { Table, Card, Badge, Button, Spinner, Alert } from 'react-bootstrap';
import { FaTrash, FaEdit, FaEye } from 'react-icons/fa';
import { subscribeToBirths, deleteBirthRecord } from '../services/firebaseService';

function BirthList() {
  const [births, setBirths] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const unsubscribe = subscribeToBirths((data) => {
      setBirths(data);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this birth record?')) {
      setDeleting(true);
      const result = await deleteBirthRecord(id);
      if (result.success) {
        setError(null);
      } else {
        setError(result.error);
      }
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <Card>
        <Card.Body className="text-center">
          <Spinner animation="border" variant="primary" />
          <p>Loading birth records...</p>
        </Card.Body>
      </Card>
    );
  }

  return (
    <Card>
      <Card.Header>
        <h5 className="mb-0">📋 Recent Birth Records</h5>
        <span className="badge bg-success float-end mt-1">Live</span>
      </Card.Header>
      <Card.Body>
        {error && <Alert variant="danger">{error}</Alert>}
        
        {births.length === 0 ? (
          <p className="text-muted text-center">No birth records found</p>
        ) : (
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Baby Name</th>
                <th>Sex</th>
                <th>Birth Weight</th>
                <th>Delivery Type</th>
                <th>Mother</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {births.slice(0, 10).map((birth) => (
                <tr key={birth.id}>
                  <td>{birth.babyName || 'Unnamed'}</td>
                  <td>{birth.sex}</td>
                  <td>{birth.birthWeight} kg</td>
                  <td>
                    <Badge bg={birth.deliveryType === 'C-Section' ? 'warning' : 'success'}>
                      {birth.deliveryType}
                    </Badge>
                  </td>
                  <td>{birth.motherName}</td>
                  <td>
                    <Badge bg={birth.babyStatus === 'Stillbirth' ? 'danger' : 'success'}>
                      {birth.babyStatus || 'Live birth'}
                    </Badge>
                  </td>
                  <td>
                    <Button variant="outline-primary" size="sm" className="me-1">
                      <FaEye />
                    </Button>
                    <Button variant="outline-danger" size="sm" onClick={() => handleDelete(birth.id)} disabled={deleting}>
                      <FaTrash />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
        {births.length > 10 && (
          <p className="text-muted small text-center">
            Showing 10 of {births.length} records
          </p>
        )}
      </Card.Body>
    </Card>
  );
}

export default BirthList;