// src/components/Navbar.js
import React from 'react';
import { Navbar as BootNavbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <BootNavbar bg="primary" variant="dark" expand="lg">
      <Container>
        <BootNavbar.Brand as={Link} to="/">
          🏥 Maternity-HIS Link
        </BootNavbar.Brand>
        <Nav className="ms-auto">
          <Nav.Link as={Link} to="/">Dashboard</Nav.Link>
          <Nav.Link as={Link} to="/register">Register Birth</Nav.Link>
          <Nav.Link as={Link} to="/records">Birth Records</Nav.Link>
          <Nav.Link as={Link} to="/reports">Reports</Nav.Link>
        </Nav>
      </Container>
    </BootNavbar>
  );
}

export default Navbar;