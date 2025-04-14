import React, { useEffect, useState } from "react";
import { Box, Typography, Avatar, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("userData");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userData");
    localStorage.removeItem("token");
    navigate("/home");
  };

  return (
    <Box
      sx={{
        backgroundColor: "#000",
        minHeight: "100vh",
        color: "#fff",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: "100px",
      }}
    >
      <Typography variant="h4" sx={{ mb: 4 }}>
        Profile Page
      </Typography>

      {user && (
        <Box
          sx={{
            width: "100%",
            maxWidth: 600,
            padding: 4,
            backgroundColor: "#111",
            borderRadius: 3,
            boxShadow: 3,
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
            <Avatar
              src={
                user.profilePic
                  ? `https://temple.signaturecutz.in/api/storage/userdp/${user.profilePic}`
                  : ""
              }
              alt={user.userName}
              sx={{ width: 100, height: 100 }}
            />
          </Box>

          <Typography><strong>User ID:</strong> {user.userId}</Typography>
          <Typography><strong>Name:</strong> {user.userName}</Typography>
          <Typography><strong>Email:</strong> {user.email}</Typography>
          <Typography><strong>Phone:</strong> {user.phoneNumber}</Typography>
          <Typography><strong>DOB:</strong> {user.dob}</Typography>
          <Typography><strong>Aadhar Number:</strong> {user.aadharNumber}</Typography>
          <Typography><strong>Marital Status:</strong> {user.marrege_status}</Typography>
          <Typography><strong>Address:</strong> {user.address || "Not provided"}</Typography>

          <Button
            variant="contained"
            color="error"
            onClick={handleLogout}
            sx={{ mt: 3 }}
          >
            Logout
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default Profile;
