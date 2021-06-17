import React, { useState } from 'react';
import { useRef } from 'react';
import { Alert, Button, Card, Form } from 'react-bootstrap';
import { useAuth } from './contexts/AuthContext';
import { Link, useHistory } from 'react-router-dom';

const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setError('');
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      history.push('/');
    } catch (error) {
      setError('Failed to log in');
    }
    setLoading(false);
  };

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className='text-center mb-4'>Log In</h2>

          {error && <Alert variant='danger'>{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id='email'>
              <Form.Label>Email</Form.Label>
              <Form.Control type='email' ref={emailRef} required />
            </Form.Group>
            <Form.Group id='password'>
              <Form.Label>password</Form.Label>
              <Form.Control type='password' ref={passwordRef} required />
            </Form.Group>

            <Button disabled={loading} className='w-100 mt-2' type='submit'>
              Log In
            </Button>
          </Form>
          <div className='w-100 text-center mt-2'>
            <Link to='/forgot-password'>Forgot Password</Link>
          </div>
        </Card.Body>
      </Card>
      <div className='w-100 text-center mt-2'>
        Need An account? <Link to='/signup'>Sign Up</Link>
      </div>
    </>
  );
};

export default Login;
