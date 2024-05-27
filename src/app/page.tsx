'use client'
import { Avatar, Button, CssBaseline, TextField, FormControlLabel, Checkbox, Link, Grid, Box, Typography, Container } from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { login } from '@/lib/api/employee';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Maveriks Training
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default function SignIn() {

  const router = useRouter()
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    login({
      username: data.get('username')?.toString() ?? '',
      password: data.get('password')?.toString() ?? '',
    }).then( res => {
      if (res.status >= 400) throw new Error(res.data)

      router.push('/explore?page=1')
    }).catch( err => {
      setErrorMessage("Wrong Password or Username")
      setTimeout(() => {
        setErrorMessage('')
      }, 2000)
    })
  };

  return (
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
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container direction="row"
              justifyContent="space-between"
              alignItems="center">
              <Grid item>
                <Link href="#" variant="body2">
                  {"Register an account."}
                </Link>
              </Grid>
              <Grid item>
                {errorMessage &&
                  
                  <Typography style={{
                  color: '#cb2431',
                  border: '1px solid #cb2431',
                  borderRadius : '4px',
                  backgroundColor: '#ffdce0',
                  padding: '8px 8px'
                }}>
                  {errorMessage}
                </Typography>}
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
  );
}