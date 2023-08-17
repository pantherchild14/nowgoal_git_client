import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Alert } from '@mui/material';

import * as api from '../../../api';

function SignIn() {
  const [errorMessage, setErrorMessage] = React.useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const input = new FormData(event.currentTarget);
    const regisForm = {
      EMAIL: input.get('EMAIL'),
      PASSWORD: input.get('PASSWORD'),
    };

    try {
      const response = await api.fetchLogin(regisForm);

      if (response.status === 200) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('USER_NAME', response.data.USER_NAME);
        localStorage.setItem('EMAIL', response.data.EMAIL);
        localStorage.setItem('ROLE', response.data.ROLE);
        window.location.href = '/';
      } else {
        setErrorMessage('Entered wrong information!');
      }
    } catch (error) {
      setErrorMessage('An error occurred. Please try again later.');
      console.error('Error during login:', error);
    }
  };

  const defaultTheme = createTheme();

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
            Sign in
          </Typography>
          {errorMessage && (
            <Alert severity="error" sx={{ mt: 2, mb: 2 }}>
              {errorMessage}
            </Alert>
          )}
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="EMAIL"
              label="Email Address"
              name="EMAIL"
              autoComplete="EMAIL"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="PASSWORD"
              label="Password"
              type="PASSWORD"
              id="PASSWORD"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        {/* Rest of your UI code */}
      </Container>
    </ThemeProvider>
  );
}

export default SignIn;
