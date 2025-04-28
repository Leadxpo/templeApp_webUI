import { useNavigate, useLocation, Outlet, Link } from "react-router-dom";
import React, { useState, useEffect } from "react";

import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Avatar,
  Chip,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useMediaQuery,
} from "@mui/material";
import { Snackbar, Alert } from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import Logo from "../../Images/KotilingaTempleLogo1.png";

const Navbar = ({ isHomePage }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const isMobile = useMediaQuery("(max-width:768px)");

  useEffect(() => {
    const storedUser = localStorage.getItem("userData");
    console.log("Stored userData:.......", storedUser); // 👈 See what's in localStorage

    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      console.log("Parsed userData:", parsedUser); // 👈 See parsed object
      setUser(parsedUser);
    }
  }, []);

  const handleProfileNavigate = () => {
    console.log("clicked");
    if (!user) {
      // Navigate to the login page if the user is not logged in
      navigate("/login");
    } else {
      // Navigate to the profile page if the user is logged in
      navigate("/profile");
      window.location.reload();
    }
  };

  const handleNavigation = (path) => {
    navigate(path);
    setDrawerOpen(false);
  };

  const handleDonateClick = () => {
    if (!user) {
      // If not logged in, directly redirect to login page
      navigate("/login");
    } else if (user.donateNumber) {
      // If already donated, show snackbar
      setSnackbarOpen(true);
    } else {
      // If user logged in and not donated, go to donation page
      navigate("/donete");
    }
  };
  

  const baseLinks = [
    { label: "Home", path: "/home" },
    { label: "About", path: "/about" },
    { label: "Contact", path: "/contact" },
    { label: "Register", path: "/register" },
  ];

  const navLinks = user
    ? baseLinks.filter((link) => link.label !== "Register")
    : baseLinks;

  return (
    <>
      <AppBar
        position="absolute"
        sx={{
          backgroundColor: isHomePage ? "transparent" : "#00000010",
          color: "#fff",
          height: 100,
          boxShadow: "none",
          top: 0,
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
            px: 2,
          }}
        >
          {/* Logo + Title */}
          <Link to="/home" style={{ textDecoration: "none", color: "inherit" }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                cursor: "pointer",
              }}
            >
              <img src={Logo} alt="Logo" style={{ height: "60px" }} />
              {!isMobile && (
                <Typography variant="h6">
                  Sri Shaktipeetha Koti Linga Kshethram
                </Typography>
              )}
            </Box>
          </Link>

          {/* Desktop Navigation */}
          {!isMobile ? (
            <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
              {navLinks.map((item) => (
                <Typography
                  key={item.path}
                  onClick={() => handleNavigation(item.path)}
                  sx={{
                    cursor: "pointer",
                    color: location.pathname === item.path ? "#FFD700" : "#fff",
                    fontSize: "1.1rem",
                    "&:hover": {
                      color: "#FFD700",
                    },
                  }}
                >
                  {item.label}
                </Typography>
              ))}

              {user ? (
                <Chip
                  label={user?.userName || "Profile"}
                  avatar={
                    <Avatar
                      src={
                        user?.profilePic
                          ? `https://templeservice.signaturecutz.in/storege/userdp/${user.profilePic}`
                          : ""
                      }
                      sx={{ width: 40, height: 40 }}
                    >
                      {user?.userName?.charAt(0)}
                    </Avatar>
                  }
                  onClick={handleProfileNavigate}
                  variant="outlined"
                  sx={{
                    cursor: "pointer",
                    backgroundColor: "white",
                    "&:hover": {
                      color: "#FFD700",
                    },
                  }}
                />
              ) : (
                <Avatar
                  onClick={handleProfileNavigate}
                  sx={{ bgcolor: "gray" }}
                />
              )}

              <Button
                onClick={() => navigate("/donete")}
                variant="contained"
                sx={{
                  backgroundColor: "white",
                  color: "black",
                  width: "8rem",
                  height: "3rem",
                  padding: "10px 20px",
                  borderRadius: "5px",
                  fontWeight: "bold",
                  fontSize: "17px",
                  boxShadow: 3,
                  "&:hover": {
                    backgroundColor: "#FFD700",
                  },
                }}
              >
                Donate
              </Button>
            </Box>
          ) : (
            // Mobile Menu Icon
            <IconButton onClick={() => setDrawerOpen(true)} color="inherit">
              <MenuIcon />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>

      {/* Drawer for Mobile */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <Box sx={{ width: 250, padding: 2 }}>
          <List>
            {navLinks.map((item) => (
              <ListItem
                button
                key={item.path}
                onClick={() => handleNavigation(item.path)}
              >
                <ListItemText
                  primary={item.label}
                  primaryTypographyProps={{
                    color:
                      location.pathname === item.path ? "#FFD700" : "black",
                  }}
                />
              </ListItem>
            ))}
            <ListItem button onClick={handleProfileNavigate}>
              <ListItemText primary="Profile" />
            </ListItem>
            <ListItem button onClick={handleDonateClick}>
              <ListItemText primary="Donate" />
            </ListItem>
          </List>
        </Box>
      </Drawer>

      {/* Page Content */}
      <Box
        sx={{
          pt: isHomePage ? "0px" : "120px",
          backgroundColor: isHomePage ? "transparent" : "#000000",
          color: "#fff",
          minHeight: "100vh",
        }}
      >
        <Outlet />
      </Box>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity={user && user.donateNumber ? "info" : "warning"}
          sx={{ width: "100%" }}
        >
          {user && user.donateNumber
            ? "You have already donated. Thank you!"
            : "Please login first to continue!"}
        </Alert>
      </Snackbar>
    </>
  );
};

export default Navbar;
