import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useLoginMutation } from "../api/authApi";
import { setCredentials } from "../features/authSlice";
import { TextField, Button, Typography, Container, Link } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();
  const [credentials, setCredentialsState] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setCredentialsState({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await login(credentials).unwrap();
      dispatch(setCredentials(data));
      localStorage.setItem("token", data.token);
      navigate("/");
    } catch (error) {
      console.error("Failed to login:", error);
      setError("Invalid username or password. Please try again.");
    }
  };

  return (
    <Container maxWidth="xs">
      <Typography variant="h4">Login</Typography>
      {error && <Typography color="error">{error}</Typography>}
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
          Login
        </Button>
        <Typography variant="body2" align="center" style={{ marginTop: 16 }}>
          Don't have an account?{" "}
          <Button color="primary" onClick={() => navigate("/register")}>
            Signup
          </Button>
        </Typography>
      </form>
    </Container>
  );
};

export default Login;
