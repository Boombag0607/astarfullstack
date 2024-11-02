// Register.js
import React from "react";
import {
  Avatar,
  Button,
  TextField,
  Grid2 as Grid,
  Box,
  Typography,
  Container,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import axios from "axios";
import e from "express";

const Register = () => {
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const firstName = data.get("firstName");
    const lastName = data.get("lastName");
    const userName = data.get("username");
    const email = data.get("email");
    const password = data.get("password");
    const response = await axios.post(
      "http://localhost:3002/api/users/register",
      {
        firstName,
        lastName,
        userName,
        email,
        password,
      }
    );
    console.log({ firstName, lastName, email, password });
    console.log(response);
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <TextField
              autoComplete="given-name"
              name="firstName"
              required
              fullWidth
              id="firstName"
              label="First Name"
              autoFocus
            />

            <TextField
              required
              fullWidth
              id="lastName"
              label="Last Name"
              name="lastName"
              autoComplete="family-name"
            />

            <TextField
              required
              fullWidth
              id="username"
              label="User name"
              name="username"
              autoComplete="family-name"
            />

            <TextField
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
            />

            <TextField
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="new-password"
            />
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Button href="/login" variant="body2" color="primary">
            Already have an account? Sign in
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Register;
