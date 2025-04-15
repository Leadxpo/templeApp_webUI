import React from "react";

import templeImage from "../../Images/donetShiva.png"; // Adjust path as needed
import RegisterFrom from "../../Components/Contacts/ContactComp";
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

// import Footer from "../Footer/Footer";

const RegisterBanner = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#0d1117", // 💥 Set entire page background
        minHeight: "100vh", // 💥 Make sure it covers full viewport height
        color: "white", // Default text color
        px: 4, // Optional padding
        py: 4,
      }}
    >
      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: { xs: 300, sm: 400, md: 500 },
          borderRadius: 2,
          overflow: "hidden",
          mb: 5,
        }}
      >
        {/* Background Image */}
        <Box
          component="img"
          src={templeImage}
          alt="Temple"
          sx={{
            width: "100%",
            height: "80%",
            objectFit: "cover",
            display: "block",
          }}
        />

        {/* Overlay */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "80%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            px: 2,
          }}
        >
          <Typography
            variant="h2"
            sx={{
              // fontWeight: "semibold",
              fontSize: { xs: "2rem", sm: "3rem", md: "4rem" },
            }}
          >
            Contact Us
          </Typography>
          <Typography variant="h6" sx={{ maxWidth: "800px", mt: 2 }}>
            Witness the grandeur of Koti Lingas symbolizing eternity and
            infinite power.
          </Typography>
        </Box>
      </Box>
      <Box sx={{ mb: 5 }}>
        <RegisterFrom />
      </Box>

      <Box
        sx={{
          width: "100%",
          height: "450px",
          border: 0,
          overflow: "hidden",
        }}
      >
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7600.420944663123!2d83.25804059199784!3d17.73471938285126!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a3942b111a3a579%3A0x29abfc89d3565027!2sNirmaan%20Park%2C%20Kancharapalem%2C%20Visakhapatnam%2C%20Andhra%20Pradesh!5e0!3m2!1sen!2sin!4v1744284826931!5m2!1sen!2sin"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Nirmaan Park Map"
        />
      </Box>
      <Box
      sx={{
        backgroundColor: '#0d1117',
        color: '#fff',
        py: 4,
        px: 3,
        textAlign: 'center',
        mt:10
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
      {/* You can place the registration form here if needed */}
    </Box>
  );
};

export default RegisterBanner;
