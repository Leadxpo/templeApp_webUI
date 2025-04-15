import React from 'react';
import { Box, Typography } from '@mui/material';
import templeImage from '../../Images/RegisterImage.jpg';
// import SivaImage from '../../Images/donetShiva.png'; // Adjust path as needed
import SivaFrom from '../../Components/About/shivaabout'; 
import TextFrom from '../../Components/About/text'; 
import SivaVideo from '../../Images/0410.mp4'
import Footer from '../../Components/Footer/Footer'; 



const RegisterBanner = () => {
  return (
    <Box
      sx={{
        backgroundColor: 'black',   // 💥 Set entire page background
        minHeight: '100vh',         // 💥 Make sure it covers full viewport height
        color: 'white',             // Default text color
        px: 4,                      // Optional padding
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
          mb: 2,
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
            borderRadius: 2,
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
            px: 3,
          }}
        >
          <Typography variant="h6" sx={{  fontSize: { xs: '2rem', sm: '3rem', md: '4rem' } }}>
            About Us
          </Typography>
          <Typography variant="h6" sx={{ maxWidth: '800px', mt: 2 }}>
            Witness the grandeur of Koti Lingas symbolizing eternity and infinite power.
          </Typography>
        </Box>
      </Box>

<Box sx={{mb:5}}>
<SivaFrom/>
</Box>

<Box sx={{mb:10}}>
<TextFrom/>
</Box>



<Box
  sx={{
    mb: 4,
    display: 'flex',
    justifyContent: 'center',
  }}
>
  <video
    src={SivaVideo} // Adjust path as needed
    autoPlay
    muted
    loop
    playsInline
    style={{
      width: '100%',
      height: 'auto',
      display: 'block',
      borderRadius: '12px', // Optional for rounded corners
    }}
  />
</Box>



<Box sx={{mt:15}}>
  <Footer/>
</Box>
      {/* You can place the registration form here if needed */}
    </Box>
  );
};

export default RegisterBanner;
