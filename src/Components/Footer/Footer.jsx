import React, { useEffect, useState } from 'react';
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
import LogoImage from '../../Images/KotilingaTempleLogo1.png';
import { useNavigate } from 'react-router-dom';

const Footer = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('userData');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);
  
  const Navigate = useNavigate();

  // Base links with Login and Register
  const baseLinks = ['Home', 'About', 'Contact', 'Register', 'Login'];

  // Filter links based on user login state
  const filteredLinks = user
    ? baseLinks.filter(link => link !== 'Login' && link !== 'Register') // Remove "Login" and "Register" if logged in
    : baseLinks;

  const handleLogout = () => {
    localStorage.removeItem('userData');
    setUser(null);
    Navigate("/login")
    window.location.reload(); // Force reload page after logout
  };

  return (
    <Box
      sx={{
        color: 'white',
        py: 4,
        px: 3,
        textAlign: 'center',
        background: 'black',
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
        {/* Logo */}
        <Box sx={{ mb: { xs: 2, md: 0 } }}>
          <img src={LogoImage} alt="Logo" style={{ height: 80 }} />
        </Box>

        {/* Navigation Links */}
        <Stack
          direction="row"
          spacing={4}
          sx={{ mb: { xs: 2, md: 0 }, flexWrap: 'wrap', justifyContent: 'center' }}
        >
          {filteredLinks.map((item) => (
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

          {/* Logout Button if user is logged in */}
          {user && (
            <Link
              onClick={handleLogout}
              underline="none"
              sx={{
                color: 'white',
                fontSize: '1.3rem',
                fontWeight: 500,
                cursor: 'pointer',
                '&:hover': { color: '#ccc' },
              }}
            >
              Logout
            </Link>
          )}
        </Stack>

        {/* Social Icons */}
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

      {/* Footer Text */}
      <Typography variant="body2" sx={{ fontSize: '1.1rem', mt: 4 }}>
        Copyright © 2025 SRI SHAKTIPEETHA KOTI LINGA KSHETHRAM |
        Designed by{' '}
        <Link
          href="https://leadxpo.com/"
          target="_blank"
          rel="noopener noreferrer"
          underline="none"
        >
          <Typography
            component="span"
            sx={{ color: '#90EE90', ml: 1, fontWeight: 600, cursor: 'pointer' }}
          >
            LEADXPO IT SOLUTIONS
          </Typography>
        </Link>
      </Typography>
    </Box>
  );
};

export default Footer;
