import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
// import { AdminLoginAction } from "../action/adminAction";
import { useNavigate } from "react-router-dom";
import { Alert, AlertTitle } from "@mui/material";
import { AdminLoginAction } from "../../action/adminAction";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function AdminLogin() {
  const dispatch = useDispatch();

  const { loading, error, Login } = useSelector((state) => {
    return state.AdminLogin;
  });
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    dispatch(
      AdminLoginAction({
        email: data.get("email"),
        password: data.get("password"),
      })
    );
  };
  let adminExit = localStorage.getItem("loginInfo")
    ? JSON.parse(localStorage.getItem("loginInfo"))
    : null;
  useEffect(() => {
    if (adminExit) {
      if (adminExit.isUserExist.isAdmin) {
        navigate("/");
      } else {
        navigate("/userHome");
      }
    } else {
      navigate("/login");
    }
  }, [Login]);
  
  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: "url(https://source.unsplash.com/random)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            {error && (
              <Alert severity="error">
                <AlertTitle>MAKE SURE</AlertTitle>
               <strong>{error}</strong>
              </Alert>
            )}
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
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
              <Grid container>
                <Grid item>
                  <Link href="/register" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}



// import React from 'react'

// import {
//     // Checkbox,
//     Grid,
//     TextField,
//     // FormControlLabel,
//     Paper,
//     Button
//   } from '@mui/material';

// function AdminLogin() {
//     // const [checked, setChecked] = React.useState(true);

// //   const handleChange = (event) => {
// //     setChecked(event.target.checked);
// //   };

//   return (
//     <div style={{ padding: 35 }}>
//       <Paper>
//         <Grid
//           container
//           spacing={3}
//           direction={'column'}
//           justify={'center'}
//           alignItems={'center'}
//         >
//           <Grid item xs={12}>
//             <TextField label="Username"></TextField>
//           </Grid>
//           <Grid item xs={12}>
//             <TextField label="Password" type={'password'}></TextField>
//           </Grid>
//           <Grid item xs={12}>
//             {/* <FormControlLabel
//               control={
//                 <Checkbox
//                   checked={checked}
//                   onChange={handleChange}
//                   label={'Keep me logged in'}
//                   inputProps={{ 'aria-label': 'primary checkbox' }}
//                 />
//               }
//               label="Keep me logged in"
//             /> */}
//           </Grid>
//           <Grid item xs={13}>
//             <Button type="submit" variant="contained" fullWidth> Login </Button>
//           </Grid>
//         </Grid>
//       </Paper>
//     </div>
//   )
// }

// export default AdminLogin


