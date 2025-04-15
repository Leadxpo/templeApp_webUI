// LoginPage.jsx
import React from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
} from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RegisterForm = () => {
  const [formData, setFormData] = React.useState({
    userId: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // const response = await axios.post('http://localhost:3001/user/login', formData);
      const response = await axios.post('https://temple.signaturecutz.in/user/login', formData);

      const { token, user } = response.data.data;
      console.log("------------->",response.data.data)
console.log("token :",token);
console.log("token :",user);
      localStorage.setItem('token', token);
      localStorage.setItem('userData', JSON.stringify(user));
      
      alert('Login successful!');
      navigate('/profile'); // 👈 Redirect after login
    } catch (error) {
      console.error('Login error:', error.response?.data || error.message);
      alert('Login failed. Please check your credentials.');
    }
  };

  const textFieldStyles = {
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'white',
      },
      '&:hover fieldset': {
        borderColor: 'white',
      },
      '&.Mui-focused fieldset': {
        borderColor: 'white',
      },
    },
  };

  return (
    <Box
      sx={{
        backgroundColor: 'black',
        minHeight: '100vh',
        py: 4,
        px: 2,
        color: 'white',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          backgroundColor: '#121212',
          p: 4,
          borderRadius: 2,
          width: '100%',
          maxWidth: '600px',
          boxShadow: 3,
        }}
      >
        <Typography variant="h4" gutterBottom align="center">
          Log In
        </Typography>

        <TextField
          label="ID"
          name="userId"
          value={formData.userId}
          onChange={handleChange}
          fullWidth
          margin="normal"
          InputLabelProps={{ style: { color: 'white' } }}
          InputProps={{ style: { color: 'white', height: '56px' } }}
          sx={textFieldStyles}
        />

        <TextField
          label="Password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          fullWidth
          margin="normal"
          InputLabelProps={{ style: { color: 'white' } }}
          InputProps={{ style: { color: 'white', height: '56px' } }}
          sx={textFieldStyles}
        />

        <Button type="submit" variant="contained" fullWidth sx={{ mt: 3 }}>
          Log In
        </Button>
      </Box>
    </Box>
  );
};

export default RegisterForm;
