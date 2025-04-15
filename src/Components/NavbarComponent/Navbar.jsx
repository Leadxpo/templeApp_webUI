import { useNavigate, useLocation, Outlet } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { Button } from '@mui/material';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Avatar,
  Chip,
} from "@mui/material";

import Logo from "../../Images/Kotilinga Temple Logo 1.png";

const Navbar = ({ isHomePage }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(null);

  useEffect(() => {
      const storedUser = localStorage.getItem("userData");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    }, []);
 

  const handleProfileNavigate = () => {
    navigate("/profile");
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  const navLinks = [
    { label: "Home", path: "/home" },
    { label: "About", path: "/about" },
    { label: "Contact", path: "/contact" },
    { label: "Register", path: "/register" },
    // { label: "Login", path: "/login" },
    // { label: "Donate", path: "/donete" },
  ];

  return (
    <>
      <AppBar
        position="absolute"
        sx={{
          backgroundColor: isHomePage ? "transparent" : "#00000010", // Conditionally apply background
          color: "#fff",
          height: 100,
          boxShadow: "none",position:'absolute',top:0,
          // zIndex: 1000,
          transition: "width 0.3s",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            height: "100%",
          }}
        >
          {/* Logo + Title */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 5 }}>
            <img src={Logo} alt="Logo" style={{ height: "70px" }} />
            <h2> Sri Shaktipeetha Koti Lenga Kshethram</h2>
          </Box>

          {/* Navigation + Avatar/Chip */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
            {navLinks.map((item) => (
              <Typography
                key={item.path}
                onClick={() => handleNavigation(item.path)}
                sx={{
                  cursor: "pointer",
                  color: location.pathname === item.path ? "#FFD700" : "#fff",
                  fontSize: "1.2rem",
                  transition: "color 0.3s ease",
                  "&:hover": {
                    color: "#FFD700",
                  },
                }}
              >
                {item.label}
              </Typography>
            ))}

            {/* Profile Chip or Avatar */}
            {user ? (
              <Chip
                label={user?.userName || "Profile"}
                avatar={
                  <Avatar
                    src={
                      user?.image
                        ? `http://localhost:3001/storage/userdp/${user.profilePic}`
                        : ""
                    }
                    alt="Profile"
                    sx={{ width: 40, height: 40 }}
                  />
                }
                onClick={handleProfileNavigate}
                variant="outlined"
                sx={{ cursor: "pointer", backgroundColor: "white" , "&:hover": {
                  color: "#FFD700",
                },}}
              />
            ) : (
              <Avatar sx={{ bgcolor: "gray" }} />
            )}


<Button
      onClick={() => navigate('/donete')}
      variant="contained"
      sx={{
        backgroundColor: 'white',
        color: 'black',
        width: '8rem', // 52 * 0.25rem = 13rem
        height: '3rem', // 20 * 0.25rem = 5rem
        padding: '10px 20px',
        borderRadius: '5px',
        fontWeight: 'bold',
        fontSize: '17px',
        boxShadow: 3,
        '&:hover': {
          backgroundColor: '#FFD700', // equivalent to Tailwind's gray-100
        },
      }}
    >
      Donate
    </Button>


          </Box>
        </Toolbar>
      </AppBar>

      {/* Content space */}
      <Box sx={{ pt: isHomePage ? "0px" : "120px", backgroundColor: isHomePage ? "transparent" : "#000000", color: "#fff", minHeight: "100vh" }}>
        <Outlet />
      </Box>
    </>
  );
};

export default Navbar;
