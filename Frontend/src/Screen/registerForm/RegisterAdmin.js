import React, { useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
// import { RegisterAction } from '../action/adminAction';
import { useNavigate } from 'react-router-dom';
import { Alert, AlertTitle } from '@mui/material';

//Action functions
import { RegisterAction } from '../../action/adminAction';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

function RegisterAdmin() {

    const dispatch = useDispatch()
  const [fName,setFName] = useState("")
  const [lName,setLName] = useState("")
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [cnfpassword,setCnfpassword] = useState("")

  const navigate = useNavigate()

  const {registerData,error} = useSelector((state)=>{
    return state.RegisterAdmin
  })

  const handleSubmit = async(event) => {
    event.preventDefault();
    const value = {
      fName,
      lName,
      email,
      password,
      cnfpassword
    }
  
      dispatch(RegisterAction(value));

  };


  let adminExit = localStorage.getItem("loginInfo")
  ? JSON.parse(localStorage.getItem("loginInfo"))
  : null;
  useEffect(()=>{
    if(adminExit){
      if (adminExit.isUserExist.isAdmin) {
        navigate("/");
      }else{
        navigate("/home");
      }
    }else{
      navigate("/register");

    }
    
  },[registerData])

  return (
    <ThemeProvider theme={theme}>
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        {error && (
            <Alert severity="error">
              <AlertTitle>MAKE SURE</AlertTitle>
             <strong>{error}</strong>
            </Alert>
          )}
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
              required
              onChange={(event)=>{setFName(event.target.value)}}
                autoComplete="given-name"
                name="firstName"
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
               onChange={(event)=>{setLName(event.target.value)}}
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="family-name"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
              onChange={(event)=>{setEmail(event.target.value)}}
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
               onChange={(event)=>{setPassword(event.target.value)}}
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                required
               onChange={(event)=>{setCnfpassword(event.target.value)}}
                fullWidth
                name="cnfpassword"
                label="Confirm Password"
                type="password"
                id="cnfpassword"
                autoComplete="new-password"
              />
            </Grid>

            <Grid item xs={12}>
            
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 2 }} />
    </Container>
  </ThemeProvider>
  )
}

export default RegisterAdmin