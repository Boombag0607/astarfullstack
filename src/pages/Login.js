import { useState } from "react";
import {
  Avatar,
  Button,
  TextField,
  Checkbox,
  FormControlLabel,
  Grid2 as Grid,
  Box,
  Typography,
  Container,
  Snackbar,
  Alert,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
    navigate("/"); // Navigate back to login page or home page after closing Snackbar
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get("email");
    const password = data.get("password");
    console.log({ email, password });
    try {
      const response = await axios.post(
        "http://localhost:3002/api/users/login",
        {
          email,
          password,
        }
      );
      console.log(response);
      if (response.data && response.data.token) {
        localStorage.setItem("token", response.data.token);
        
        if (response.data.user) {
          const userDetails = {
            name: response.data.user.name,
            email: response.data.user.email,
          };
          localStorage.setItem("userDetails", JSON.stringify(userDetails));
        }
        navigate("/loggedin");
      } else if (response.status === 400) {
        setOpenSnackbar(true);
        console.log("Login failed: Token not found");
      }
    } catch (error) {
      setOpenSnackbar(true);
      console.error("Error logging in:", error);
    }
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
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
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
            <Grid xs>
              <Button href="/forgotpwd" variant="body2" color="primary">
                Forgot password?
              </Button>
            </Grid>
            <Grid>
              <Button href="/register" variant="body2" color="primary">
                {"Don't have an account? Sign Up"}
              </Button>
            </Grid>
          </Grid>
        </Box>
        <Snackbar
          open={openSnackbar}
          autoHideDuration={3000}
          onClose={handleSnackbarClose}
        >
          <Alert
            onClose={handleSnackbarClose}
            severity="error"
            sx={{ width: "100%" }}
          >
            User does not exist. Please try again.
          </Alert>
        </Snackbar>
      </Box>
    </Container>
  );
};

export default Login;
