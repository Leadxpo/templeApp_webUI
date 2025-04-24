import React from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  InputAdornment,
  Grid,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import templeImage from "../../Images/RegisterImage.jpg";
import siva1 from "../../Images/siva2.jpg";

const LoginPage = () => {
  const [formData, setFormData] = React.useState({ userId: "", password: "" });
  const [showPassword, setShowPassword] = React.useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/user/api/login", formData);
      const { token, user } = response.data.data;
      localStorage.setItem("token", token);
      localStorage.setItem("userData", JSON.stringify(user));
      alert("Login successful!");
      navigate("/profile");
      window.location.reload();
    } catch (err) {
      alert("Login failed. Please check your credentials.");
    }
  };

  const textFieldStyles = {
    "& .MuiOutlinedInput-root": {
      "& fieldset": { borderColor: "white" },
      "&:hover fieldset": { borderColor: "white" },
      "&.Mui-focused fieldset": { borderColor: "white" },
    },
  };

  return (
    <Box
      sx={{
        backgroundColor: "black",
        // minHeight: "100vh",
        color: "white",
        px: { xs: 2, md: 8 },
        py: 4,
        display: "flex",
        alignItems: "center",
      }}
    >
      <Grid container spacing={4} alignItems="center">
        {/* Left: Login Form */}
        <Grid item xs={12} md={6}>
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{
                backgroundColor: "#121212",
                p: 4,
                borderRadius: 2,
                boxShadow: 3,
              }}
            >
              <Typography variant="h4" align="center" gutterBottom>
                Log In
              </Typography>
              <TextField
                label="ID"
                name="userId"
                value={formData.userId}
                onChange={handleChange}
                fullWidth
                margin="normal"
                InputLabelProps={{ style: { color: "white" } }}
                InputProps={{ style: { color: "white", height: "56px" } }}
                sx={textFieldStyles}
              />
              <TextField
                label="Password"
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                fullWidth
                margin="normal"
                InputLabelProps={{ style: { color: "white" } }}
                InputProps={{
                  style: { color: "white", height: "56px" },
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={togglePasswordVisibility} edge="end" sx={{ color: "white" }}>
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={textFieldStyles}
              />
              <Button type="submit" variant="contained" fullWidth sx={{ mt: 3 }}>
                Log In
              </Button>
            </Box>
          </motion.div>
        </Grid>

        {/* Right: Image */}
        <Grid item xs={12} md={6} >
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Box
              component="img"
              src={siva1}
              alt="Temple"
              sx={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: 2,
                boxShadow: 3,
              }}
            />
          </motion.div>
        </Grid>
      </Grid>
    </Box>
  );
};

export default LoginPage;
