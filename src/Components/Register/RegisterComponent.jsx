import React from 'react';
import { Box, Typography } from '@mui/material';
import templeImage from '../../Images/RegisterImage.jpg'; // Adjust path as needed
import RegisterFrom from './Register'; 
import Footer from '../Footer/Footer'; 



const RegisterBanner = () => {
  return (
    <Box
      sx={{
        backgroundColor: 'black',   // 💥 Set entire page background
        minHeight: '100vh',         // 💥 Make sure it covers full viewport height
        color: 'white',             // Default text color
        px: 2,                      // Optional padding
        py: 4,
      }}
    >
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          height: { xs: 300, sm: 400, md: 500 },
          borderRadius: 2,
          overflow: 'hidden',
    
        }}
      >
        {/* Background Image */}
        <Box
          component="img"
          src={templeImage}
          alt="Temple"
          sx={{
            width: '100%',
            height: '70%',
            objectFit: 'cover',
            display: 'block',
          }}
        />

        {/* Overlay */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '70%',
            backgroundColor: 'rgba(0, 0, 0, 0.1)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            px: 2,
          }}
        >
          <Typography variant="h6" sx={{  fontSize: { xs: '2rem', sm: '3rem', md: '4rem' } }}>
            Register
          </Typography>
          <Typography variant="h6" sx={{ maxWidth: '800px', mt: 2 }}>
            Witness the grandeur of Koti Lingas symbolizing eternity and infinite power.
          </Typography>
        </Box>
      </Box>
<Box sx={{mb:10}}>
  <RegisterFrom/>
</Box>
<Box>
  <Footer/>
</Box>
      {/* You can place the registration form here if needed */}
    </Box>
  );
};

export default RegisterBanner;
