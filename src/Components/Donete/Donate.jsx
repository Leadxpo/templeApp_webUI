import React, { useState } from 'react';
import templeImage from '../../Images/donetShiva.png';
import DoneteImage from '../../Images/donete.png';
import DoneteImageModel from '../../Images/donateModel.jpeg';
import PhonePayImage from '../../Images/phnoepay.jpg';


import {
  Box,
  Typography,
  IconButton,
  Stack,
  Link,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button
} from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import LogoImage from '../../Images/Kotilinga Temple Logo 1.png';

const RegisterBanner = () => {
  const [openModal1, setOpenModal1] = useState(false);
  const [openModal2, setOpenModal2] = useState(false);
  const [donationAmount, setDonationAmount] = useState('');
  const [file, setFile] = useState(null);

  const handleModal1Open = () => setOpenModal1(true);
  const handleModal1Close = () => setOpenModal1(false);
  const handleModal2Open = () => setOpenModal2(true);
  const handleModal2Close = () => setOpenModal2(false);

  const handleNext = () => {
    handleModal1Close();
    handleModal2Open();
  };

  const handleFinalSubmit = (e) => {
    e.preventDefault();
    console.log('Donation Amount:', donationAmount);
    console.log('Uploaded File:', file);

    // Reset
    setDonationAmount('');
    setFile(null);
    handleModal2Close();
  };

  return (
    <Box sx={{ backgroundColor: '#0d1117', minHeight: '100vh', color: 'white', px: 4, py: 4 }}>
      {/* Banner */}
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          height: { xs: 300, sm: 400, md: 500 },
          borderRadius: 2,
          overflow: 'hidden',
        }}
      >
        <Box
          component="img"
          src={templeImage}
          alt="Temple"
          sx={{
            width: '100%',
            height: '75%',
            objectFit: 'cover',
            display: 'block',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '75%',
            backgroundColor: 'rgba(0, 0, 0, 0.1)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            px: 2,
          }}
        >
          <Typography variant="h6" sx={{ fontSize: { xs: '2rem', sm: '3rem', md: '4rem' } }}>
            Donate Now
          </Typography>
          <Typography variant="h6" sx={{ maxWidth: '800px', mt: 2 }}>
            Witness the grandeur of Koti Lingas symbolizing eternity and infinite power.
          </Typography>
        </Box>
      </Box>

      {/* Donate Image */}
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'center', cursor: 'pointer' }}>
        <img
          src={DoneteImage}
          alt="Donate"
          style={{ width: '100%', height: '50%' }}
          onClick={handleModal1Open}
        />
      </Box>

      {/* Modal 1: Input Number */}
      <Dialog open={openModal1} onClose={handleModal1Close} fullWidth maxWidth="sm">
        <DialogTitle>Enter the Number</DialogTitle>


        <Box sx={{ mb: 2, display: 'flex', justifyContent: 'center' }}>
          <img src={DoneteImageModel} alt="Donate" style={{ width: '50%', height: '30%' }} />
        </Box>

        <DialogContent>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleNext();
            }}
            style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}
          >
            <TextField
              label="Select the Number"
              type="number"
              value={donationAmount}
              onChange={(e) => setDonationAmount(e.target.value)}
              fullWidth
              required
            />

            <Button type="submit" variant="contained" color="primary">
              Payment
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      {/* Modal 2: Upload File and Submit */}
      <Dialog open={openModal2} onClose={handleModal2Close} fullWidth maxWidth="sm">
        <DialogTitle>Upload Receipt or File</DialogTitle>
        <Box sx={{  display: 'flex', justifyContent: 'center' }}>
          <img src={PhonePayImage} alt="Donate" style={{ width: '50%', height: '20%' }} />
        </Box>
        <DialogContent>
          <form
            onSubmit={handleFinalSubmit}
            style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
          >
            <Button variant="outlined" component="label">
              Upload File
              <input
                type="file"
                hidden
                onChange={(e) => setFile(e.target.files[0])}
              />
            </Button>

            {file && (
              <Typography variant="body2" sx={{ color: 'lightgreen' }}>
                Selected File: {file.name}
              </Typography>
            )}

            <Button type="submit" variant="contained" color="success">
              Send
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      {/* Footer */}
      <Box
        sx={{
          backgroundColor: '#0d1117',
          color: '#fff',
          py: 4,
          px: 3,
          textAlign: 'center',
          mt: 10,
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
          <Box sx={{ mb: { xs: 2, md: 0 } }}>
            <img src={LogoImage} alt="Logo" style={{ height: 80 }} />
          </Box>

          <Stack direction="row" spacing={4} sx={{ mb: { xs: 2, md: 0 }, flexWrap: 'wrap' }}>
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

        <Typography variant="body2" sx={{ fontSize: '1.1rem', mt: 10 }}>
          Copyright © 2025 SRI SHAKTIPEETHA KOTI LINGA KSHETHRAM |
          Designed by
          <Typography component="span" sx={{ color: '#90EE90', ml: 1, fontWeight: 600 }}>
            LEADXPO IT SOLUTIONS
          </Typography>
        </Typography>
      </Box>
    </Box>
  );
};

export default RegisterBanner;
