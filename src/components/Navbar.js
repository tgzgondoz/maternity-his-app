// src/components/Navbar.js
import React from 'react';
import { Navbar as BootNavbar, Nav, Container, Badge, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { FaHome, FaBaby, FaList, FaChartBar, FaSignOutAlt, FaUser } from 'react-icons/fa';

function Navbar({ onLogout }) {
  const navigate = useNavigate();
  const username = sessionStorage.getItem('username') || 'User';

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    }
    navigate('/login');
  };

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
          <Nav className="ms-auto align-items-center">
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
            
            <Nav.Link className="px-3 text-light" style={{ opacity: 0.7 }}>
              <FaUser className="me-1" /> {username}
            </Nav.Link>
            
            <Button 
              variant="outline-light" 
              size="sm" 
              onClick={handleLogout}
              className="ms-2"
            >
              <FaSignOutAlt className="me-1" /> Logout
            </Button>
          </Nav>
        </BootNavbar.Collapse>
      </Container>
    </BootNavbar>
  );
}

export default Navbar;