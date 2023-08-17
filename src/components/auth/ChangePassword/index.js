import * as React from 'react';
import {useNavigate} from "react-router-dom"
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import * as api from "../../../api";

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}


const defaultTheme = createTheme();

export default function ChangePassword() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const input = new FormData(event.currentTarget);
    const regisForm = {
      NEW_PASSWORD: input.get('NEW_PASSWORD'),
      CONFIRM_PASSWORD: input.get('CONFIRM_PASSWORD'),
    };
    try {
      const response = await api.fetchChangePassword(regisForm, {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
      });
      if (response.status === 200) {
        navigate('/');
      } else {
        console.error('Password change request failed:', response.data);
      }
    } catch (error) {
        console.error('Error while changing password:', error);
    }
  };
  
  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Change password
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              name="NEW_PASSWORD"
              label="New Password"
              type="NEW_PASSWORD"
              id="NEW_PASSWORD"
              autoComplete="current-password"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="CONFIRM_PASSWORD"
              label="Confirm Password"
              type="CONFIRM_PASSWORD"
              id="CONFIRM_PASSWORD"
              autoComplete="confirm-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Submit
            </Button>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}