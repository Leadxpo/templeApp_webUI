import React from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import siva1 from "../../Images/siva2.jpg"; // Your background image

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
      const response = await axios.post("https://templeservice.signaturecutz.in/user/login", formData);
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
        backgroundImage: `linear-gradient(rgba(7, 6, 6, 0.7), rgba(0, 0, 0, 0.6)), url(${siva1})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        // px: 2,
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        style={{ width: "100%", maxWidth: 400 }}
      >
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            // backgroundColor: "#121212",
            p: 4,
            borderRadius: 2,
            // boxShadow: 5,
            color: "white",
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
    </Box>
  );
};

export default LoginPage;
