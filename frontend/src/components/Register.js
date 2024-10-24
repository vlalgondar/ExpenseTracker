import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Typography, Card, CardContent, Grid, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const API_URL = process.env.REACT_APP_API_URL || "http://127.0.0.1:8000"; 


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/api/register/`, {
        username,
        password,
        email,
      });
      // Redirect to login page
      navigate('/login');
    } catch (error) {
      console.error('Registration failed:', error);
      setErrorMessage('Registration failed. Please try again.');
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Sign Up
      </Typography>
      <Card>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              {errorMessage && (
                <Grid item xs={12}>
                  <Typography color="error">{errorMessage}</Typography>
                </Grid>
              )}
              <Grid item xs={12}>
                <TextField
                  label="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <Button variant="contained" color="primary" type="submit">
                  Sign Up
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body2">
                  Already have an account?{' '}
                  <Button color="primary" onClick={() => navigate('/login')}>
                    Login
                  </Button>
                </Typography>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
    </Container>
  );
}

export default Register;
