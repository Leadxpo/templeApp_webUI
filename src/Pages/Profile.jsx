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
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

import { Edit, Girl } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import Footer from "../Components/Footer/Footer";
import axios from "axios";
import lingam from "../Images/lingam.png";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [donation, setDonation] = useState(null);
  const [openLogoutDialog, setOpenLogoutDialog] = useState(false);
  const [formData, setFormData] = useState({
   
    userName: "",
    userId: "",
    email: "",
    phoneNumber: "",
    dob: "",
    aadharNumber: "",
    gender: "",
    marriage_status: "",
    address: "",
    gothram: "",
  });
  const [profilePic, setProfilePic] = useState(null);
  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Set the selected file to the state
      setProfilePic(file);
    }
  };
  

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
  

  useEffect(() => {
    if (user) {
      setFormData({
        userName: user.userName || "",
        userId: user.userId || "",
        email: user.email || "",
        phoneNumber: user.phoneNumber || "",
        dob: user.dob || "",
        aadharNumber: user.aadharNumber || "",
        gender: user.gender || "",
        marriage_status: user.marriage_status || "",
        address: user.address || "",
        gothram: user.gothram || "",
      });
    }
  }, [user]);
  
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const navigate = useNavigate();

 
  
  

  const fetchDonationDetails = async (donateNumber) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "https://temple.signaturecutz.in/donate/api/get-by-donate-number",
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
    window.location.reload();
  };

  // profile
  const handleSave = async () => {
    const token = localStorage.getItem("token");

    // Compare current user data and form data
    const hasChanges = Object.keys(formData).some(
      (key) => formData[key] !== user[key]
    );

    // Check if profile picture is selected
    const hasNewProfilePic = !!profilePic;

    if (!hasChanges && !hasNewProfilePic) {
      alert("⚠️ No changes detected to update.");
      return;
    }

    const data = new FormData();

    for (const key in formData) {
      data.append(key, formData[key]);
    }

    data.append("id", user.id); 

    console.log("User ID being sent:.........", user.id);

    if (hasNewProfilePic) {
      data.append("profilePic", profilePic);
    }

    try {
      const response = await axios.patch(
        "https://temple.signaturecutz.in/user/user-update",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.success) {
        alert("✅ Profile updated successfully!");
        setUser(response.data.data);
        localStorage.setItem("userData", JSON.stringify(response.data.data));
      } else {
        alert("❌ Failed to update profile.");
      }
    } catch (error) {
      console.error("Update error:", error);
      alert("🔥 An error occurred during update.");
    }
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
                <Box sx={{ position: "relative", display: "inline-block" }}>
                <Avatar
  src={profilePic ? URL.createObjectURL(profilePic) : (user?.profilePic ? `https://temple.signaturecutz.in/storege/userdp/${user.profilePic}` : "")}
  sx={{ width: 100, height: 100 }}
/>

                  <label htmlFor="profile-upload">
                    <input
                      type="file"
                      id="profile-upload"
                      onChange={handleProfilePicChange}
                      style={{ display: "none" }}
                    />
                    <IconButton
                      component="span"
                      sx={{
                        position: "absolute",
                        bottom: 0,
                        right: 0,
                        
                        backgroundColor: "rgba(0,0,0,0.6)",
                        color: "white",
                        "&:hover": {
                          backgroundColor: "rgba(255,255,255,0.2)",
                        },
                      }}
                    >
                      <Edit />
                    </IconButton>
                  </label>
                </Box>
              </Grid>

              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="Name"
                  name="userName"
                  value={formData.userName}
                  onChange={handleInputChange}
                  {...textFieldProps}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
              <TextField
  fullWidth
  label="User ID"
  name="userId"
  value={formData.userId}
  onChange={handleInputChange}
  disabled
  InputLabelProps={{ style: { color: "white" } }}
  InputProps={{
    style: { color: "white" }, // text color
    readOnly: true, // optional for extra clarity
  }}
  sx={{
    '& .MuiOutlinedInput-root': {
      '& fieldset': { borderColor: 'white' },
      '&:hover fieldset': { borderColor: 'white' },
      '&.Mui-disabled fieldset': { borderColor: 'white' }, // border color when disabled
      '&.Mui-disabled input': { color: 'white' }, // text color when disabled
    },
    '& .MuiInputLabel-root.Mui-disabled': {
      color: 'white', // label color when disabled
    },
  }}
/>

              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  {...textFieldProps}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Phone"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  {...textFieldProps}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="DOB"
                  name="dob"
                  value={formData.dob}
                  onChange={handleInputChange}
                  {...textFieldProps}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="gothram"
                  name="gothram"
                  value={formData.gothram}
                  onChange={handleInputChange}
                  {...textFieldProps}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Aadhar Number"
                  name="aadharNumber"
                  value={formData.aadharNumber}
                  onChange={handleInputChange}
                  {...textFieldProps}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  {...textFieldProps}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Marriage Status"
                  name="marriage_status"
                  value={formData.marriage_status}
                  onChange={handleInputChange}
                  {...textFieldProps}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
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
                  onClick={handleSave}
                >
                  update
                </Button>

                <Button
                  variant="contained"
                  color="error"
                  onClick={() => setOpenLogoutDialog(true)}
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

      <Box sx={{ mt: 5, color: "white", textAlign: "center" }}>
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

              <Grid container spacing={3}>
                {" "}
                {/* Added more spacing */}
                {/* First Column: Image */}
                <Grid
                  item
                  xs={12}
                  md={3}
                  sx={{ display: "flex", justifyContent: "center" }}
                >
                  <img
                    src={lingam}
                    alt="Available"
                    width="100%"
                    height="auto"
                  />
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
                  {/* <Typography variant="body1" sx={{ marginBottom: 2 }}>
                    <strong>Relation:</strong> {donation.relation}
                  </Typography> */}
                </Grid>
                {/* Fourth Column: Status Button */}
                <Grid
                  item
                  xs={12}
                  md={3}
                  sx={{ display: "flex", justifyContent: "center" }}
                >
                  <Button
                    variant="contained"
                    size="small"
                    sx={{
                      backgroundColor: "#FFEB3B",
                      color: "#000",
                      fontWeight: "bold",
                      textTransform: "none",
                      padding: "2px 10px", // Reduced vertical padding
                      height: "30px", // Custom height
                      minWidth: "auto",
                      fontSize: "0.75rem", // Optional: smaller text
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
          <Typography></Typography>
        )}
      </Box>

      <Dialog
        open={openLogoutDialog}
        onClose={() => setOpenLogoutDialog(false)}
      >
        <Card sx={{ padding: 2 }}>
          <Typography variant="h6" gutterBottom>
            Are you sure you want to logout?
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
            <Button
              variant="outlined"
              onClick={() => setOpenLogoutDialog(false)}
            >
              Cancel
            </Button>
            <Button variant="contained" color="error" onClick={handleLogout}>
              Logout
            </Button>
          </Box>
        </Card>
      </Dialog>

      <Box sx={{ mt: 15 }}>
        <Footer />
      </Box>
    </>
  );
};

export default Profile;
