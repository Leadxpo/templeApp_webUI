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
  FormControl, InputLabel,Box,
} from "@mui/material";
import { Edit } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import Footer from '../Components/Footer/Footer'; 


const Profile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("userData");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

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
        <Typography variant="h5" gutterBottom align="center" sx={{ color: "white" }}>
          My Profile
        </Typography>
        <Divider sx={{ mb: 12, backgroundColor: "white" }} />

        {user ? (
          <Grid container spacing={3}>
            <Grid item xs={12} sm={4} display="flex" alignItems="center">
              <Avatar
                src={
                  user?.profilePic
                    ? `http://localhost:3001/storage/userdp/${user.profilePic}`
                    : ""
                }
                sx={{ width: 100, height: 100 }}
              />
              <IconButton sx={{ marginLeft: 2, color: "white" }}>
                <Edit />
              </IconButton>
            </Grid>

            <Grid item xs={12} sm={4}>
              <TextField fullWidth label="Name" defaultValue={user.userName} {...textFieldProps} />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField fullWidth label="User ID" defaultValue={user.userId}  {...textFieldProps} />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Email" defaultValue={user.email} {...textFieldProps} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Phone" defaultValue={user.phoneNumber} {...textFieldProps} />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="DOB" defaultValue={user.dob} {...textFieldProps} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Aadhar Number" defaultValue={user.aadharNumber} {...textFieldProps} />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Donate Number" defaultValue={user.donateNumber} {...textFieldProps} />
            </Grid>


<Grid item xs={12} sm={6}>
  <FormControl fullWidth sx={{ color: "white" }}>
    <InputLabel
      id="marriage-status-label"
      sx={{ color: "white" }}
    >
      Marriage Status
    </InputLabel>
    <Select
      labelId="marriage-status-label"
      id="marriage-status"
      value={user?.marrege_status || ""}
      label="Marriage Status"
      sx={{
        color: "white",
        "& .MuiOutlinedInput-notchedOutline": {
          borderColor: "white",
        },
        "&:hover .MuiOutlinedInput-notchedOutline": {
          borderColor: "white",
        },
        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
          borderColor: "white",
        },
        "& .MuiSelect-icon": {
          color: "white",
        },
      }}
    >
      <MenuItem value="Single">Single</MenuItem>
      <MenuItem value="Married">Married</MenuItem>
    </Select>
  </FormControl>
</Grid>

            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Address" defaultValue={user.address || "Not Provided"} {...textFieldProps} />
            </Grid>

            <Grid item xs={12} display="flex" justifyContent="flex-end">
              <Button variant="outlined" sx={{ mr: 2, color: "white", borderColor: "white" }}>
                Cancel
              </Button>
              <Button variant="contained" sx={{ mr: 2, backgroundColor: "white", color: "black" }}>
                Save
              </Button>
              <Button variant="contained" color="error" onClick={handleLogout}>
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
      <Box sx={{mt:15}}>
  <Footer/>
</Box>
</>
  );
};

export default Profile;
