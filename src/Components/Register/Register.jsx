import React from 'react';
import axios from 'axios';
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
} from '@mui/material';

const RegisterForm = () => {
  const [formData, setFormData] = React.useState({
    userName: '',
    phoneNumber: '',
    aadharNumber: '',
    address: '',
    dob: '',
    maritalStatus: '',
    gender: '',
    email:'',
    userId:'',
    password: '',
  });

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
      const response = await axios.post('https://temple.signaturecutz.in/api/user/register', formData);
      console.log('Registration successful:', response.data);
      alert('User registered successfully!');
      setFormData({
        userName: '',
        phoneNumber: '',
        aadharNumber: '',
        address: '',
        dob: '',
        maritalStatus: '',
        gender: '',
        email: '',
        userId: '',
        password: '',
      });
    } catch (error) {
      console.error('Registration failed:', error);
      alert('Failed to register user. Please try again.');
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
          borderRadius: 3,
          width: '100%',
          maxWidth: '800px',
          boxShadow: 3,
        }}
      >
        <Typography variant="h4" gutterBottom align="center">
          Register
        </Typography>

        <TextField
          label="Name"
          name="userName"
          value={formData.userName}
          onChange={handleChange}
          fullWidth
          margin="normal"
          InputLabelProps={{ style: { color: 'white' } }}
          InputProps={{ style: { color: 'white', height: '56px' } }}
          sx={textFieldStyles}
        />

        <TextField
          label="Phone Number"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
          fullWidth
          margin="normal"
          InputLabelProps={{ style: { color: 'white' } }}
          InputProps={{ style: { color: 'white', height: '56px' } }}
          sx={textFieldStyles}
        />

        <TextField
          label="Aadhar Number"
          name="aadharNumber"
          value={formData.aadharNumber}
          onChange={handleChange}
          fullWidth
          margin="normal"
          InputLabelProps={{ style: { color: 'white' } }}
          InputProps={{ style: { color: 'white', height: '56px' } }}
          sx={textFieldStyles}
        />

        <TextField
          label="Address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          fullWidth
          margin="normal"
          multiline
          rows={2}
          InputLabelProps={{ style: { color: 'white' } }}
          InputProps={{ style: { color: 'white' } }}
          sx={textFieldStyles}
        />

        <TextField
          label="Date of Birth"
          type="date"
          name="dob"
          value={formData.dob}
          onChange={handleChange}
          fullWidth
          margin="normal"
          InputLabelProps={{ shrink: true, style: { color: 'white' } }}
          InputProps={{
            style: { color: 'white', height: '56px' },
            sx: {
              '&::-webkit-calendar-picker-indicator': {
                filter: 'invert(1)',
              },
            },
          }}
          sx={textFieldStyles}
        />

        <FormControl fullWidth margin="normal" sx={textFieldStyles}>
          <InputLabel sx={{ color: 'white' }}>Marital Status</InputLabel>
          <Select
            name="maritalStatus"
            value={formData.maritalStatus}
            onChange={handleChange}
            sx={{
              color: 'white',
              backgroundColor: '#1e1e1e',
              height: '56px',
            }}
          >
            <MenuItem value="Married">Married</MenuItem>
            <MenuItem value="Unmarried">Unmarried</MenuItem>
          </Select>
        </FormControl>

        <FormControl component="fieldset" margin="normal">
          <FormLabel component="legend" sx={{ color: 'white' }}>
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
              control={<Radio sx={{ color: 'white' }} />}
              label="Male"
            />
            <FormControlLabel
              value="Female"
              control={<Radio sx={{ color: 'white' }} />}
              label="Female"
            />
          </RadioGroup>
        </FormControl>

        <TextField
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          fullWidth
          margin="normal"
          InputLabelProps={{ style: { color: 'white' } }}
          InputProps={{ style: { color: 'white', height: '56px' } }}
          sx={textFieldStyles}
        />



<TextField
          label="User ID"
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
          Register
        </Button>
      </Box>
    </Box>
  );
};

export default RegisterForm;
