import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  Button,
  Avatar,
  Chip,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Logo from "../../Images/Kotilinga Temple Logo 1.png"; // update the path if needed

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const storedUserData = JSON.parse(localStorage.getItem("userData"));
    setUserData(storedUserData);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("userData");
    setUserData(null);
    navigate("/home");
  };

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
    { label: "Log In", path: "/login" },
  ];

  return (
    <>
      <AppBar
       position="absolute"
       sx={{
         backgroundColor: "rgba(0, 0, 0, 0.4)", // translucent black
         color: "#fff",
         height: 100,
         boxShadow: "none",
         zIndex: 1300,
         backdropFilter: "blur(5px)", // optional: adds glassmorphism
         justifyContent: "center",
       }}
      >
        <Toolbar sx={{ justifyContent: "space-between", height: "100%" }}>
          {/* Left: Logo and Title */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <img src={Logo} alt="Logo" style={{ height: "70px" }} />
            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
                fontSize: "1.5rem",
                fontFamily: "inherit",
              }}
            >
              శ్రీ శక్తిపీఠ కోటి లింగ క్షేత్రం
            </Typography>
          </Box>

          {/* Middle: Nav Links */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 4 }}>
            {navLinks.map((item) => (
              <Typography
                key={item.path}
                onClick={() => handleNavigation(item.path)}
                sx={{
                  cursor: "pointer",
                  color: location.pathname === item.path ? "#FF9900" : "#333",
                  fontSize: "1.1rem",
                  fontWeight: 500,
                  "&:hover": {
                    color: "#FF9900",
                  },
                }}
              >
                {item.label}
              </Typography>
            ))}
          </Box>

          {/* Right: Donate + Profile */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#ff9900",
                color: "#fff",
                fontWeight: "bold",
                px: 3,
                "&:hover": {
                  backgroundColor: "#e38800",
                },
              }}
              onClick={() => handleNavigation("/donate")}
            >
              Donate
            </Button>

            {userData ? (
              <Chip
                label={userData?.userName || "Profile"}
                avatar={
                  <Avatar
                    src={
                      userData?.profilePic
                        ? `http://localhost:3001/storage/userdp/${userData.profilePic}`
                        : ""
                    }
                    alt="Profile"
                    sx={{ width: 40, height: 40 }}
                  />
                }
                onClick={handleProfileNavigate}
                variant="outlined"
                sx={{ cursor: "pointer", backgroundColor: "#f5f5f5" }}
              />
            ) : (
              <Avatar sx={{ bgcolor: "gray" }} />
            )}
          </Box>
        </Toolbar>
      </AppBar>

      {/* Page Content */}
      <Box >
        <Outlet />
      </Box>
    </>
  );
};

export default Navbar;
