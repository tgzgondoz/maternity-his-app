import React from 'react';
import { Navbar as BootNavbar, Nav, Container, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaHome, FaBaby, FaList, FaChartBar } from 'react-icons/fa';

function Navbar() {
  return (
    <BootNavbar bg="primary" variant="dark" expand="lg" className="shadow-sm">
      <Container>
        <BootNavbar.Brand as={Link} to="/" className="fw-bold">
          <span className="me-2">🏥</span>
          Maternity-HIS Link
          <Badge bg="success" className="ms-2 small">LIVE</Badge>
        </BootNavbar.Brand>
        <BootNavbar.Toggle aria-controls="basic-navbar-nav" />
        <BootNavbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/" className="px-3">
              <FaHome className="me-1" /> Dashboard
            </Nav.Link>
            <Nav.Link as={Link} to="/register" className="px-3">
              <FaBaby className="me-1" /> Register Birth
            </Nav.Link>
            <Nav.Link as={Link} to="/records" className="px-3">
              <FaList className="me-1" /> Birth Records
            </Nav.Link>
            <Nav.Link as={Link} to="/reports" className="px-3">
              <FaChartBar className="me-1" /> Reports
            </Nav.Link>
          </Nav>
        </BootNavbar.Collapse>
      </Container>
    </BootNavbar>
  );
}

export default Navbar;