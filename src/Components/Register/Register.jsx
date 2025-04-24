import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton, InputAdornment } from "@mui/material";
import { motion } from "framer-motion";
import backgroundImg from "../../Images/RegisterImage.jpg"; // adjust path based on file location

import {
  Box,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
  Button,
} from "@mui/material";

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    userName: "",
    phoneNumber: "",
    aadharNumber: "",
    address: "",
    dob: "",
    marriage_status: "",
    gender: "",
    email: "",
    userId: "",
    password: "",
    profilePic: null,
    gothram: "",
  });

  const [addressParts, setAddressParts] = useState({
    street: "",
    city: "",
    state: "",
    country: "",
    postalCode: "",
  });

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    const updatedParts = { ...addressParts, [name]: value };
    setAddressParts(updatedParts);

    const fullAddress = `${updatedParts.street}, ${updatedParts.city}, ${updatedParts.state}, ${updatedParts.country} - ${updatedParts.postalCode}`;
    setFormData((prev) => ({ ...prev, address: fullAddress }));
  };

  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, profilePic: e.target.files[0] }));
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.gender) {
      alert("Please select your gender");
      return;
    }

    const data = new FormData();
    for (const key in formData) {
      if (formData[key]) {
        data.append(key, formData[key]);
      }
    }

    try {
      await axios.post("http://localhost:5000/user/api/register", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("User registered successfully!");
      setFormData({
        userName: "",
        phoneNumber: "",
        aadharNumber: "",
        address: "",
        dob: "",
        marriage_status: "",
        gender: "",
        email: "",
        userId: "",
        password: "",
        profilePic: null,
        gothram: "",
      });
      navigate("/login");
    } catch (error) {
      console.error("Registration failed:", error);
      if (error.response && error.response.data && error.response.data.message) {
        alert(error.response.data.message);
      } else {
        alert("Registration failed. Please try again.");
      }
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
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: 2,
        py: 6,
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${backgroundImg})`,
            p: 4,
            borderRadius: 3,
            boxShadow: 3,
            color: "white",
            maxWidth: 600,
            backgroundSize: "cover",
            backgroundPosition: "center",

            width: "100%",
          }}
          encType="multipart/form-data"
        >
          <Typography variant="h4" gutterBottom align="center">
            Register
          </Typography>

          {[
            { label: "Name", name: "userName" },
            { label: "Phone Number", name: "phoneNumber" },
            { label: "Aadhar Number", name: "aadharNumber" },
            { label: "Gothram", name: "gothram" },
            { label: "Email", name: "email" },
            { label: "User ID", name: "userId" },
          ].map(({ label, name }) => (
            <TextField
              key={name}
              label={label}
              name={name}
              value={formData[name]}
              onChange={handleChange}
              fullWidth
              required
              margin="normal"
              InputLabelProps={{ style: { color: "white" } }}
              InputProps={{ style: { color: "white", height: "56px" } }}
              sx={textFieldStyles}
            />
          ))}

          <TextField
            label="Password"
            name="password"
            type={showPassword ? "text" : "password"}
            value={formData.password}
            onChange={handleChange}
            fullWidth
            required
            margin="normal"
            InputLabelProps={{ style: { color: "white" } }}
            InputProps={{
              style: { color: "white", height: "56px" },
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={togglePasswordVisibility}
                    sx={{ color: "white" }}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={textFieldStyles}
          />

          <Box onClick={() => document.getElementById("dob-input").focus()}>
            <TextField
              id="dob-input"
              label="Date of Birth"
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              fullWidth
              required
              margin="normal"
              InputLabelProps={{ shrink: true, style: { color: "white" } }}
              InputProps={{ style: { color: "white", height: "56px" } }}
              sx={{
                ...textFieldStyles,
                '& input[type="date"]::-webkit-calendar-picker-indicator': {
                  filter: "invert(1)",
                },
              }}
              inputProps={{
                max: new Date().toISOString().split("T")[0],
              }}
            />
          </Box>

          {/* Address Fields */}
          {["street", "city", "state", "country", "postalCode"].map((field) => (
            <TextField
              key={field}
              label={field.charAt(0).toUpperCase() + field.slice(1)}
              name={field}
              value={addressParts[field]}
              onChange={handleAddressChange}
              fullWidth
              margin="normal"
              InputLabelProps={{ style: { color: "white" } }}
              InputProps={{ style: { color: "white", height: "56px" } }}
              sx={textFieldStyles}
            />
          ))}

          <FormControl fullWidth required margin="normal" sx={textFieldStyles}>
            <InputLabel sx={{ color: "white" }}>Marital Status</InputLabel>
            <Select
              name="marriage_status"
              value={formData.marriage_status}
              onChange={handleChange}
              sx={{
                color: "white",
                backgroundColor: "#1e1e1e",
                height: "56px",
              }}
            >
              <MenuItem value="Married">Married</MenuItem>
              <MenuItem value="Unmarried">Unmarried</MenuItem>
            </Select>
          </FormControl>

          <FormControl component="fieldset" required margin="normal">
            <FormLabel component="legend" sx={{ color: "white" }}>
              Gender
            </FormLabel>
            <RadioGroup
              row
              name="gender"
              value={formData.gender}
              onChange={handleChange}
            >
              <FormControlLabel
                value="Male"
                control={<Radio sx={{ color: "white" }} />}
                label="Male"
              />
              <FormControlLabel
                value="Female"
                control={<Radio sx={{ color: "white" }} />}
                label="Female"
              />
            </RadioGroup>
          </FormControl>

          <Box sx={{ mt: 2, mb: 2 }}>
            <Typography sx={{ color: "white", mb: 1 }}>
              Upload Profile Image
            </Typography>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              style={{ color: "white" }}
            />
          </Box>

          <Button type="submit" variant="contained" fullWidth sx={{ mt: 3 }}>
            Register
          </Button>
        </Box>
      </motion.div>
    </Box>
  );
};

export default RegisterForm;
