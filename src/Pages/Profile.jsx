import React, { useEffect, useState } from "react";
import {
  Grid,
  TextField,
  Select,
  MenuItem,
  Button,
  Typography,
  Card,
  CardContent,
  Avatar,
  IconButton,
  Divider,
  FormControl,
  InputLabel,
  Box,
} from "@mui/material";
import { Edit, Girl } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import Footer from "../Components/Footer/Footer";
import axios from "axios";
import lingam from "../Images/lingam.png";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [donation, setDonation] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("userData");
    const token = localStorage.getItem("token");

    if (storedUser && token) {
      const parsedUser = JSON.parse(storedUser);
      console.log("User from localStorage:", parsedUser);

      setUser(parsedUser);

      const donateNumber = parsedUser?.donateNumber;
      if (donateNumber) {
        console.log("📦 Found donateNumber:", donateNumber);
        fetchDonationDetails(donateNumber);
      } else {
        console.warn("⚠️ No donateNumber found in user data");
      }
    } else {
      console.warn("❌ Missing user or token");
    }
  }, []);

  const fetchDonationDetails = async (donateNumber) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:5000/donate/api/get-by-donate-number",
        { donateNumber },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("🎉 Donation API Response:", response.data);

      if (response.data.success && response.data.data) {
        setDonation(response.data.data);
      } else {
        console.error("❌ Donation fetch failed:", response.data.message);
      }
    } catch (error) {
      console.error(
        "🔥 Donation fetch error:",
        error.response?.data || error.message
      );
    }
  };

  const inputStyles = {
    color: "white",
  };

  const textFieldProps = {
    InputProps: { style: inputStyles },
    InputLabelProps: { style: inputStyles },
    sx: {
      "& .MuiOutlinedInput-root": {
        "& fieldset": {
          borderColor: "white",
        },
        "&:hover fieldset": {
          borderColor: "white",
        },
        "&.Mui-focused fieldset": {
          borderColor: "white",
        },
      },
    },
  };

  const handleLogout = () => {
    localStorage.removeItem("userData");
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  return (
    <>
      <Card
        sx={{
          maxWidth: 1200,
          margin: "40px auto",
          padding: 2,
          backgroundColor: "#0d1117",
          // border: "1px solid white",
        }}
      >
        <CardContent>
          <Typography
            variant="h5"
            gutterBottom
            align="center"
            sx={{ color: "white" }}
          >
            My Profile
          </Typography>
          <Divider sx={{ mb: 12, backgroundColor: "white" }} />

          {user ? (
            <Grid container spacing={3}>
              <Grid item xs={12} sm={4} display="flex" alignItems="center">
                <Avatar
                  src={
                    user?.profilePic
                      ? `http://localhost:3001/storege/userdp/${user.profilePic}`
                      : ""
                  }
                  sx={{ width: 100, height: 100 }}
                />
                <IconButton sx={{ marginLeft: 2, color: "white" }}>
                  <Edit />
                </IconButton>
              </Grid>

              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="Name"
                  defaultValue={user.userName}
                  {...textFieldProps}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="User ID"
                  defaultValue={user.userId}
                  {...textFieldProps}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Email"
                  defaultValue={user.email}
                  {...textFieldProps}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Phone"
                  defaultValue={user.phoneNumber}
                  {...textFieldProps}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="DOB"
                  defaultValue={user.dob}
                  {...textFieldProps}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Aadhar Number"
                  defaultValue={user.aadharNumber}
                  {...textFieldProps}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Gender"
                  defaultValue={user.gender}
                  {...textFieldProps}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="marriage status"
                  defaultValue={user.marriage_status ?? "Not Provided"}
                  {...textFieldProps}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Address"
                  defaultValue={user.address || "Not Provided"}
                  {...textFieldProps}
                />
              </Grid>

              <Grid item xs={12} display="flex" justifyContent="flex-end">
                <Button
                  variant="outlined"
                  sx={{ mr: 2, color: "white", borderColor: "white" }}
                >
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  sx={{ mr: 2, backgroundColor: "white", color: "black" }}
                >
                  Save
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </Grid>
            </Grid>
          ) : (
            <Typography align="center" sx={{ color: "white" }}>
              Loading...
            </Typography>
          )}
        </CardContent>
      </Card>

      <Box sx={{ mt: 5, color: "white", textAlign:"center" }}>
        <Typography variant="h6" gutterBottom>
          Donation Details
        </Typography>
        <Divider sx={{ backgroundColor: "white", mb: 2 }} />

        {donation ? (
          <Box
            sx={{
              backgroundColor: "#161b22",
              p: 3,
              borderRadius: 2,
              boxShadow: 3,
            }}
          >
          <Box
  sx={{
    backgroundColor: "#161b22",
    p: 3,
    borderRadius: 2,
    boxShadow: 3,
  }}
>
  {/* <Typography variant="h6" gutterBottom>
    Donation Information
  </Typography> */}

  <Grid container spacing={3}> {/* Added more spacing */}
    {/* First Column: Image */}
    <Grid item xs={12} md={3} sx={{ display: "flex", justifyContent: "center" }}>
      <img src={lingam} alt="Available" width="100%" height="auto" />
    </Grid>

    {/* Second Column: Donation Number, Phone, Gothram */}
    <Grid item xs={12} md={3}>
      <Typography variant="body1" sx={{ marginBottom: 2 }}>
        <strong>Donation Number:</strong> {donation.donateNumber}
      </Typography>
      <Typography variant="body1" sx={{ marginBottom: 2 }}>
        <strong>Phone:</strong> {donation.phoneNumber}
      </Typography>
      <Typography variant="body1" sx={{ marginBottom: 2 }}>
        <strong>Gothram:</strong> {donation.gothram}
      </Typography>
    </Grid>

    {/* Third Column: Name, Date of Birth, Relation */}
    <Grid item xs={12} md={3}>
      <Typography variant="body1" sx={{ marginBottom: 2 }}>
        <strong>Name:</strong> {donation.userName}
      </Typography>
      <Typography variant="body1" sx={{ marginBottom: 2 }}>
        <strong>Date of Birth:</strong>{" "}
        {new Date(donation.dob).toLocaleDateString()}
      </Typography>
      <Typography variant="body1" sx={{ marginBottom: 2 }}>
        <strong>Relation:</strong> {donation.relation}
      </Typography>
    </Grid>

    {/* Fourth Column: Status Button */}
    <Grid item xs={12} md={3} sx={{ display: "flex", justifyContent: "center" }}>  
    <Button
  variant="contained"
  size="small"
  sx={{
    backgroundColor: "#FFEB3B",
    color: "#000",
    fontWeight: "bold",
    textTransform: "none",
    padding: "2px 10px",     // Reduced vertical padding
    height: "30px",          // Custom height
    minWidth: "auto",
    fontSize: "0.75rem",     // Optional: smaller text
    "&:hover": {
      backgroundColor: "#fdd835",
    },
  }}
>
  {donation.status}
</Button>


    </Grid>
  </Grid>
</Box>
          </Box>
        ) : (
          <Typography>Loading donation info...</Typography>
        )}
      </Box>

      <Box sx={{ mt: 15 }}>
        <Footer />
      </Box>
    </>
  );
};

export default Profile;
