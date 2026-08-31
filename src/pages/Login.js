// src/pages/Login.js
import React, { useState } from 'react';
import { 
  Container, 
  Row, 
  Col, 
  Card, 
  Form, 
  Button, 
  Alert,
  InputGroup,
  Spinner
} from 'react-bootstrap';
import { 
  FaUser, 
  FaLock, 
  FaBaby, 
  FaHeartbeat,
  FaEye,
  FaEyeSlash
} from 'react-icons/fa';

function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // HARDCODED CREDENTIALS
  const VALID_USERNAME = 'admin';
  const VALID_PASSWORD = 'admin123';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Check credentials
    if (username === VALID_USERNAME && password === VALID_PASSWORD) {
      // Store login state in session storage
      sessionStorage.setItem('isLoggedIn', 'true');
      sessionStorage.setItem('username', username);
      
      if (onLogin) {
        onLogin();
      }
    } else {
      setError('Invalid username or password. Please try again.');
    }
    
    setLoading(false);
  };

  return (
    <div 
      className="login-page"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #0d6efd 0%, #0a58ca 50%, #084298 100%)',
        padding: '20px',
      }}
    >
      <Container>
        <Row className="justify-content-center">
          <Col md={6} lg={5} xl={4}>
            <Card className="shadow-lg border-0" style={{ borderRadius: '15px' }}>
              <Card.Body className="p-4 p-md-5">
                {/* Logo / Header */}
                <div className="text-center mb-4">
                  <div className="login-icon mb-3">
                    <FaBaby size={40} className="text-primary" />
                    <FaHeartbeat size={30} className="text-danger mx-2" />
                  </div>
                  <h3 className="fw-bold text-primary">Maternity-HIS</h3>
                  <p className="text-muted small">Birth Records Integration System</p>
                </div>

                <hr className="mb-4" />

                {error && (
                  <Alert variant="danger" className="mb-3">
                    {error}
                  </Alert>
                )}

                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label className="fw-semibold">
                      <FaUser className="me-2" /> Username
                    </Form.Label>
                    <InputGroup>
                      <InputGroup.Text>
                        <FaUser />
                      </InputGroup.Text>
                      <Form.Control
                        type="text"
                        placeholder="Enter username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        autoFocus
                      />
                    </InputGroup>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label className="fw-semibold">
                      <FaLock className="me-2" /> Password
                    </Form.Label>
                    <InputGroup>
                      <InputGroup.Text>
                        <FaLock />
                      </InputGroup.Text>
                      <Form.Control
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                      <Button
                        variant="outline-secondary"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </Button>
                    </InputGroup>
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Check
                      type="checkbox"
                      label="Remember me"
                    />
                  </Form.Group>

                  <Button 
                    type="submit" 
                    variant="primary" 
                    size="lg" 
                    className="w-100"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Spinner 
                          as="span" 
                          animation="border" 
                          size="sm" 
                          role="status" 
                          aria-hidden="true" 
                          className="me-2"
                        />
                        Logging in...
                      </>
                    ) : (
                      'Sign In'
                    )}
                  </Button>
                </Form>

                <div className="text-center mt-4">
                  <p className="text-muted small mb-0">
                    <strong>Demo Credentials:</strong>
                  </p>
                  <p className="text-muted small">
                    Username: <code className="bg-light px-2 py-1 rounded">admin</code>
                    <br />
                    Password: <code className="bg-light px-2 py-1 rounded">admin123</code>
                  </p>
                </div>

                <hr className="my-4" />

                <div className="text-center">
                  <p className="text-muted small mb-0">
                    <FaHeartbeat className="text-danger me-1" />
                    Secure Health Information System
                  </p>
                  <p className="text-muted small">
                    © 2024 Ministry of Health
                  </p>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Login;