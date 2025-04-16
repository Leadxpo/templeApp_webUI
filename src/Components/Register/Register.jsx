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
    email: '',
    userId: '',
    password: '',
    profilePic: null,
    // donateNumber: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      profilePic: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();

    for (const key in formData) {
      if (formData[key]) {
        data.append(key, formData[key]);
      }
    }

    try {
      const response = await axios.post(
        'https://temple.signaturecutz.in/user/api/register',
        data,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      console.log('Registration successful:', response.data);
      alert('User registered successfully!');

      // Reset form
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
        profilePic: null,
        // donateNumber: '',
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
        px: 4,
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
        encType="multipart/form-data"
      >
        <Typography variant="h4" gutterBottom align="center">
          Register
        </Typography>

        {/* All TextFields */}
        {[
          { label: 'Name', name: 'userName' },
          { label: 'Phone Number', name: 'phoneNumber' },
          { label: 'Aadhar Number', name: 'aadharNumber' },
          { label: 'Address', name: 'address', multiline: true, rows: 2 },
          { label: 'Email', name: 'email' },
          // { label: 'Donate Number', name: 'donateNumber' },
          { label: 'User ID', name: 'userId' },
          { label: 'Password', name: 'password', type: 'password' },
        ].map(({ label, name, multiline, rows, type = 'text' }) => (
          <TextField
            key={name}
            label={label}
            name={name}
            value={formData[name]}
            onChange={handleChange}
            fullWidth
            margin="normal"
            multiline={multiline}
            rows={rows}
            type={type}
            InputLabelProps={{ style: { color: 'white' } }}
            InputProps={{ style: { color: 'white', height: '56px' } }}
            sx={textFieldStyles}
          />
        ))}

        {/* DOB */}
        <TextField
          label="Date of Birth"
          type="date"
          name="dob"
          value={formData.dob}
          onChange={handleChange}
          fullWidth
          margin="normal"
          InputLabelProps={{ shrink: true, style: { color: 'white' } }}
          InputProps={{ style: { color: 'white', height: '56px' } }}
          sx={{
            ...textFieldStyles,
            '& input[type="date"]::-webkit-calendar-picker-indicator': {
              filter: 'invert(1)',
            },
          }}
        />

        {/* Marital Status */}
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

        {/* Gender */}
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

        {/* Profile Image */}
        <Box sx={{ mt: 2, mb: 2 }}>
          <Typography sx={{ color: 'white', mb: 1 }}>Upload Profile Image</Typography>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            style={{ color: 'white' }}
          />
        </Box>

        {/* Submit Button */}
        <Button type="submit" variant="contained" fullWidth sx={{ mt: 3 }}>
          Register
        </Button>
      </Box>
    </Box>
  );
};

export default RegisterForm;
