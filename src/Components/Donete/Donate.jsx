import React, { useState, useEffect } from "react";
// import templeImage from "../../Images/donetShiva.png";
import DoneteImage from "../../Images/donete.png";
import DoneteImageModel from "../../Images/donateModel.jpeg";
import lingamvideo from "../../Images/lingamvideo.gif";

import PhonePayImage from "../../Images/phnoepay.jpg";
import axios from "axios";
import { Alert } from "@mui/material";


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
  Button,
} from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import LogoImage from "../../Images/KotilingaTempleLogo1.png";
import lingam from "../../Images/lingam.png";

const RegisterBanner = () => {
  const [openModal1, setOpenModal1] = useState(false);
  const [openModal2, setOpenModal2] = useState(false);
  const [donationAmount, setDonationAmount] = useState("");
  const [inputNumber, setInputNumber] = useState();
  const [isNumberValid, setIsNumberValid] = useState(null); // null, true, false
  const [file, setFile] = useState(null);

  const [formData, setFormData] = useState({
    UserName: "",
    phoneNumber: "",
    relation: "",
    dob: "",
    gothram: "",
  });
  const [openFormModal, setOpenFormModal] = useState(false);
  const [showPaymentImage, setShowPaymentImage] = useState(false);

  const [successMessage, setSuccessMessage] = useState(""); // To show success message
  const [errorMessage, setErrorMessage] = useState("");

  const [user, setUser] = useState(null);

  const storedUser = JSON.parse(localStorage.getItem("userData"));
  const userId = storedUser?.userId;
  console.log("userId,,.........", userId);

  const token = localStorage.getItem("token"); 
  console.log("token2222", token);

  // form
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("userData"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
  
    if (!token) {
      alert("User not authenticated. Please log in again.");
      return;
    }
  
    if (!user || !user.userId) {
      alert("User not found. Please log in again.");
      return;
    }
  
    if (!file) {
      alert("Please upload your payment receipt.");
      return;
    }
  
    const formDataToSend = new FormData();
    formDataToSend.append("userId", user.userId);
    formDataToSend.append("userName", formData.UserName);
    formDataToSend.append("gothram", formData.gothram);
    formDataToSend.append("donateNumber", inputNumber);
    formDataToSend.append("amount", "100");
    formDataToSend.append("paymentMethod", "QR Code");
    formDataToSend.append("paymentRecept", file);
  
    try {
      const response = await axios.post(
        "https://temple.signaturecutz.in/payments/api/create-payment",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      if (response.status === 200) {
        setSuccessMessage("Payment successfully processed! Thank you for your support.");
        setTimeout(() => {
          setShowPaymentImage(false);
      }, 3000)
  
        const donateData = {
          donateNumber: inputNumber,
          userName: formData.UserName,
          userId: user.userId,
          phoneNumber: formData.phoneNumber,
          gothram: formData.gothram,
          dob: formData.dob,
          relation: formData.relation,
        };
  
        const donateResponse = await axios.post(
          "https://temple.signaturecutz.in/donate/api/create-donate-number",
          donateData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
  
        if (donateResponse.status === 200) {
          console.log("Donate number recorded successfully");
  
          // ✅ Update user with donate number
          const updateFormData = new FormData();
          updateFormData.append("userId", user.userId);
          updateFormData.append("donateNumber", inputNumber);
  
          const updateResponse = await axios.patch(
            "https://temple.signaturecutz.in/user/api/user-update",
            updateFormData,
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
              },
            }
          );
  
          if (updateResponse.status === 200) {
            console.log("User updated with donate number successfully");
            const updatedUser = { ...user, inputNumber };
            localStorage.setItem("userData", JSON.stringify(updatedUser));
            setUser(updatedUser); // update UI if needed
          }
        }
      }
    } catch (error) {
      console.error("Error submitting payment:", error?.response || error);
      alert("There was an issue with the payment. Please try again.");
    }
  };
  
  

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
    console.log("Donation Amount:", donationAmount);
    console.log("Uploaded File:", file);

    // Reset
    setDonationAmount("");
    setFile(null);
    handleModal2Close();
  };

  return (
    <Box
      sx={{
        backgroundColor: "#0d1117",
        minHeight: "100vh",
        color: "white",
        px: 4,
        py: 4,
      }}
    >
      {/* Banner */}
      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: { xs: 300, sm: 400, md: 500 },
          borderRadius: 2,
          overflow: "hidden",
        }}
      >
        <Box
          component="img"
          src={lingamvideo}
          alt="Temple"
          sx={{
            width: "100%",
            height: "75%",
            objectFit: "cover",
            display: "block",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "75%",
            backgroundColor: "rgba(0, 0, 0, 0.1)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            px: 2,
          }}
        >
          <Typography
            variant="h6"
            sx={{ fontSize: { xs: "2rem", sm: "3rem", md: "4rem" } }}
          >
            Donate Now
          </Typography>
          <Typography variant="h6" sx={{ maxWidth: "800px", mt: 2 }}>
            Witness the grandeur of Koti Lingas symbolizing eternity and
            infinite power.
          </Typography>
        </Box>
      </Box>

      {/* Donate Image */}
      <Box
        sx={{
          mb: 4,
          display: "flex",
          justifyContent: "center",
          cursor: "pointer",
        }}
      >
        <img
          src={DoneteImage}
          alt="Donate"
          style={{ width: "100%", height: "50%" }}
          onClick={handleModal1Open}
        />
      </Box>

      {/* ✅ Show number status outside the modal */}
      {inputNumber && (
        <>
          {isNumberValid === false && (
            <Box sx={{ textAlign: "center", mt: 2 }}>
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                gap={1}
              >
                <img
                  src={lingam}
                  alt="Not Available"
                  width={300}
                  height={300}
                />
                <Typography sx={{ color: "red" }}>
                  The number {inputNumber} is not available. Please try another
                  one.
                </Typography>
              </Box>
              <Button variant="contained" color="error" sx={{ mt: 1 }}>
                ❌ Not Available
              </Button>
            </Box>
          )}
        </>
      )}

      {/* 🔍 Modal 1: Input Number */}
      <Dialog
        open={openModal1}
        onClose={handleModal1Close}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Search Number</DialogTitle>
        <DialogContent>
          <TextField
            label="Enter Number"
            type="number"
            value={inputNumber}
            onChange={(e) => setInputNumber(e.target.value)}
            fullWidth
          />
          <Button
            variant="outlined"
            onClick={async () => {
              try {
                const token = localStorage.getItem("token");
                if (!token) {
                  alert("Please log in first.");
                  return;
                }

                const response = await axios.post(
                  "https://temple.signaturecutz.in/donate/api/check-number",
                  { number: parseInt(inputNumber) },
                  {
                    headers: {
                      Authorization: `Bearer ${token}`,
                      "Content-Type": "application/json",
                    },
                  }
                );

                const { isDonateNumber, isBlockedNumber } = response.data.data;

                // Available only if both are false
                if (!isDonateNumber && !isBlockedNumber) {
                  setIsNumberValid(true);
                } else {
                  setIsNumberValid(false);
                }
              } catch (error) {
                console.error("Error checking number:", error);
                alert("Error checking number. Please try again.");
                setIsNumberValid(false);
              }
            }}
            sx={{ mt: 2 }}
          >
            🔍 Search
          </Button>

          {/* ✅ Available - Inside Modal */}
          {isNumberValid === true && (
            <>
              <Box display="flex" alignItems="center" gap={1} sx={{ mt: 2 }}>
                <img src={lingam} alt="Available" width={300} height={300} />
                <Typography
                  sx={{
                    color: "white",
                    fontSize: "16px", // reduce font size slightly for longer numbers
                    borderRadius: "50%",
                    backgroundColor: "#4c4646",
                    padding: "20px",
                    minHeight: "40px",
                    minWidth: "40px",
                    width: "fit-content", // allow width to expand
                    height: "fit-content",
                    textAlign: "center",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: "bold",
                    aspectRatio: "1 / 1", // keep it circular
                    wordBreak: "break-word", // handle large numbers
                    whiteSpace: "normal", // allow wrapping if needed
                  }}
                >
                  {inputNumber}
                </Typography>

                <Box>
                  <button
                    style={{
                      backgroundColor: "#4CAF50",
                      color: "white",
                      border: "none",
                      padding: "18px 26px",
                      borderRadius: "4px",
                      cursor: "default",
                      fontWeight: "bold",
                      fontSize: "24px",
                    }}
                  >
                    Available
                  </button>
                </Box>
              </Box>

              <Button
                variant="contained"
                color="success"
                sx={{ mt: 2 }}
                onClick={() => {
                  handleModal1Close();
                  setOpenFormModal(true);
                }}
              >
                Donate Now
              </Button>
            </>
          )}

          {/* ❌ Not Available - Inside Modal */}
          {isNumberValid === false && (
            <>
              <Box display="flex" alignItems="center" gap={1} sx={{ mt: 2 }}>
                <img
                  src={lingam}
                  alt="Not Available"
                  width={300}
                  height={300}
                />
                <Typography sx={{ color: "red" }}>
                  This number is not available. Try another.
                </Typography>
                <Button
                  variant="contained"
                  color="error"
                  size="small"
                  sx={{ ml: "auto" }}
                >
                  Booked
                </Button>
              </Box>

              <Button
                variant="outlined"
                color="error"
                onClick={() => {
                  setInputNumber("");
                  setIsNumberValid(null);
                }}
                sx={{ mt: 2 }}
              >
                Search Again
              </Button>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Modal 2: Upload File and Submit */}
      <Box
        sx={{
          backgroundColor: "#0d1117",
          // minHeight: "100vh",
          color: "white",
          px: 4,
          py: 4,
        }}
      >
        {/* Show success message after successful donation */}
        {successMessage && (
          <Typography sx={{ color: "green", textAlign: "center", mt: 2 }}>
            {successMessage}
          </Typography>
        )}

        {/* Modal for Filling Details */}
        <Dialog
          open={openFormModal}
          onClose={() => setOpenFormModal(false)}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle>Fill Your Details</DialogTitle>
          <DialogContent>
            <form
              // onSubmit={handleFormSubmit}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
                marginTop: "1rem",
              }}
            >
              <TextField
                label="donation number"
                value={inputNumber}
                fullWidth
                disabled
              />
              <TextField
                label="Name"
                value={formData.UserName}
                onChange={(e) =>
                  setFormData({ ...formData, UserName: e.target.value })
                }
                fullWidth
                required
              />
              <TextField
                label="Phone"
                value={formData.phoneNumber}
                onChange={(e) =>
                  setFormData({ ...formData, phoneNumber: e.target.value })
                }
                fullWidth
                required
              />
              <TextField
                label="Relation"
                value={formData.relation}
                onChange={(e) =>
                  setFormData({ ...formData, relation: e.target.value })
                }
                fullWidth
                required
              />
              <TextField
                label="DOB"
                type="date"
                InputLabelProps={{ shrink: true }}
                value={formData.dob}
                onChange={(e) =>
                  setFormData({ ...formData, dob: e.target.value })
                }
                fullWidth
                required
              />

              <TextField
                label="gothram"
                type="text"
                InputLabelProps={{ shrink: true }}
                value={formData.gothram}
                onChange={(e) =>
                  setFormData({ ...formData, gothram: e.target.value })
                }
                fullWidth
                required
              />
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  // Simple form validation
                  if (
                    !formData.UserName ||
                    !formData.phoneNumber ||
                    !formData.relation ||
                    !formData.dob ||
                    !formData.gothram
                  ) {
                    alert(
                      "Please fill in all the fields before proceeding to payment."
                    );
                    return;
                  }

                  setOpenFormModal(false); // close the form modal
                  setShowPaymentImage(true); // open payment modal
                }}
              >
                Payment
              </Button>
            </form>
          </DialogContent>
        </Dialog>

        {/* Success payment image */}
        {showPaymentImage && (
          <Box sx={{ textAlign: "center", mt: 4 }}>
            <img
              src="PhonePayImage.png"
              alt="Payment"
              style={{ width: "70%" }}
            />
          </Box>
        )}
      </Box>
      <Dialog
        open={showPaymentImage}
        onClose={() => setShowPaymentImage(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Scan to Pay</DialogTitle>
        <DialogContent sx={{ textAlign: "center" }}>
          <Stack
            direction="column"
            alignItems="center"
            justifyContent="center"
            spacing={2}
          >
            <img
              src={PhonePayImage}
              alt="Payment"
              style={{ width: "70%", marginTop: "1rem" }}
            />

            {/* Hidden file input */}
            <input
              type="file"
              accept="image/*,application/pdf"
              onChange={(e) => {
                const selectedFile = e.target.files[0];
                if (selectedFile) {
                  setFile(selectedFile); // ⬅️ Save to state
                }
              }}
              style={{ display: "none" }}
              id="file-upload"
            />

            {/* Visible label button to trigger file input */}
            <label htmlFor="file-upload">
              <Button variant="contained" color="primary" component="span">
                Upload File
              </Button>
            </label>

            {file && (
              <div style={{ marginTop: "10px" }}>
                <strong>Selected File:</strong> {file.name}
              </div>
            )}

            {/* Submit Button */}
            <Button
              variant="contained"
              onClick={handlePaymentSubmit}
              disabled={!file}
              sx={{
                backgroundColor: "gray !important",
                color: "white !important",
                "&:hover": {
                  backgroundColor: "#333", // Optional hover effect
                },
              }}
            >
              Submit
            </Button>
            {errorMessage && (
  <Alert severity="error" sx={{ mt: 2 }}>
    {errorMessage}
  </Alert>
)}

{successMessage && (
  <Alert severity="success" sx={{ mt: 2 }}>
    {successMessage}
  </Alert>
)}

          </Stack>
        </DialogContent>
      </Dialog>

      {/* Footer */}
      <Box
        sx={{
          backgroundColor: "#0d1117",
          color: "#fff",
          py: 4,
          px: 3,
          textAlign: "center",
          mt: 10,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "space-between",
            alignItems: "center",
            maxWidth: "1200px",
            mx: "auto",
            mb: 2,
          }}
        >
          <Box sx={{ mb: { xs: 2, md: 0 } }}>
            <img src={LogoImage} alt="Logo" style={{ height: 80 }} />
          </Box>

          <Stack
            direction="row"
            spacing={4}
            sx={{ mb: { xs: 2, md: 0 }, flexWrap: "wrap" }}
          >
            {["Home", "About", "Contact", "Register", "Log In"].map((item) => (
              <Link
                key={item}
                href={`/${item.toLowerCase().replace(/\s+/g, "-")}`}
                underline="none"
                sx={{
                  color: "white",
                  fontSize: "1.3rem",
                  fontWeight: 500,
                  "&:hover": { color: "#ccc" },
                }}
              >
                {item}
              </Link>
            ))}
          </Stack>

          <Stack direction="row" spacing={2}>
            <IconButton
              href="https://facebook.com"
              target="_blank"
              sx={{ color: "white" }}
            >
              <FacebookIcon fontSize="large" />
            </IconButton>
            <IconButton
              href="https://instagram.com"
              target="_blank"
              sx={{ color: "white" }}
            >
              <InstagramIcon fontSize="large" />
            </IconButton>
            <IconButton
              href="https://youtube.com"
              target="_blank"
              sx={{ color: "white" }}
            >
              <YouTubeIcon fontSize="large" />
            </IconButton>
          </Stack>
        </Box>

        <Typography variant="body2" sx={{ fontSize: "1.1rem", mt: 10 }}>
          Copyright © 2025 SRI SHAKTIPEETHA KOTI LINGA KSHETHRAM | Designed by
          <Typography
            component="span"
            sx={{ color: "#90EE90", ml: 1, fontWeight: 600 }}
          >
            LEADXPO IT SOLUTIONS
          </Typography>
        </Typography>
      </Box>
    </Box>
  );
};

export default RegisterBanner;
