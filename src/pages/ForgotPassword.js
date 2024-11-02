import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Paper,
} from "@mui/material";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setEmailSent(true);
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 4, mt: 6 }}>
        <Typography variant="h4" gutterBottom align="center">
          Forgot Password
        </Typography>
        <Typography
          variant="body1"
          gutterBottom
          align="center"
          color="textSecondary"
        >
          Enter your email address to receive a link to reset your password.
        </Typography>

        {!emailSent ? (
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
            <TextField
              label="Email Address"
              variant="outlined"
              fullWidth
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{ mb: 3 }}
            />
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Send Reset Link
            </Button>
          </Box>
        ) : (
          <Typography
            variant="body1"
            color="primary"
            align="center"
            sx={{ mt: 2 }}
          >
            A password reset link has been sent to your email.
          </Typography>
        )}
      </Paper>
    </Container>
  );
};

export default ForgotPassword;
