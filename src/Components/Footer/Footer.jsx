import React from 'react';
import {
  Box,
  Typography,
  IconButton,
  Stack,
  Link,
} from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import LogoImage from '../../Images/Kotilinga Temple Logo 1.png';


const Footer = () => {
  return (
    <Box
      sx={{
        backgroundColor: 'black',
        color: '#fff',
        py: 4,
        px: 3,
        textAlign: 'center',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          justifyContent: 'space-between',
          alignItems: 'center',
          maxWidth: '1200px',
          mx: 'auto',
          mb: 2,
        }}
      >
        {/* Left - Logo */}
        <Box sx={{ mb: { xs: 2, md: 0 } }}>
          <img
            src={LogoImage} // Replace with your logo path
            alt="Logo"
            style={{ height: 80 }}
          />
        </Box>

        {/* Center - Navigation Links */}
        <Stack
          direction="row"
          spacing={4}
          sx={{ mb: { xs: 2, md: 0 }, flexWrap: 'wrap' }}
        >
          {['Home', 'About', 'Contact', 'Register', 'Log In'].map((item) => (
            <Link
              key={item}
              href={`/${item.toLowerCase().replace(/\s+/g, '-')}`}
              underline="none"
              sx={{
                color: 'white',
                fontSize: '1.3rem',
                fontWeight: 500,
                '&:hover': { color: '#ccc' },
              }}
            >
              {item}
            </Link>
          ))}
        </Stack>

        {/* Right - Social Icons */}
        <Stack direction="row" spacing={2}>
  <IconButton href="https://facebook.com" target="_blank" sx={{ color: 'white' }}>
    <FacebookIcon fontSize="large" />
  </IconButton>
  <IconButton href="https://instagram.com" target="_blank" sx={{ color: 'white' }}>
    <InstagramIcon fontSize="large" />
  </IconButton>
  <IconButton href="https://youtube.com" target="_blank" sx={{ color: 'white' }}>
    <YouTubeIcon fontSize="large" />
  </IconButton>
</Stack>
      </Box>

      {/* Bottom Text */}
      <Typography variant="body2" sx={{ fontSize: '1.1rem', mt:10 }}>
        Copyright © 2025 SRI SHAKTIPEETHA KOTI LINGA KSHETHRAM | Designed by
        <Typography component="span" sx={{ color: '#90EE90', ml: 1, fontWeight: 600 }}>
          LEADXPO IT SOLUTIONS
        </Typography>
      </Typography>
    </Box>
  );
};

export default Footer;
