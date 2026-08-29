import React, { useState, useEffect } from 'react';
import { Table, Card, Badge, Button, Spinner, Alert, Container, Pagination, Form } from 'react-bootstrap';
import { FaTrash, FaEdit, FaEye, FaSearch, FaSync } from 'react-icons/fa';
import { subscribeToBirths, deleteBirthRecord } from '../services/firebaseService';

function BirthList() {
  const [births, setBirths] = useState([]);
  const [filteredBirths, setFilteredBirths] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  useEffect(() => {
    const unsubscribe = subscribeToBirths((data) => {
      setBirths(data);
      setFilteredBirths(data);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const filtered = births.filter(birth => 
      birth.babyName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      birth.motherName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      birth.motherId?.includes(searchTerm)
    );
    setFilteredBirths(filtered);
    setCurrentPage(1);
  }, [searchTerm, births]);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this birth record?')) {
      setDeleting(true);
      const result = await deleteBirthRecord(id);
      if (!result.success) {
        setError(result.error);
      }
      setDeleting(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-ZA', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredBirths.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredBirths.length / itemsPerPage);

  if (loading) {
    return (
      <Card className="text-center p-5">
        <Spinner animation="border" variant="primary" className="mx-auto" />
        <p className="mt-3">Loading birth records...</p>
      </Card>
    );
  }

  return (
    <Card>
      <Card.Header className="d-flex justify-content-between align-items-center flex-wrap">
        <h5 className="mb-0">📋 Birth Records</h5>
        <div className="d-flex gap-2 flex-wrap">
          <Badge bg="success" className="p-2">
            <FaSync className="me-1" /> Live
          </Badge>
          <span className="text-muted small">
            Total: {filteredBirths.length} records
          </span>
        </div>
      </Card.Header>
      <Card.Body>
        {error && <Alert variant="danger" onClose={() => setError(null)} dismissible>{error}</Alert>}
        
        <div className="d-flex justify-content-between mb-3 flex-wrap gap-2">
          <div className="d-flex gap-2">
            <Form.Control
              type="text"
              placeholder="Search by name or ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ width: '250px' }}
            />
            <Button variant="outline-secondary">
              <FaSearch />
            </Button>
          </div>
          <div>
            <span className="text-muted small">
              Showing {currentItems.length} of {filteredBirths.length} records
            </span>
          </div>
        </div>

        {filteredBirths.length === 0 ? (
          <p className="text-muted text-center py-4">
            {searchTerm ? 'No matching records found' : 'No birth records available'}
          </p>
        ) : (
          <>
            <Table striped bordered hover responsive className="mb-3">
              <thead>
                <tr>
                  <th>Baby Name</th>
                  <th>Sex</th>
                  <th>Birth Weight</th>
                  <th>Delivery Type</th>
                  <th>Mother</th>
                  <th>Date/Time</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((birth) => (
                  <tr key={birth.id}>
                    <td className="fw-bold">{birth.babyName || 'Unnamed'}</td>
                    <td>
                      <Badge bg={birth.sex === 'Male' ? 'primary' : 'danger'}>
                        {birth.sex}
                      </Badge>
                    </td>
                    <td>{birth.birthWeight} kg</td>
                    <td>
                      <Badge bg={birth.deliveryType === 'C-Section' ? 'warning' : 'success'}>
                        {birth.deliveryType}
                      </Badge>
                    </td>
                    <td>
                      <div className="small">
                        <div>{birth.motherName}</div>
                        <div className="text-muted">ID: {birth.motherId}</div>
                      </div>
                    </td>
                    <td className="small">{formatDate(birth.birthDateTime)}</td>
                    <td>
                      <Badge bg={birth.babyStatus === 'Stillbirth' ? 'danger' : 'success'}>
                        {birth.babyStatus || 'Live birth'}
                      </Badge>
                    </td>
                    <td>
                      <Button variant="outline-primary" size="sm" className="me-1" title="View">
                        <FaEye />
                      </Button>
                      <Button variant="outline-danger" size="sm" onClick={() => handleDelete(birth.id)} disabled={deleting} title="Delete">
                        <FaTrash />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>

            {totalPages > 1 && (
              <Pagination className="justify-content-center">
                <Pagination.First onClick={() => setCurrentPage(1)} disabled={currentPage === 1} />
                <Pagination.Prev onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1} />
                {[...Array(totalPages)].map((_, i) => (
                  <Pagination.Item 
                    key={i + 1} 
                    active={i + 1 === currentPage}
                    onClick={() => setCurrentPage(i + 1)}
                  >
                    {i + 1}
                  </Pagination.Item>
                ))}
                <Pagination.Next onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages} />
                <Pagination.Last onClick={() => setCurrentPage(totalPages)} disabled={currentPage === totalPages} />
              </Pagination>
            )}
          </>
        )}
      </Card.Body>
    </Card>
  );
}

export default BirthList;