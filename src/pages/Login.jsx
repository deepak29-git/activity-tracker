import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const defaultTheme = createTheme();

export default function Login() {
  const navigate = useNavigate();
  const [error, setError] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const data = new FormData(event.currentTarget);
    const url = "https://node-server-k3tz.onrender.com/login";
    const payload = {
      email: data.get("email"),
      password: data.get("password"),
    };

    const email = data.get("email");
    const password = data.get("password");

    // Validate email and password
    if (!email || !password) {
      setError("Both email and password are required.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(url, payload);
      const token = response?.data?.token;
      if (token) {
        Cookies.set("token", token, { expires: 7, secure: true });
        navigate("/todos");
      } else {
        setError("Invalid credentials");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}>
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              error={!!error}
              helperText={error && error.includes("email") && error}
            />
            <TextField
              margin="normal"
              name="password"
              id="password"
              required
              fullWidth
              label={"Password"}
              type={showPassword ? "text" : "password"}
              error={!!error}
              helperText={error && error.includes("password") && error}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}>
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={loading}>
              {loading ? "Signing In..." : "Sign In"}
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
