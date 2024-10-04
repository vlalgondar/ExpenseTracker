// src/components/Login.js
import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Typography, Card, CardContent, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const API_URL = process.env.REACT_APP_API_URL || "http://127.0.0.1:8000"; 

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('${API_URL}/api/token/', {
        username,
        password,
      });
      const { access, refresh } = response.data;
      localStorage.setItem('access_token', access);
      localStorage.setItem('refresh_token', refresh);
      onLogin();
    } catch (error) {
      console.error('Login failed:', error);
      setErrorMessage('Invalid username or password');
    }
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Login
      </Typography>
      <Card>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                {errorMessage && (
                  <Typography color="error" variant="body2">
                    {errorMessage}
                  </Typography>
                )}
              </Grid>
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
                  Login
                </Button>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body2">
                Don't have an account?{' '}
                <Button color="primary" onClick={() => navigate('/register')}>
                  Sign Up
                </Button>
              </Typography>
            </Grid>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default Login;
