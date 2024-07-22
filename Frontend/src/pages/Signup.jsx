import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useRegisterMutation } from "../api/authApi";
import { setCredentials } from "../features/authSlice";
import { TextField, Button, Typography, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [register, { isLoading }] = useRegisterMutation();
  const [credentials, setCredentialsState] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setCredentialsState({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await register(credentials).unwrap();
      dispatch(setCredentials(data));
      navigate("/login"); // Redirect to login page after signup
    } catch (error) {
      console.error("Failed to register:", error);
    }
  };

  return (
    <Container maxWidth="xs">
      <Typography variant="h4">Signup</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          name="username"
          label="Username"
          value={credentials.username}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          name="password"
          type="password"
          label="Password"
          value={credentials.password}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          disabled={isLoading}
        >
          Signup
        </Button>
      </form>
    </Container>
  );
};

export default Signup;
